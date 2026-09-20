import type { PlanParams, Vec3 } from '@/types'
import type { Environment } from './environment'
import {
  cumulativeLengths,
  dist,
  lerp,
  polylineLength
} from '@/utils/math3d'

/**
 * 折线平滑（拉普拉斯松弛 / 橡皮筋法）：
 * 内部节点向相邻节点中点移动，仅保留仍满足碰撞净空的更新。
 */
export function smoothPolyline(
  env: Environment,
  path: Vec3[],
  iterations: number,
  clearance: number,
  alpha = 0.35
): Vec3[] {
  if (path.length < 3) return path.map((p) => ({ ...p }))
  const pts = path.map((p) => ({ ...p }))
  for (let it = 0; it < iterations; it++) {
    const snapshot = pts.map((p) => ({ ...p }))
    for (let i = 1; i < pts.length - 1; i++) {
      const prev = snapshot[i - 1]
      const next = snapshot[i + 1]
      const candidate: Vec3 = {
        x: pts[i].x + alpha * ((prev.x + next.x) / 2 - pts[i].x),
        y: pts[i].y + alpha * ((prev.y + next.y) / 2 - pts[i].y),
        z: pts[i].z + alpha * ((prev.z + next.z) / 2 - pts[i].z)
      }
      if (
        env.isSegmentFeasible(snapshot[i - 1], candidate, clearance) &&
        env.isSegmentFeasible(candidate, snapshot[i + 1], clearance)
      ) {
        pts[i] = candidate
      }
    }
  }
  return pts
}

/**
 * 三次均匀 B 样条平滑。
 * 首尾通过复制端点使曲线插值起终点；输出在 feasibility 不满足时回退折线平滑。
 */
export function smoothBSpline(
  env: Environment,
  path: Vec3[],
  clearance: number,
  samplesPerSegment = 6,
  fallbackIterations = 3
): Vec3[] {
  if (path.length < 3) return path.map((p) => ({ ...p }))

  // 复制端点，保证起终点插值
  const cp = [path[0], ...path, path[path.length - 1]]
  const basis = (u: number) => {
    const u2 = u * u
    const u3 = u2 * u
    return [
      (1 - 3 * u + 3 * u2 - u3) / 6,
      (4 - 6 * u2 + 3 * u3) / 6,
      (1 + 3 * u + 3 * u2 - 3 * u3) / 6,
      u3 / 6
    ]
  }

  const out: Vec3[] = []
  for (let i = 0; i < cp.length - 3; i++) {
    const p0 = cp[i]
    const p1 = cp[i + 1]
    const p2 = cp[i + 2]
    const p3 = cp[i + 3]
    for (let s = 0; s < samplesPerSegment; s++) {
      const u = s / samplesPerSegment
      const b = basis(u)
      out.push({
        x: b[0] * p0.x + b[1] * p1.x + b[2] * p2.x + b[3] * p3.x,
        y: b[0] * p0.y + b[1] * p1.y + b[2] * p2.y + b[3] * p3.y,
        z: b[0] * p0.z + b[1] * p1.z + b[2] * p2.z + b[3] * p3.z
      })
    }
  }
  out.push({ ...cp[cp.length - 1] })

  // 可行性检查：B 样条可能切入障碍，逐段验证，失败则整体回退
  for (let i = 1; i < out.length; i++) {
    if (!env.isSegmentFeasible(out[i - 1], out[i], clearance)) {
      return smoothPolyline(env, path, fallbackIterations, clearance)
    }
  }
  return out
}

/** 航迹点加密：保证相邻输出点间距不超过 spacing 米（在每段内均匀插值） */
export function densify(path: Vec3[], spacing: number): Vec3[] {
  if (path.length < 2) return path.map((p) => ({ ...p }))
  const out: Vec3[] = [path[0]]
  for (let i = 1; i < path.length; i++) {
    const a = path[i - 1]
    const b = path[i]
    const segLen = dist(a, b)
    if (segLen < 1e-9) continue
    // 至少分 1 段；段长超过 spacing 时增加分段数
    const pieces = Math.max(1, Math.ceil(segLen / spacing))
    for (let k = 1; k <= pieces; k++) {
      out.push(lerp(a, b, k / pieces))
    }
  }
  return out
}

export interface TrajectorySample {
  position: Vec3
  velocity: Vec3
  speed: number
  /** 累计时间（秒） */
  time: number
  /** 累计航程（米） */
  s: number
}

/**
 * 简单速度规划：沿加密后的航迹做梯形速度剖面
 * （加速 -> 巡航 -> 减速），生成时间参数化轨迹。
 */
export function planTrajectory(
  path: Vec3[],
  plan: PlanParams,
  cruiseSpeed?: number
): TrajectorySample[] {
  if (path.length < 2) return []
  const dense = densify(path, Math.max(plan.cellSize * 0.5, 4))
  const cum = cumulativeLengths(dense)
  const total = cum[cum.length - 1]

  const vCruise = Math.min(
    Math.max(cruiseSpeed ?? (plan.speedMin + plan.speedMax) / 2, plan.speedMin),
    plan.speedMax
  )
  const accel = Math.max(vCruise * 0.5, 4) // m/s²
  const dAccel = (vCruise * vCruise) / (2 * accel)

  // 航程 s -> 速度
  const speedAt = (s: number): number => {
    if (2 * dAccel >= total) {
      // 航程不足以达到巡航速度：三角剖面
      const peak = Math.sqrt(accel * total)
      if (s < total / 2) return Math.min(Math.sqrt(2 * accel * s), peak)
      return Math.min(Math.sqrt(2 * accel * (total - s)), peak)
    }
    if (s < dAccel) return Math.sqrt(2 * accel * s)
    if (s > total - dAccel) return Math.sqrt(2 * accel * (total - s))
    return vCruise
  }

  const samples: TrajectorySample[] = []
  let time = 0
  for (let i = 0; i < dense.length; i++) {
    const s = cum[i]
    const speed = Math.max(speedAt(s), plan.speedMin * 0.25)
    let velocity: Vec3
    if (i < dense.length - 1) {
      const d = dist(dense[i], dense[i + 1])
      const k = d > 1e-9 ? speed / d : 0
      velocity = {
        x: (dense[i + 1].x - dense[i].x) * k,
        y: (dense[i + 1].y - dense[i].y) * k,
        z: (dense[i + 1].z - dense[i].z) * k
      }
    } else {
      const d = dist(dense[i - 1], dense[i])
      const k = d > 1e-9 ? speed / d : 0
      velocity = {
        x: (dense[i].x - dense[i - 1].x) * k,
        y: (dense[i].y - dense[i - 1].y) * k,
        z: (dense[i].z - dense[i - 1].z) * k
      }
    }
    samples.push({ position: dense[i], velocity, speed, time, s })
    if (i < dense.length - 1) {
      const ds = cum[i + 1] - s
      const vAvg = (speed + speedAt(cum[i + 1])) / 2
      time += ds / Math.max(vAvg, 0.5)
    }
  }
  return samples
}

export function pathDistance(path: Vec3[]): number {
  return polylineLength(path)
}
