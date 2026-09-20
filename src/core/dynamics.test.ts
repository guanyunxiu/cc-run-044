// @vitest-environment node
import { describe, expect, it } from 'vitest'
import type { DynamicEntity, Vec3 } from '@/types'
import {
  dynamicStateAt,
  dynamicStatesAt,
  predictPath,
  statesToObstacles,
  statesToThreats
} from '@/core/dynamics'
import { environmentAt } from '@/core/dynamicEnv'
import { defaultTerrain } from '@/core/defaults'

function movingObstacle(over: Partial<DynamicEntity> = {}): DynamicEntity {
  return {
    id: 'm1',
    name: 'm',
    kind: 'moving-obstacle',
    motion: 'patrol',
    threatKind: 'sam',
    position: { x: 0, y: 0, z: 0 },
    radius: 20,
    heightMin: 0,
    heightMax: 80,
    level: 3,
    patrolPoints: [
      { x: -100, y: 0, z: 0 },
      { x: 100, y: 0, z: 0 }
    ],
    velocity: { x: 10, y: 0, z: 0 },
    patrolSpeed: 20,
    triggerTime: 0,
    growDuration: 2,
    persistent: true,
    period: 30,
    predictHorizon: 6,
    enabled: true,
    ...over
  }
}

describe('动态实体运动模型', () => {
  it('patrol 在端点往返且速度方向反转', () => {
    const e = movingObstacle()
    const s0 = dynamicStateAt(e, 0)
    const sHalf = dynamicStateAt(e, 5)
    const sTurn = dynamicStateAt(e, 10)
    const sBack = dynamicStateAt(e, 15)
    expect(s0.position.x).toBeCloseTo(-100, 0)
    expect(sHalf.velocity.x).toBeGreaterThan(0)
    expect(sTurn.position.x).toBeCloseTo(100, 0)
    expect(sBack.velocity.x).toBeLessThan(0)
  })

  it('linear 匀速直线位置随时间线性', () => {
    const e = movingObstacle({
      motion: 'linear',
      position: { x: 0, y: 0, z: 0 },
      velocity: { x: 10, y: 0, z: 5 }
    })
    const s = dynamicStateAt(e, 4)
    expect(s.position.x).toBeCloseTo(40, 1)
    expect(s.position.z).toBeCloseTo(20, 1)
  })

  it('burst 未到触发时刻不激活，到达后半径生长', () => {
    const e = movingObstacle({
      motion: 'burst',
      kind: 'sudden-threat',
      triggerTime: 10,
      growDuration: 4
    })
    expect(dynamicStateAt(e, 5).active).toBe(false)
    const grow = dynamicStateAt(e, 12)
    expect(grow.active).toBe(true)
    expect(grow.radius).toBeLessThan(e.radius)
    expect(grow.radius).toBeGreaterThan(0)
    expect(dynamicStateAt(e, 20).radius).toBeCloseTo(e.radius, 5)
  })

  it('非持续 burst 周期开关', () => {
    const e = movingObstacle({
      motion: 'burst',
      kind: 'sudden-threat',
      persistent: false,
      triggerTime: 0,
      period: 12
    })
    expect(dynamicStateAt(e, 1).active).toBe(true)
    expect(dynamicStateAt(e, 8).active).toBe(false)
    expect(dynamicStateAt(e, 13).active).toBe(true)
  })

  it('移动障碍转为硬障碍，威胁实体转为威胁区', () => {
    const obs = statesToObstacles(dynamicStatesAt([movingObstacle()], 0))
    expect(obs.length).toBe(1)
    const thr = statesToThreats(
      dynamicStatesAt([movingObstacle({ id: 't', kind: 'dynamic-threat' })], 0)
    )
    expect(thr.length).toBe(1)
  })

  it('predictPath 返回沿巡逻方向的预测点序列', () => {
    const e = movingObstacle()
    const path = predictPath(e, 0, 1)
    expect(path.length).toBeGreaterThan(3)
    // 从 -100 向 +x 运动
    expect(path[path.length - 1].x).toBeGreaterThan(path[0].x)
  })
})

describe('时变环境快照', () => {
  it('移动障碍在 t 时刻位置发生圆柱碰撞，t=0 不碰撞', () => {
    const e = movingObstacle()
    const base = {
      terrain: defaultTerrain,
      threats: [],
      noflyZones: [],
      obstacles: [],
      dynamics: [e]
    }
    // t=0 障碍在 (-100,0)，无人机位置 (0,100,0) 无碰撞
    const env0 = environmentAt(base, 0)
    const p: Vec3 = { x: 0, y: 40, z: 0 }
    expect(env0.isBlocked(p, 4)).toBe(false)
    // t=5 时障碍移动到 (0,0)，产生碰撞
    const env5 = environmentAt(base, 5)
    expect(env5.moving.length).toBe(1)
    expect(env5.isBlocked(p, 4)).toBe(true)
  })

  it('predictedCollision 按障碍速度线性预测', () => {
    const e = movingObstacle({
      motion: 'linear',
      position: { x: -50, y: 0, z: 0 },
      velocity: { x: 10, y: 0, z: 0 }
    })
    const env = environmentAt(
      { terrain: defaultTerrain, threats: [], noflyZones: [], obstacles: [], dynamics: [e] },
      0
    )
    const p: Vec3 = { x: 0, y: 40, z: 0 }
    // 5s 后障碍到达 0
    expect(env.predictedCollision(p, 5, 2)).not.toBeNull()
    expect(env.predictedCollision(p, 0, 2)).toBeNull()
  })
})
