import type { AlgoType, CostWeights, PlanParams, Vec3 } from '@/types'
import type { Environment } from '../environment'

/** 规划器上下文 */
export interface PlannerContext {
  env: Environment
  params: PlanParams
  weights: CostWeights
  /** 确定性随机数种子 */
  seed: number
}

export interface PlannerOutput {
  success: boolean
  path: Vec3[]
  expandedNodes: number
  message: string
  /** 实际使用算法（回退时可能不同） */
  algo: AlgoType
}

export interface Planner {
  readonly type: AlgoType
  readonly label: string
  plan(start: Vec3, goal: Vec3, ctx: PlannerContext): PlannerOutput
}

/** 可插拔规划器注册表 */
const registry = new Map<AlgoType, Planner>()

export function registerPlanner(p: Planner): void {
  registry.set(p.type, p)
}

export function getPlanner(type: AlgoType): Planner | undefined {
  return registry.get(type)
}

export function registeredAlgos(): AlgoType[] {
  return [...registry.keys()]
}

/** 确定性乘法同余随机数 */
export class SeededRandom {
  private state: number
  constructor(seed: number) {
    this.state = (seed | 0) || 1
  }
  next(): number {
    // xorshift32
    let x = this.state
    x ^= x << 13
    x ^= x >>> 17
    x ^= x << 5
    this.state = x | 0
    return ((x >>> 0) % 1_000_000) / 1_000_000
  }
  range(lo: number, hi: number): number {
    return lo + this.next() * (hi - lo)
  }
  int(lo: number, hi: number): number {
    return Math.floor(this.range(lo, hi + 1))
  }
  pick<T>(arr: T[]): T {
    return arr[this.int(0, arr.length - 1)]
  }
}

/** 起点/终点沿法向抬升到自由高度 */
export function ensureFree(
  env: Environment,
  p: Vec3,
  clearance: number
): Vec3 {
  if (!env.isBlocked(p, clearance)) return { ...p }
  const g = env.groundHeight(p.x, p.z) + clearance + 2
  for (let y = Math.max(p.y, g); y < env.maxAltitude - 10; y += 5) {
    if (!env.isBlocked({ x: p.x, y, z: p.z }, clearance)) return { x: p.x, y, z: p.z }
  }
  return { ...p }
}

/**
 * 视线简化（LOS shortcut）：贪心删除仍保持碰撞可行的中间点，
 * 显著缩短采样/群智算法产生的折线路径。
 */
export function losShortcut(env: Environment, path: Vec3[], clearance: number): Vec3[] {
  if (path.length <= 2) return path.map((p) => ({ ...p }))
  const out: Vec3[] = [path[0]]
  let i = 0
  while (i < path.length - 1) {
    let j = path.length - 1
    while (j > i + 1 && !env.isSegmentFeasible(path[i], path[j], clearance)) j--
    out.push({ ...path[j] })
    i = j
  }
  return out
}

/** 沿折线等距插值重采样（统一段长，供转角/曲率口径一致） */
export function resamplePath(path: Vec3[], spacing: number): Vec3[] {
  if (path.length < 2) return path.map((p) => ({ ...p }))
  const out: Vec3[] = [path[0]]
  let acc = 0
  for (let i = 1; i < path.length; i++) {
    const a = path[i - 1]
    const b = path[i]
    let segLen = Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z)
    if (segLen < 1e-9) continue
    while (acc + segLen >= spacing) {
      const t = (spacing - acc) / segLen
      const p: Vec3 = {
        x: a.x + (b.x - a.x) * t,
        y: a.y + (b.y - a.y) * t,
        z: a.z + (b.z - a.z) * t
      }
      out.push(p)
      segLen -= spacing - acc
      acc = 0
    }
    acc += segLen
  }
  const last = path[path.length - 1]
  if (out.length === 1 || dist3(out[out.length - 1], last) > spacing * 0.5) {
    out.push({ ...last })
  } else {
    out[out.length - 1] = { ...last }
  }
  return out
}

function dist3(a: Vec3, b: Vec3): number {
  return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z)
}

/** 路径碰撞采样是否全程可行 */
export function pathCollisionFree(
  env: Environment,
  path: Vec3[],
  clearance: number,
  sampleStep = 8
): boolean {
  for (let i = 1; i < path.length; i++) {
    if (!env.isSegmentFeasible(path[i - 1], path[i], clearance, sampleStep)) {
      return false
    }
  }
  return true
}

/** 碰撞航段数（用于群智算法代价） */
export function collisionCount(
  env: Environment,
  path: Vec3[],
  clearance: number,
  sampleStep = 12
): number {
  let n = 0
  for (let i = 1; i < path.length; i++) {
    if (!env.isSegmentFeasible(path[i - 1], path[i], clearance, sampleStep)) n++
  }
  return n
}

/** 路径原始（未加权）代价分量汇总（轻量梯形积分） */
export function pathRawCost(
  env: Environment,
  path: Vec3[],
  params: PlanParams
): { distance: number; threat: number; altitude: number; smooth: number } {
  let distance = 0
  let threat = 0
  let altitude = 0
  let smooth = 0
  for (let i = 1; i < path.length; i++) {
    const a = path[i - 1]
    const b = path[i]
    const d = Math.hypot(b.x - a.x, b.y - a.y, b.z - a.z)
    distance += d
    threat +=
      ((env.threatIntensity(a) + env.threatIntensity(b)) / 2) * d
    altitude +=
      ((Math.abs(a.y - params.cruiseAlt) + Math.abs(b.y - params.cruiseAlt)) /
        2 /
        Math.max(params.cruiseAlt, 1)) *
      d
    if (i >= 2) {
      const p = path[i - 2]
      const l1 = Math.hypot(a.x - p.x, a.y - p.y, a.z - p.z)
      if (l1 > 1e-6) {
        const dot =
          ((a.x - p.x) * (b.x - a.x) +
            (a.y - p.y) * (b.y - a.y) +
            (a.z - p.z) * (b.z - a.z)) /
          (l1 * d)
        smooth += 1 - Math.max(-1, Math.min(1, dot))
      }
    }
  }
  return { distance, threat, altitude, smooth }
}

/** 加权路径代价 + 碰撞重罚 */
export function scorePath(
  env: Environment,
  path: Vec3[],
  params: PlanParams,
  weights: CostWeights
): number {
  const raw = pathRawCost(env, path, params)
  const coll = collisionCount(env, path, params.clearance)
  return (
    raw.distance * weights.distance +
    raw.threat * weights.threat +
    raw.altitude * weights.altitude +
    raw.smooth * weights.smooth * 20 +
    coll * 50000
  )
}

/** 注册内置规划器（astar/dijkstra 为栅格规划器，在 planning.ts 中注册） */
export function registerBuiltins(planners: Planner[]): void {
  for (const p of planners) registerPlanner(p)
}
