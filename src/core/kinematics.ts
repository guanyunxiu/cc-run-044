import type {
  ConstraintReport,
  ConstraintViolation,
  ConstraintViolationType,
  PlanParams,
  SmoothMetrics,
  Vec3
} from '@/types'
import type { Environment } from './environment'
import { dist } from '@/utils/math3d'

const DEG = Math.PI / 180

function emptyCounts(): Record<ConstraintViolationType, number> {
  return { turn: 0, climb: 0, step: 0, radius: 0, attitude: 0, collision: 0 }
}

/** 水平航向角（弧度，atan2(x,z)，与 Three 无人机 yaw 口径一致） */
export function heading(a: Vec3, b: Vec3): number {
  return Math.atan2(b.x - a.x, b.z - a.z)
}

/** 两个航向角之差（归一化到 -PI..PI） */
export function angleDiff(a: number, b: number): number {
  let d = a - b
  while (d > Math.PI) d -= Math.PI * 2
  while (d < -Math.PI) d += Math.PI * 2
  return d
}

/** 航段 a->b 的爬升角（弧度） */
export function climbAngle(a: Vec3, b: Vec3): number {
  const horiz = Math.hypot(b.x - a.x, b.z - a.z)
  return Math.atan2(b.y - a.y, Math.max(horiz, 1e-6))
}

/**
 * 动力学约束检查。逐航段检查：
 * - 步长（minStepLength）、爬升角、相邻段水平转角、姿态变化、最小转弯半径
 * - 碰撞（环境采样）
 */
export function checkConstraints(
  path: Vec3[],
  params: PlanParams,
  env?: Environment,
  sampleStep = 8
): ConstraintReport {
  const c = params.dynamics
  const violations: ConstraintViolation[] = []
  const counts = emptyCounts()
  let segments = Math.max(0, path.length - 1)
  let bad = new Set<number>()

  const add = (v: ConstraintViolation) => {
    violations.push(v)
    counts[v.type]++
    bad.add(v.pointIndex)
  }

  for (let i = 0; i < path.length - 1; i++) {
    const a = path[i]
    const b = path[i + 1]
    const d = dist(a, b)

    if (c.enabled && d < c.minStepLength - 1e-6 && i < path.length - 1) {
      add({
        type: 'step',
        pointIndex: i,
        point: a,
        actual: d,
        limit: c.minStepLength,
        message: `航段长度 ${d.toFixed(1)}m 小于最小步长 ${c.minStepLength}m`
      })
    }
    const climb = Math.abs(climbAngle(a, b)) / DEG
    if (c.enabled && climb > c.maxClimbAngle + 1e-6) {
      add({
        type: 'climb',
        pointIndex: i,
        point: b,
        actual: climb,
        limit: c.maxClimbAngle,
        message: `爬升角 ${climb.toFixed(1)}° 超过限值 ${c.maxClimbAngle}°`
      })
    }
    if (c.enabled && i >= 1) {
      const h1 = heading(path[i - 1], a)
      const h2 = heading(a, b)
      const turn = Math.abs(angleDiff(h2, h1)) / DEG
      if (turn > c.maxTurnAngle + 1e-6) {
        add({
          type: 'turn',
          pointIndex: i,
          point: a,
          actual: turn,
          limit: c.maxTurnAngle,
          message: `转弯角 ${turn.toFixed(1)}° 超过限值 ${c.maxTurnAngle}°`
        })
      }
      if (turn > c.maxAttitudeChange + 1e-6) {
        add({
          type: 'attitude',
          pointIndex: i,
          point: a,
          actual: turn,
          limit: c.maxAttitudeChange,
          message: `姿态变化 ${turn.toFixed(1)}° 超过限值 ${c.maxAttitudeChange}°`
        })
      }
      // 最小转弯半径：R >= d / (2 sin(theta/2))
      if (turn > 0.5) {
        const theta = turn * DEG
        const radius = d / (2 * Math.sin(Math.min(theta / 2, Math.PI / 2 - 0.01)))
        if (radius < c.minTurnRadius - 1e-6) {
          add({
            type: 'radius',
            pointIndex: i,
            point: a,
            actual: radius,
            limit: c.minTurnRadius,
            message: `转弯半径 ${radius.toFixed(1)}m 小于最小转弯半径 ${c.minTurnRadius}m`
          })
        }
      }
    }
    if (env) {
      const steps = Math.max(1, Math.ceil(d / sampleStep))
      for (let k = 0; k <= steps; k++) {
        const t = k / steps
        const p: Vec3 = {
          x: a.x + (b.x - a.x) * t,
          y: a.y + (b.y - a.y) * t,
          z: a.z + (b.z - a.z) * t
        }
        if (env.isBlocked(p, params.clearance)) {
          add({
            type: 'collision',
            pointIndex: i,
            point: p,
            actual: 0,
            limit: params.clearance,
            message: '航迹侵入障碍/地形安全裕度'
          })
          break
        }
      }
    }
  }

  const good = Math.max(0, segments - bad.size)
  return {
    violations,
    segments,
    satisfaction: segments > 0 ? good / segments : 1,
    counts
  }
}

/**
 * 航迹可行性自动修正（碰撞感知）：
 * 1. 合并过短航段；
 * 2. 对超过转弯角/爬升角的折点做局部插入（将大转角拆成两步中间点）；
 * 3. 中间点不可行则回退为高度抬升（爬升受限场景）；
 * 仅在动力学约束启用时生效，保证首尾点不变。
 */
export function repairPath(
  env: Environment,
  pathIn: Vec3[],
  params: PlanParams
): Vec3[] {
  if (!params.dynamics.enabled || pathIn.length < 3) {
    return pathIn.map((p) => ({ ...p }))
  }
  const c = params.dynamics
  let pts = pathIn.map((p) => ({ ...p }))

  // 1. 合并短航段（跳过过近中间点，保持连通可行性）
  const merged: Vec3[] = [pts[0]]
  for (let i = 1; i < pts.length - 1; i++) {
    if (dist(merged[merged.length - 1], pts[i]) >= c.minStepLength) {
      merged.push(pts[i])
    }
  }
  merged.push(pts[pts.length - 1])
  pts = merged

  const maxTurn = c.maxTurnAngle * DEG
  const maxClimb = c.maxClimbAngle * DEG

  // 2. 大转角/大爬升角折点处插入中间点，最多迭代 3 轮
  for (let iter = 0; iter < 3; iter++) {
    const out: Vec3[] = [pts[0]]
    let changed = false
    for (let i = 1; i < pts.length - 1; i++) {
      const prev = out[out.length - 1]
      const cur = pts[i]
      const next = pts[i + 1]
      const h1 = heading(prev, cur)
      const h2 = heading(cur, next)
      const turn = Math.abs(angleDiff(h2, h1))
      const cl1 = Math.abs(climbAngle(prev, cur))
      const cl2 = Math.abs(climbAngle(cur, next))
      const needSplit = turn > maxTurn || cl1 > maxClimb || cl2 > maxClimb

      if (needSplit) {
        // 水平方向：用角平分线方向插入外移点；竖直：取两侧高度中点
        const bisect = h1 + angleDiff(h2, h1) / 2
        const offset = Math.max(c.minTurnRadius * 0.6, dist(cur, prev) * 0.5)
        const mid: Vec3 = {
          x: cur.x + Math.sin(bisect) * offset * 0.5,
          y: (prev.y + next.y) / 2,
          z: cur.z + Math.cos(bisect) * offset * 0.5
        }
        const lift: Vec3 = { x: mid.x, y: mid.y + 8, z: mid.z }
        const cand =
          env.isSegmentFeasible(prev, mid, params.clearance) &&
          env.isSegmentFeasible(mid, next, params.clearance)
            ? mid
            : lift
        if (
          env.isSegmentFeasible(prev, cand, params.clearance) &&
          env.isSegmentFeasible(cand, next, params.clearance)
        ) {
          out.push(cand)
          changed = true
        }
      }
      out.push(cur)
    }
    out.push(pts[pts.length - 1])
    pts = out
    if (!changed) break
  }

  return pts
}

/** 三点曲率（Menger 曲率的有符号大小，1/m） */
function curvature(a: Vec3, b: Vec3, c: Vec3): number {
  const ab = dist(a, b)
  const bc = dist(b, c)
  const ac = dist(a, c)
  const denom = ab * bc * ac
  if (denom < 1e-9) return 0
  // 三角形面积（3D 叉积模长 / 2）
  const ux = b.x - a.x
  const uy = b.y - a.y
  const uz = b.z - a.z
  const vx = c.x - a.x
  const vy = c.y - a.y
  const vz = c.z - a.z
  const cxv = uy * vz - uz * vy
  const cyv = uz * vx - ux * vz
  const czv = ux * vy - uy * vx
  const area = Math.hypot(cxv, cyv, czv) / 2
  return (4 * area) / denom
}

/**
 * 计算航迹质量指标：航程 / 最大与平均曲率 / 最大转角 / 速度剖面相关的
 * 最大加速度与抖动。速度按梯形剖面近似（沿弧长，加速度取 plan 速度范围）。
 */
export function pathMetrics(path: Vec3[], params?: PlanParams): SmoothMetrics {
  const n = path.length
  let length = 0
  let maxCurv = 0
  let sumCurv = 0
  let curvCount = 0
  let maxTurn = 0

  for (let i = 1; i < n; i++) {
    length += dist(path[i - 1], path[i])
  }
  for (let i = 1; i < n - 1; i++) {
    const k = curvature(path[i - 1], path[i], path[i + 1])
    if (Number.isFinite(k)) {
      maxCurv = Math.max(maxCurv, k)
      sumCurv += k
      curvCount++
      const turn =
        Math.abs(angleDiff(heading(path[i - 1], path[i]), heading(path[i], path[i + 1]))) /
        DEG
      maxTurn = Math.max(maxTurn, turn)
    }
  }

  // 速度/加速度/抖动：沿加密点做简单剖面估计
  let maxAccel = 0
  let maxJerk = 0
  let avgSpeed = 0
  if (params && n >= 3) {
    const vMax = params.speedMax
    const vMin = params.speedMin
    const accel = Math.max(params.dynamics.maxAccel, 4)
    let prevV = 0
    let prevA = 0
    for (let i = 0; i < n; i++) {
      const s = (length * i) / (n - 1)
      let v: number
      const dAccel = (vMax * vMax) / (2 * accel)
      if (2 * dAccel < length) {
        if (s < dAccel) v = Math.sqrt(2 * accel * s)
        else if (s > length - dAccel) v = Math.sqrt(2 * accel * (length - s))
        else v = vMax
      } else {
        const peak = Math.sqrt(accel * length)
        v = s < length / 2 ? Math.min(Math.sqrt(2 * accel * s), peak)
          : Math.min(Math.sqrt(2 * accel * (length - s)), peak)
      }
      v = Math.max(v, vMin * 0.25)
      avgSpeed += v
      if (i > 0) {
        const ds = dist(path[i - 1], path[i])
        const dt = ds / Math.max((v + prevV) / 2, 0.5)
        const a = dt > 1e-6 ? (v - prevV) / dt : 0
        maxAccel = Math.max(maxAccel, Math.abs(a))
        if (i > 1) {
          // 前一时刻加速度用简化差分
          const jerk = dt > 1e-6 ? (a - prevA) / dt : 0
          maxJerk = Math.max(maxJerk, Math.abs(jerk))
        }
        prevA = a
      }
      prevV = v
    }
    avgSpeed /= n
  }

  return {
    length,
    maxCurvature: maxCurv,
    avgCurvature: curvCount > 0 ? sumCurv / curvCount : 0,
    maxTurnAngle: maxTurn,
    maxAccel,
    maxJerk,
    avgSpeed
  }
}

/** 安全裕度：点到最近碰撞源（地形/建筑/禁飞/动态圆柱）的净空（米） */
export function safetyMargin(env: Environment, p: Vec3): number {
  const ground = p.y - env.groundHeight(p.x, p.z)
  let best = ground
  for (const b of env.obstacles) {
    const dx = Math.max(Math.abs(p.x - b.position.x) - b.size.x / 2, 0)
    const dz = Math.max(Math.abs(p.z - b.position.z) - b.size.z / 2, 0)
    const dy = Math.max(
      b.position.y - p.y,
      0,
      p.y - (b.position.y + b.height)
    )
    best = Math.min(best, Math.hypot(dx, dz, dy))
  }
  for (const z of env.noflyZones) {
    if (!z.hardBlock) continue
    const planar = Math.hypot(p.x - z.position.x, p.z - z.position.z)
    const dr = Math.max(planar - z.radius, 0)
    const dy = Math.max(z.heightMin - p.y, 0, p.y - z.heightMax)
    best = Math.min(best, Math.hypot(dr, dy))
  }
  best = Math.min(best, env.movingClearance(p).distance)
  return best
}

/** 安全裕度归一化颜色值 0..1（>=2*clearance 为 1 安全） */
export function safetyRatio(env: Environment, p: Vec3, clearance: number): number {
  const m = safetyMargin(env, p)
  if (!Number.isFinite(m)) return 1
  return Math.max(0, Math.min(1, m / Math.max(clearance * 2, 1)))
}
