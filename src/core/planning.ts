import type {
  AlgoType,
  CostWeights,
  PlanLegResult,
  PlanParams,
  PlanResult,
  PlanningStats,
  SmoothMetrics,
  SmoothingType,
  Vec3,
  Waypoint
} from '@/types'
import type { Environment } from './environment'
import {
  densify,
  pathDistance,
  smoothBSpline,
  smoothPolyline
} from './smoothing'
import { smoothAdvanced } from './advancedSmoothing'
import { cumulativeCostCurve, evaluatePath } from './cost'
import { runPlanner } from './planners'
import { checkConstraints, pathMetrics, repairPath } from './kinematics'

/** 威胁暴露判定阈值（暴露强度高于此值视为处于威胁中） */
export const EXPOSURE_THRESHOLD = 0.15

export interface PlanOptions {
  smoothing: SmoothingType
}

/** 排序某架无人机的航点：start -> via(按添加顺序) -> end */
export function orderWaypoints(waypoints: Waypoint[]): Waypoint[] {
  return [...waypoints].sort((a, b) => {
    const rank = (r: Waypoint['role']) =>
      r === 'start' ? 0 : r === 'end' ? 2 : 1
    return rank(a.role) - rank(b.role)
  })
}

/** 应用平滑（含迭代二高级方法） */
function applySmoothing(
  env: Environment,
  raw: Vec3[],
  plan: PlanParams,
  smoothing: SmoothingType
): Vec3[] {
  switch (smoothing) {
    case 'polyline':
      return smoothPolyline(env, raw, plan.smoothIterations, plan.clearance)
    case 'bspline':
      return smoothBSpline(env, raw, plan.clearance)
    case 'bezier':
    case 'polynomial':
    case 'dubins':
    case 'clothoid':
      return smoothAdvanced(smoothing, env, raw, plan)
    case 'none':
    default:
      return raw
  }
}

/**
 * 单无人机多航点全局规划（迭代一接口，迭代二内部接入可插拔规划器与动力学）：
 * 依次规划 start -> via... -> end 各航段，合并后统一平滑、约束检查与统计。
 */
export function planMission(
  env: Environment,
  waypoints: Waypoint[],
  plan: PlanParams,
  weights: CostWeights,
  options: PlanOptions
): PlanResult {
  const ordered = orderWaypoints(waypoints)
  return planOrdered(env, ordered, plan, weights, options)
}

/**
 * 多无人机任务规划：按 uavId 分组（缺省 uav-1），逐机规划，
 * 返回每架无人机的完整规划结果。
 */
export function planMultiMission(
  env: Environment,
  waypoints: Waypoint[],
  plan: PlanParams,
  weights: CostWeights,
  options: PlanOptions
): Record<string, PlanResult> {
  const groups = new Map<string, Waypoint[]>()
  for (const wp of waypoints) {
    const id = wp.uavId ?? 'uav-1'
    if (!groups.has(id)) groups.set(id, [])
    groups.get(id)!.push(wp)
  }
  const out: Record<string, PlanResult> = {}
  for (const [id, wps] of groups) {
    out[id] = planMission(env, wps, plan, weights, options)
  }
  return out
}

function planOrdered(
  env: Environment,
  ordered: Waypoint[],
  plan: PlanParams,
  weights: CostWeights,
  options: PlanOptions
): PlanResult {
  const t0 = performance.now()

  if (ordered.length < 2) {
    return failResult('至少需要起点和终点', 0)
  }

  let totalExpanded = 0
  const rawPath: Vec3[] = []
  const legs: PlanLegResult[] = []
  let allOk = true
  let lastMessage = '规划成功'
  let usedAlgo: AlgoType = plan.algo

  for (let i = 0; i < ordered.length - 1; i++) {
    const a = ordered[i].position
    const b = ordered[i + 1].position
    const res = runPlanner(env, a, b, plan, weights)
    totalExpanded += res.expandedNodes
    usedAlgo = res.algo

    const leg: PlanLegResult = {
      legIndex: i,
      points: res.path,
      success: res.success,
      expandedNodes: res.expandedNodes,
      costBreakdown: {
        distance: 0,
        threat: 0,
        altitude: 0,
        nofly: 0,
        smooth: 0
      },
      cumulativeCost: 0
    }
    legs.push(leg)

    if (!res.success) {
      allOk = false
      lastMessage = `航段 ${i + 1} 规划失败：${res.message}`
      // 失败航段用直线连接，便于观察失败位置
      if (rawPath.length === 0) rawPath.push({ ...a })
      rawPath.push({ ...b })
      continue
    }

    const seg = res.path
    for (let k = 0; k < seg.length; k++) {
      if (i > 0 && k === 0) continue // 合并重复连接点
      rawPath.push(seg[k])
    }
  }

  // 平滑
  let smoothPath: Vec3[] = rawPath
  if (allOk) {
    smoothPath = applySmoothing(env, rawPath, plan, options.smoothing)
    // 动力学自动修正（碰撞感知），修正后再做一次对应平滑以保证连续
    if (plan.dynamics.enabled) {
      const repaired = repairPath(env, smoothPath, plan)
      if (repaired.length >= 2) smoothPath = repaired
    }
  }

  const planTimeMs = performance.now() - t0

  // 评估
  const dense = allOk ? densify(smoothPath, Math.max(plan.cellSize * 0.5, 4)) : []
  const rawMetrics = allOk && rawPath.length >= 2 ? pathMetrics(rawPath, plan) : undefined
  const smoothMetrics =
    allOk && smoothPath.length >= 2 ? pathMetrics(smoothPath, plan) : undefined
  const constraintReport =
    allOk && smoothPath.length >= 2
      ? checkConstraints(smoothPath, plan, env)
      : undefined

  const stats = computeStats(
    env,
    smoothPath,
    dense,
    weights,
    plan,
    allOk,
    totalExpanded,
    planTimeMs,
    ordered.length - 1,
    legs.filter((l) => l.success).length,
    usedAlgo,
    constraintReport,
    smoothMetrics
  )

  return {
    success: allOk,
    rawPath,
    smoothPath,
    stats,
    legs,
    message: lastMessage,
    algo: usedAlgo,
    constraintReport,
    rawMetrics,
    smoothMetrics
  }
}

function computeStats(
  env: Environment,
  path: Vec3[],
  dense: Vec3[],
  weights: CostWeights,
  plan: PlanParams,
  allOk: boolean,
  expanded: number,
  planTimeMs: number,
  legCount: number,
  legsOk: number,
  algo: AlgoType,
  constraintReport: ReturnType<typeof checkConstraints> | undefined,
  metrics: SmoothMetrics | undefined
): PlanningStats {
  const distance = pathDistance(path)
  const evalRes =
    path.length >= 2
      ? evaluatePath(env, path, weights, plan)
      : { total: 0, breakdown: { distance: 0, threat: 0, altitude: 0, nofly: 0, smooth: 0 } }

  // 威胁暴露航程 / 时间（基于加密点）
  let exposedLength = 0
  let threatExposure = 0
  for (let i = 1; i < dense.length; i++) {
    const i0 = env.threatIntensity(dense[i - 1])
    const i1 = env.threatIntensity(dense[i])
    const d = Math.hypot(
      dense[i].x - dense[i - 1].x,
      dense[i].y - dense[i - 1].y,
      dense[i].z - dense[i - 1].z
    )
    threatExposure += ((i0 + i1) / 2) * d
    if ((i0 + i1) / 2 > EXPOSURE_THRESHOLD) exposedLength += d
  }
  const cruiseSpeed = (plan.speedMin + plan.speedMax) / 2
  const exposureTime = cruiseSpeed > 0 ? exposedLength / cruiseSpeed : 0

  // 避障成功率：航段成功率 × 加密点无碰撞率
  const legRate = legCount > 0 ? legsOk / legCount : 0
  let freeSamples = 0
  for (const p of dense) {
    if (!env.isBlocked(p, plan.clearance)) freeSamples++
  }
  const sampleRate = dense.length > 0 ? freeSamples / dense.length : 0
  const obstacleAvoidanceRate =
    allOk && dense.length > 0
      ? Math.round(legRate * sampleRate * 1000) / 10
      : Math.round(legRate * 1000) / 10

  return {
    distance: Math.round(distance * 10) / 10,
    threatExposure: Math.round(threatExposure * 100) / 100,
    exposureTime: Math.round(exposureTime * 10) / 10,
    planTimeMs: Math.round(planTimeMs * 100) / 100,
    expandedNodes: expanded,
    success: allOk,
    segments: Math.max(0, path.length - 1),
    obstacleAvoidanceRate,
    totalCost: Math.round(evalRes.total * 100) / 100,
    costBreakdown: {
      distance: Math.round(evalRes.breakdown.distance * 100) / 100,
      threat: Math.round(evalRes.breakdown.threat * 100) / 100,
      altitude: Math.round(evalRes.breakdown.altitude * 100) / 100,
      nofly: Math.round(evalRes.breakdown.nofly * 100) / 100,
      smooth: Math.round(evalRes.breakdown.smooth * 100) / 100
    },
    algo,
    constraintRate: constraintReport
      ? Math.round(constraintReport.satisfaction * 1000) / 10
      : 100,
    constraintViolations: constraintReport?.counts,
    metrics
  }
}

/** 代价曲线（供 UI 图表） */
export function getCostCurve(
  env: Environment,
  path: Vec3[],
  weights: CostWeights,
  plan: PlanParams
) {
  return cumulativeCostCurve(env, path, weights, plan)
}

function failResult(message: string, planTimeMs: number): PlanResult {
  return {
    success: false,
    rawPath: [],
    smoothPath: [],
    stats: {
      distance: 0,
      threatExposure: 0,
      exposureTime: 0,
      planTimeMs,
      expandedNodes: 0,
      success: false,
      segments: 0,
      obstacleAvoidanceRate: 0,
      totalCost: 0,
      costBreakdown: { distance: 0, threat: 0, altitude: 0, nofly: 0, smooth: 0 }
    },
    legs: [],
    message
  }
}
