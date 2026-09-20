// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { Environment } from '@/core/environment'
import { environmentAt } from '@/core/dynamicEnv'
import { planMission, planMultiMission } from '@/core/planning'
import { planTrajectory, type TrajectorySample } from '@/core/smoothing'
import {
  defaultPlanParams,
  defaultTerrain,
  defaultReplanConfig,
  defaultWeights,
  uid
} from '@/core/defaults'
import { detectReplanTrigger, localReplan } from '@/core/replan'
import { simulateTracking } from '@/core/tracking'
import type {
  DynamicEntity,
  PlanParams,
  ReplanConfig,
  Vec3,
  Waypoint
} from '@/types'

const terrain = {
  ...defaultTerrain,
  size: 800,
  segments: 56,
  heightScale: 60,
  noiseScale: 0.003,
  ridgeScale: 20,
  canyon: false
}
const params: PlanParams = {
  ...defaultPlanParams,
  cellSize: 24,
  heightCell: 20,
  maxNodes: 120000,
  clearance: 10,
  cruiseAlt: 110,
  dynamics: { ...defaultPlanParams.dynamics, minTurnRadius: 20 }
}
const start: Vec3 = { x: -300, y: 110, z: 0 }
const goal: Vec3 = { x: 300, y: 110, z: 0 }

function crossObstacle(): DynamicEntity {
  // 沿 z 方向穿越 x 轴航线的移动障碍。
  // 无人机约 8s 后到达 x≈0；取障碍 t=0 在 z=-260、速度 32，
  // 则 t≈8.1s 时到达 z≈0，与无人机在 x≈0 相遇。
  return {
    id: uid('dyn'),
    name: 'crosser',
    kind: 'moving-obstacle',
    motion: 'linear',
    threatKind: 'sam',
    position: { x: 0, y: 0, z: -260 },
    radius: 24,
    heightMin: 0,
    heightMax: 160,
    level: 3,
    patrolPoints: [],
    velocity: { x: 0, y: 0, z: 32 },
    patrolSpeed: 0,
    triggerTime: 0,
    growDuration: 0.1,
    persistent: true,
    period: 0,
    predictHorizon: 8,
    enabled: true
  }
}

function planTraj(dynamics: DynamicEntity[]): {
  env: Environment
  result: ReturnType<typeof planMission>
  traj: TrajectorySample[]
} {
  const env = environmentAt(
    { terrain, threats: [], noflyZones: [], obstacles: [], dynamics },
    0
  )
  const wps: Waypoint[] = [
    { id: 's', role: 'start', position: start, speed: 30 },
    { id: 'e', role: 'end', position: goal, speed: 30 }
  ]
  const result = planMission(env, wps, params, defaultWeights, {
    smoothing: 'bspline'
  })
  expect(result.success).toBe(true)
  const traj = planTrajectory(result.smoothPath, params)
  return { env, result, traj }
}

describe('在线重规划触发', () => {
  it('移动障碍预测碰撞时触发 collision-risk', () => {
    const dyn = crossObstacle()
    const { traj } = planTraj([dyn])
    const cfg: ReplanConfig = {
      ...defaultReplanConfig,
      enabled: true,
      collisionHorizon: 8,
      minInterval: 0,
      threatEnterDistance: 40
    }
    // 找到一个触发碰撞风险的仿真时间（t=0 即可预见 8s 后的时空相遇）
    let triggerTime = -1
    for (let t = 0; t < traj[traj.length - 1].time; t += 0.5) {
      const envAtT = environmentAt(
        { terrain, threats: [], noflyZones: [], obstacles: [], dynamics: [dyn] },
        t
      )
      const ref = traj.find((s) => Math.abs(s.time - t) < 0.3)
      if (!ref) continue
      const trig = detectReplanTrigger({
        time: t,
        position: ref.position,
        heading: Math.atan2(ref.velocity.x, ref.velocity.z),
        trajectory: traj,
        env: envAtT,
        params,
        weights: defaultWeights,
        config: cfg,
        lastReplanTime: -999
      })
      if (trig.reason === 'collision-risk') {
        triggerTime = t
        break
      }
    }
    expect(triggerTime).toBeGreaterThanOrEqual(0)
  })

  it('无动态威胁时不触发', () => {
    const { env, traj } = planTraj([])
    const ref = traj[Math.floor(traj.length / 2)]
    const trig = detectReplanTrigger({
      time: ref.time,
      position: ref.position,
      heading: Math.atan2(ref.velocity.x, ref.velocity.z),
      trajectory: traj,
      env,
      params,
      weights: defaultWeights,
      config: { ...defaultReplanConfig, enabled: true, minInterval: 0, detourRatio: 5 },
      lastReplanTime: -999
    })
    expect(trig.reason).toBeNull()
  })
})

describe('局部重规划与代价对比', () => {
  it('碰撞风险下局部重规划成功并产出事件/候选/拼接航迹', () => {
    const dyn = crossObstacle()
    const { traj } = planTraj([dyn])
    const cfg: ReplanConfig = {
      ...defaultReplanConfig,
      enabled: true,
      collisionHorizon: 8,
      minInterval: 0,
      lookAhead: 60,
      windowRadius: 120
    }
    // 定位碰撞触发时刻
    let hitT = 0
    let hitPos: Vec3 = start
    let hitHeading = 0
    for (let t = 0; t < traj[traj.length - 1].time; t += 0.5) {
      const envAtT = environmentAt(
        { terrain, threats: [], noflyZones: [], obstacles: [], dynamics: [dyn] },
        t
      )
      const ref = traj.find((s) => Math.abs(s.time - t) < 0.3)!
      const trig = detectReplanTrigger({
        time: t,
        position: ref.position,
        heading: Math.atan2(ref.velocity.x, ref.velocity.z),
        trajectory: traj,
        env: envAtT,
        params,
        weights: defaultWeights,
        config: cfg,
        lastReplanTime: -999
      })
      if (trig.reason) {
        hitT = t
        hitPos = ref.position
        hitHeading = Math.atan2(ref.velocity.x, ref.velocity.z)
        break
      }
    }
    expect(hitT).toBeGreaterThanOrEqual(0)

    const envHit = environmentAt(
      { terrain, threats: [], noflyZones: [], obstacles: [], dynamics: [dyn] },
      hitT
    )
    const rr = localReplan(
      {
        time: hitT,
        position: hitPos,
        heading: hitHeading,
        trajectory: traj,
        env: envHit,
        params,
        weights: defaultWeights,
        config: cfg,
        lastReplanTime: -999
      },
      'collision-risk',
      '碰撞风险测试',
      dyn.id,
      ['rrt']
    )
    expect(rr.success).toBe(true)
    expect(rr.mergedPath!.length).toBeGreaterThan(5)
    expect(rr.event.candidates.length).toBeGreaterThanOrEqual(1)
    expect(rr.event.reason).toBe('collision-risk')
    expect(Number.isFinite(rr.event.costBefore)).toBe(true)
    expect(Number.isFinite(rr.event.costAfter)).toBe(true)
    expect(rr.event.planTimeMs).toBeGreaterThanOrEqual(0)
  })
})

describe('轨迹跟踪', () => {
  it('离线跟踪产出状态序列，误差有限且有界', () => {
    const { traj } = planTraj([])
    const { states, stats } = simulateTracking(traj)
    expect(states.length).toBeGreaterThan(10)
    expect(stats.samples).toBeGreaterThan(10)
    // 时间常数较小，平均位置误差应远小于航程
    expect(stats.meanError).toBeLessThan(60)
    expect(stats.maxError).toBeLessThan(200)
    expect(stats.meanHeadingError).toBeGreaterThanOrEqual(0)
  })
})

describe('多无人机任务', () => {
  it('两架交叉任务各自规划成功', () => {
    const env = environmentAt(
      { terrain, threats: [], noflyZones: [], obstacles: [], dynamics: [] },
      0
    )
    const wps: Waypoint[] = [
      { id: uid('wp'), uavId: 'uav-1', role: 'start', position: { x: -300, y: 110, z: -200 }, speed: 30 },
      { id: uid('wp'), uavId: 'uav-1', role: 'end', position: { x: 300, y: 110, z: 200 }, speed: 30 },
      { id: uid('wp'), uavId: 'uav-2', role: 'start', position: { x: 300, y: 120, z: -200 }, speed: 28 },
      { id: uid('wp'), uavId: 'uav-2', role: 'end', position: { x: -300, y: 120, z: 200 }, speed: 28 }
    ]
    const results = planMultiMission(env, wps, params, defaultWeights, {
      smoothing: 'bspline'
    })
    expect(results['uav-1'].success).toBe(true)
    expect(results['uav-2'].success).toBe(true)
    expect(results['uav-1'].smoothPath.length).toBeGreaterThan(2)
    expect(results['uav-2'].smoothPath.length).toBeGreaterThan(2)
    // 两架飞机路径不同
    expect(results['uav-1'].smoothPath[0]).not.toEqual(
      results['uav-2'].smoothPath[0]
    )
  })

  it('缺少起终点的无人机返回失败但不影响其他机', () => {
    const env = new Environment(terrain, [], [], [])
    const wps: Waypoint[] = [
      { id: uid('wp'), uavId: 'uav-1', role: 'start', position: start, speed: 30 },
      { id: uid('wp'), uavId: 'uav-1', role: 'end', position: goal, speed: 30 },
      { id: uid('wp'), uavId: 'uav-2', role: 'start', position: goal, speed: 30 }
    ]
    const results = planMultiMission(env, wps, params, defaultWeights, {
      smoothing: 'none'
    })
    expect(results['uav-1'].success).toBe(true)
    expect(results['uav-2'].success).toBe(false)
  })
})
