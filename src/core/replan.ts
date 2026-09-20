import type {
  CostWeights,
  PlanCandidate,
  PlanParams,
  ReplanConfig,
  ReplanEvent,
  Vec3
} from '@/types'
import type { Environment } from './environment'
import type { TrajectorySample } from './smoothing'
import { dist } from '@/utils/math3d'
import { runPlanner } from './planners'
import { losShortcut, scorePath } from './planners/types'
import { smoothBSpline } from './smoothing'
import { angleDiff } from './kinematics'
import { ALGO_LABELS } from './planners'

export interface ReplanCheckInput {
  /** 当前仿真时间（秒） */
  time: number
  /** 无人机当前位置 */
  position: Vec3
  /** 无人机当前航向（弧度） */
  heading: number
  /** 当前参考轨迹（已飞 + 未飞） */
  trajectory: TrajectorySample[]
  /** 时变环境（动态障碍含速度，供预测） */
  env: Environment
  params: PlanParams
  weights: CostWeights
  config: ReplanConfig
  /** 上次重规划时间 */
  lastReplanTime: number
}

export type ReplanTrigger = ReplanEvent['reason'] | null

/**
 * 检测重规划触发条件。返回优先级最高的触发原因与描述。
 * 优先级：碰撞风险 > 威胁进入 > 偏航过大 > 剩余航程异常。
 */
export function detectReplanTrigger(input: ReplanCheckInput): {
  reason: ReplanTrigger
  label: string
  entityId?: string
  lookPoint?: Vec3
} {
  const { env, params, config, trajectory, position, heading, time } = input
  if (!config.enabled || trajectory.length < 4) return { reason: null, label: '' }
  if (time - input.lastReplanTime < config.minInterval) {
    return { reason: null, label: '' }
  }

  const clearance = params.clearance
  const dt = 0.5

  // 在前瞻时间窗内沿参考轨迹采样，检测预测碰撞与威胁侵入。
  // 关键：无人机与动态障碍都沿各自轨迹随 tau 推进，判断“时空相遇”，
  // 不能把无人机固定在当前位置（否则双方只是错时经过同一点）。
  let collisionAt: { at: number; p: Vec3; entityId?: string } | null = null
  let threatAt: { p: Vec3; entityId?: string } | null = null
  const horizon = config.collisionHorizon
  for (let tau = 0; tau <= horizon; tau += dt) {
    const ref = sampleTraj(trajectory, time + tau)
    if (!ref) break
    const hit = env.predictedCollision(ref.position, tau, clearance)
    if (hit && !collisionAt) {
      collisionAt = { at: tau, p: ref.position, entityId: hit.entityId }
    }
    // 动态威胁接近：到动态圆柱（威胁也在 moving? 威胁在 threats 列表）
    // 动态威胁通过 threats 中的同 id 实体检测距离
    for (const t of env.threats) {
      const planar = Math.hypot(ref.position.x - t.position.x, ref.position.z - t.position.z)
      if (
        planar < t.radius + config.threatEnterDistance &&
        ref.position.y >= t.heightMin &&
        ref.position.y <= t.heightMax
      ) {
        if (!threatAt) threatAt = { p: ref.position, entityId: t.id }
      }
    }
    if (collisionAt) break
  }

  if (collisionAt) {
    return {
      reason: 'collision-risk',
      label: `碰撞风险：${collisionAt.at.toFixed(1)}s 后预测碰撞`,
      entityId: collisionAt.entityId,
      lookPoint: collisionAt.p
    }
  }
  if (threatAt) {
    return {
      reason: 'threat-enter',
      label: '动态威胁进入安全裕度',
      entityId: threatAt.entityId,
      lookPoint: threatAt.p
    }
  }

  // 偏航过大：当前航向与参考航迹前方航向之差
  const ahead = sampleTraj(trajectory, time + 2)
  const cur = sampleTraj(trajectory, time)
  if (ahead && cur) {
    const refH = Math.atan2(
      ahead.position.x - cur.position.x,
      ahead.position.z - cur.position.z
    )
    const dh = Math.abs(angleDiff(heading, refH)) * (180 / Math.PI)
    if (dh > config.yawThreshold) {
      return {
        reason: 'yaw-deviation',
        label: `偏航过大：实测 ${dh.toFixed(0)}° > 阈值 ${config.yawThreshold}°`,
        lookPoint: ahead.position
      }
    }
  }

  // 剩余航程异常：沿参考轨迹剩余航程 / 到终点直线距离
  const last = trajectory[trajectory.length - 1]
  const remainPath = remainingLength(trajectory, time)
  const remainStraight = dist(position, last.position)
  if (remainStraight > 50 && remainPath > remainStraight * config.detourRatio) {
    return {
      reason: 'range-anomaly',
      label: `剩余航程异常：绕航 ${(remainPath / Math.max(remainStraight, 1)).toFixed(2)}×`,
      lookPoint: last.position
    }
  }

  return { reason: null, label: '' }
}

/**
 * 执行局部重规划：
 * - 起点：参考轨迹上 lookAhead 米处的前瞻点（保证平滑衔接）；
 * - 终点：窗口内沿参考轨迹最远的自由点（至少为原轨迹终点）；
 * - 用当前规划算法规划局部航迹，成功后替换 [from, to] 区间；
 * - 同时产出若干候选（不同算法）用于展示与代价对比。
 */
export interface LocalReplanResult {
  event: ReplanEvent
  /** 拼接后的完整平滑航迹；失败为 null */
  mergedPath: Vec3[] | null
  success: boolean
}

export function localReplan(
  input: ReplanCheckInput,
  reason: ReplanEvent['reason'],
  reasonLabel: string,
  entityId: string | undefined,
  /** 备选算法，用于候选航迹展示；为空则仅主算法 */
  candidateAlgos: Parameters<typeof runPlanner>[3]['algo'][] = []
): LocalReplanResult {
  const { env, params, weights, trajectory, position } = input
  const t0 = performance.now()

  // 沿参考轨迹找前瞻点（lookAhead 米）与局部目标点（windowRadius 米）
  const dense = trajectory.map((s) => s.position)
  const fromIdx = findIndexAtDistance(dense, position, params.clearance * 0.5 + 4)
  const start = dense[fromIdx] ?? position
  const toIdx = findIndexAtDistance(dense, start, input.config.lookAhead + input.config.windowRadius * 0.4)
  // 目标：窗口内最后一个“当前环境下仍自由”的参考点，否则用窗口边界点
  let goalIdx = Math.min(toIdx, dense.length - 1)
  for (let i = goalIdx; i > fromIdx + 1; i--) {
    if (!env.isBlocked(dense[i], params.clearance)) {
      goalIdx = i
      break
    }
  }
  const goal = dense[goalIdx]

  // 旧局部航迹（重规划前参考窗口段）
  const oldLocalPath = dense.slice(fromIdx, goalIdx + 1)

  // 主规划
  const main = runPlanner(env, start, goal, params, weights)
  const candidates: PlanCandidate[] = []
  let newLocal: Vec3[] | null = null
  if (main.success) {
    newLocal = losShortcut(env, main.path, params.clearance)
    // 局部平滑（B 样条），失败则用原折线
    const sm = smoothBSpline(env, newLocal, params.clearance)
    if (sm.length >= 2) newLocal = sm
    candidates.push({
      label: ALGO_LABELS[main.algo] + '（采用）',
      algo: main.algo,
      path: newLocal,
      success: true,
      distance: polyLen(newLocal),
      totalCost: scorePath(env, newLocal, params, weights),
      planTimeMs: main.expandedNodes
    })
  }

  // 候选算法对比（各自独立规划，失败也记录）
  for (const algo of candidateAlgos) {
    if (algo === params.algo) continue
    const r = runPlanner(env, start, goal, { ...params, algo }, weights)
    candidates.push({
      label: ALGO_LABELS[algo],
      algo,
      path: r.success ? r.path : [],
      success: r.success,
      distance: r.success ? polyLen(r.path) : 0,
      totalCost: r.success ? scorePath(env, r.path, params, weights) : Infinity,
      planTimeMs: 0
    })
  }

  const costBefore = scorePath(env, oldLocalPath, params, weights)
  const costAfter = newLocal ? scorePath(env, newLocal, params, weights) : costBefore

  const event: ReplanEvent = {
    time: input.time,
    reason,
    reasonLabel,
    position: { ...position },
    replanFrom: { ...start },
    replanGoal: { ...goal },
    oldLocalPath,
    newLocalPath: newLocal ?? [],
    candidates,
    costBefore,
    costAfter,
    planTimeMs: performance.now() - t0,
    entityId
  }

  if (!newLocal) {
    return { event, mergedPath: null, success: false }
  }

  // 拼接：已飞段（到 fromIdx）+ 新局部段 + 未飞段（goalIdx 之后）
  const merged = [
    ...dense.slice(0, Math.max(0, fromIdx)),
    ...newLocal,
    ...dense.slice(goalIdx + 1)
  ]

  return { event, mergedPath: merged, success: true }
}

/** 在轨迹上按时间取样 */
function sampleTraj(traj: TrajectorySample[], time: number): TrajectorySample | null {
  if (traj.length === 0) return null
  if (time <= traj[0].time) return traj[0]
  const last = traj[traj.length - 1]
  if (time >= last.time) return last
  let lo = 0
  let hi = traj.length - 1
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1
    if (traj[mid].time <= time) lo = mid
    else hi = mid
  }
  return traj[lo + 1]
}

/** 沿参考轨迹从某点累计前进 dist 米处的索引 */
function findIndexAtDistance(
  points: Vec3[],
  from: Vec3,
  targetDist: number
): number {
  // 先找到距离 from 最近的索引
  let startIdx = 0
  let bd = Infinity
  for (let i = 0; i < points.length; i++) {
    const d = dist2(points[i], from)
    if (d < bd) {
      bd = d
      startIdx = i
    }
  }
  let acc = 0
  for (let i = startIdx + 1; i < points.length; i++) {
    acc += dist(points[i - 1], points[i])
    if (acc >= targetDist) return i
  }
  return points.length - 1
}

function remainingLength(traj: TrajectorySample[], time: number): number {
  let total = 0
  let started = false
  for (let i = 1; i < traj.length; i++) {
    if (!started) {
      if (traj[i].time >= time) {
        started = true
        total += dist(traj[i - 1].position, traj[i].position)
      }
    } else {
      total += dist(traj[i - 1].position, traj[i].position)
    }
  }
  return total
}

function polyLen(p: Vec3[]): number {
  let l = 0
  for (let i = 1; i < p.length; i++) l += dist(p[i - 1], p[i])
  return l
}

function dist2(a: Vec3, b: Vec3): number {
  const dx = a.x - b.x
  const dy = a.y - b.y
  const dz = a.z - b.z
  return dx * dx + dy * dy + dz * dz
}
