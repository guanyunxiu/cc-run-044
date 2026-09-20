import type { CostWeights, PlanParams, Vec3 } from '@/types'
import type { Environment } from './environment'

export interface SegmentCosts {
  /** 航程代价（米） */
  distance: number
  /** 威胁暴露代价（暴露强度沿航程积分） */
  threat: number
  /** 高度代价（相对巡航高度的偏差积分） */
  altitude: number
  /** 禁飞软惩罚积分 */
  nofly: number
  /** 平滑代价（转角惩罚，0~2 偏转角） */
  smooth: number
}

/**
 * 计算航段 a->b 的基础（未加权）代价分量。
 * prev 为 a 的前一节点，用于转角平滑惩罚。
 */
export function segmentCosts(
  env: Environment,
  prev: Vec3 | null,
  a: Vec3,
  b: Vec3,
  plan: PlanParams
): SegmentCosts {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const dz = b.z - a.z
  const distance = Math.hypot(dx, dy, dz)

  const threat = env.integrateField(a, b, (p) => env.threatIntensity(p))
  const nofly = env.integrateField(a, b, (p) => env.noflyPenalty(p))
  const altitude =
    env.integrateField(
      a,
      b,
      (p) => Math.abs(p.y - plan.cruiseAlt) / Math.max(plan.cruiseAlt, 1)
    )

  let smooth = 0
  if (prev) {
    const v1x = a.x - prev.x
    const v1y = a.y - prev.y
    const v1z = a.z - prev.z
    const l1 = Math.hypot(v1x, v1y, v1z)
    if (l1 > 1e-6) {
      const dot = (v1x * dx + v1y * dy + v1z * dz) / (l1 * distance)
      const c = Math.max(-1, Math.min(1, dot))
      // 偏转 180° -> 2，直线 -> 0
      smooth = 1 - c
    }
  }

  return { distance, threat, altitude, nofly, smooth }
}

/** 加权汇总单段代价 */
export function weightedCost(c: SegmentCosts, w: CostWeights): number {
  return (
    c.distance * w.distance +
    c.threat * w.threat +
    c.altitude * w.altitude +
    c.nofly * w.nofly +
    c.smooth * c.distance * w.smooth
  )
}

export function zeroWeights(): CostWeights {
  return { distance: 0, threat: 0, altitude: 0, nofly: 0, smooth: 0 }
}

/** 汇总整条路径的加权代价与分量 */
export function evaluatePath(
  env: Environment,
  path: Vec3[],
  w: CostWeights,
  plan: PlanParams
): { total: number; breakdown: CostWeights } {
  const raw = zeroWeights()
  let total = 0
  for (let i = 1; i < path.length; i++) {
    const prev = i >= 2 ? path[i - 2] : null
    const c = segmentCosts(env, prev, path[i - 1], path[i], plan)
    raw.distance += c.distance
    raw.threat += c.threat
    raw.altitude += c.altitude
    raw.nofly += c.nofly
    raw.smooth += c.smooth
    total += weightedCost(c, w)
  }
  return {
    total,
    breakdown: {
      distance: raw.distance * w.distance,
      threat: raw.threat * w.threat,
      altitude: raw.altitude * w.altitude,
      nofly: raw.nofly * w.nofly,
      smooth: raw.smooth * w.smooth
    }
  }
}

/** 每段的累积加权代价曲线（用于 UI 代价曲线） */
export function cumulativeCostCurve(
  env: Environment,
  path: Vec3[],
  w: CostWeights,
  plan: PlanParams
): { distance: number; cumulative: number; point: Vec3 }[] {
  const curve: { distance: number; cumulative: number; point: Vec3 }[] = [
    { distance: 0, cumulative: 0, point: path[0] }
  ]
  let cum = 0
  let d = 0
  for (let i = 1; i < path.length; i++) {
    const prev = i >= 2 ? path[i - 2] : null
    const c = segmentCosts(env, prev, path[i - 1], path[i], plan)
    cum += weightedCost(c, w)
    d += c.distance
    curve.push({ distance: d, cumulative: cum, point: path[i] })
  }
  return curve
}
