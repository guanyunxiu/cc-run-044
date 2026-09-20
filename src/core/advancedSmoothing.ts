import type { PlanParams, Vec3 } from '@/types'
import type { Environment } from './environment'
import { dist } from '@/utils/math3d'
import { smoothBSpline, smoothPolyline } from './smoothing'

/**
 * 三次贝塞尔平滑：以路径折点为控制点，分段构造三次贝塞尔。
 * 每段用相邻控制点中点保证 G1 连续；逐段碰撞复核，失败回退折线松弛。
 */
export function smoothBezier(
  env: Environment,
  path: Vec3[],
  clearance: number,
  samplesPerSegment = 8,
  fallbackIterations = 3
): Vec3[] {
  if (path.length < 3) return path.map((p) => ({ ...p }))

  const mid = (a: Vec3, b: Vec3): Vec3 => ({
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
    z: (a.z + b.z) / 2
  })
  const bez = (p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, t: number): Vec3 => {
    const u = 1 - t
    const b0 = u * u * u
    const b1 = 3 * u * u * t
    const b2 = 3 * u * t * t
    const b3 = t * t * t
    return {
      x: b0 * p0.x + b1 * p1.x + b2 * p2.x + b3 * p3.x,
      y: b0 * p0.y + b1 * p1.y + b2 * p2.y + b3 * p3.y,
      z: b0 * p0.z + b1 * p1.z + b2 * p2.z + b3 * p3.z
    }
  }

  const out: Vec3[] = [{ ...path[0] }]
  for (let i = 1; i < path.length - 2; i++) {
    const p0 = mid(path[i - 1], path[i])
    const p3 = mid(path[i], path[i + 1])
    const p1 = path[i]
    const p2: Vec3 = {
      x: path[i].x + (p3.x - path[i].x) * 0.5,
      y: path[i].y + (p3.y - path[i].y) * 0.5,
      z: path[i].z + (p3.z - path[i].z) * 0.5
    }
    for (let s = 1; s <= samplesPerSegment; s++) {
      out.push(bez(p0, p1, p2, p3, s / samplesPerSegment))
    }
  }
  // 尾段：二次贝塞尔近似接到终点
  const last3 = path.slice(-3)
  if (last3.length === 3) {
    const p0 = mid(last3[0], last3[1])
    for (let s = 1; s <= samplesPerSegment; s++) {
      const t = s / samplesPerSegment
      const u = 1 - t
      out.push({
        x: u * u * p0.x + 2 * u * t * last3[1].x + t * t * last3[2].x,
        y: u * u * p0.y + 2 * u * t * last3[1].y + t * t * last3[2].y,
        z: u * u * p0.z + 2 * u * t * last3[1].z + t * t * last3[2].z
      })
    }
  } else {
    out.push({ ...path[path.length - 1] })
  }

  for (let i = 1; i < out.length; i++) {
    if (!env.isSegmentFeasible(out[i - 1], out[i], clearance)) {
      return smoothPolyline(env, path, fallbackIterations, clearance)
    }
  }
  return out
}

/**
 * 三次多项式样条（Catmull-Rom）平滑：经过全部折点，分段三次插值。
 * 逐段碰撞复核，失败回退 B 样条。
 */
export function smoothPolynomial(
  env: Environment,
  path: Vec3[],
  clearance: number,
  samplesPerSegment = 8
): Vec3[] {
  if (path.length < 3) return path.map((p) => ({ ...p }))
  const cp = [path[0], ...path, path[path.length - 1]]
  const cr = (p0: Vec3, p1: Vec3, p2: Vec3, p3: Vec3, t: number): Vec3 => {
    const t2 = t * t
    const t3 = t2 * t
    const f = (a: number, b: number, c: number, d: number) =>
      0.5 *
      (2 * b +
        (-a + c) * t +
        (2 * a - 5 * b + 4 * c - d) * t2 +
        (-a + 3 * b - 3 * c + d) * t3)
    return {
      x: f(p0.x, p1.x, p2.x, p3.x),
      y: f(p0.y, p1.y, p2.y, p3.y),
      z: f(p0.z, p1.z, p2.z, p3.z)
    }
  }

  const out: Vec3[] = [{ ...path[0] }]
  for (let i = 0; i < cp.length - 3; i++) {
    for (let s = 1; s <= samplesPerSegment; s++) {
      out.push(cr(cp[i], cp[i + 1], cp[i + 2], cp[i + 3], s / samplesPerSegment))
    }
  }
  for (let i = 1; i < out.length; i++) {
    if (!env.isSegmentFeasible(out[i - 1], out[i], clearance)) {
      return smoothBSpline(env, path, clearance)
    }
  }
  return out
}

const wrapPi = (a: number): number => {
  while (a > Math.PI) a -= Math.PI * 2
  while (a < -Math.PI) a += Math.PI * 2
  return a
}
const wrap2pi = (a: number): number => {
  while (a < 0) a += Math.PI * 2
  while (a >= Math.PI * 2) a -= Math.PI * 2
  return a
}

/**
 * Dubins 曲线平滑（水平面 CSC：LSL/RSR/LSR/RSL 取最短）。
 * heading 约定：航向 h 的水平方向为 (sin h, cos h)（x-z 平面，与无人机 yaw 一致）。
 * 竖直高度沿弧长线性过渡；转弯半径取动力学最小转弯半径。
 * 逐点碰撞复核，失败回退 B 样条。
 */
export function smoothDubins(
  env: Environment,
  path: Vec3[],
  clearance: number,
  minRadius: number
): Vec3[] {
  if (path.length < 3) return path.map((p) => ({ ...p }))
  const R = Math.max(minRadius, 8)

  /** 沿「位置+航向」的圆弧/直线采样一个点 */
  const arcPoint = (
    center: Vec3,
    radialAngle: number,
    y: number
  ): Vec3 => ({
    x: center.x + Math.sin(radialAngle) * R,
    y,
    z: center.z + Math.cos(radialAngle) * R
  })

  /**
   * 计算从航姿 (a,ha) 到 (b,hb) 的最短 CSC 路径离散点。
   * 采用归一化（除以 R）解析解。
   */
  const dubinsCSC = (a: Vec3, ha: number, b: Vec3, hb: number): Vec3[] => {
    const dx = b.x - a.x
    const dz = b.z - a.z
    const D = Math.hypot(dx, dz)
    if (D < R * 0.5) return [{ ...a }, { ...b }]
    const d = D / R
    const theta = Math.atan2(dx, dz)
    const alpha = wrapPi(ha - theta)
    const beta = wrapPi(hb - theta)

    type Word = [1 | -1, 1 | -1, boolean]
    const words: Word[] = [
      [1, 1, true],
      [-1, -1, true],
      [1, -1, false],
      [-1, 1, false]
    ]

    let best: { pts: Vec3[]; len: number } | null = null

    for (const [s1, s2, same] of words) {
      let t = 0
      let p = 0
      let q = 0
      if (same) {
        const sa = s1 * alpha
        const sb = s2 * beta
        const tmp =
          2 + d * d - 2 * Math.cos(sa - sb) + 2 * d * (Math.sin(sa) - Math.sin(sb))
        if (tmp < 0) continue
        p = Math.sqrt(tmp)
        const th = Math.atan2(
          Math.cos(sb) - Math.cos(sa),
          d + Math.sin(sa) - Math.sin(sb)
        )
        t = s1 * wrap2pi(-sa + th)
        q = s2 * wrap2pi(sb - th)
      } else {
        const sa = s1 * alpha
        const sb = s2 * beta
        const tmp =
          d * d - 2 + 2 * Math.cos(sa - sb) + 2 * d * (Math.sin(sa) + Math.sin(sb))
        if (tmp < 0) continue
        p = Math.sqrt(tmp)
        const th = Math.atan2(
          -Math.cos(sa) - Math.cos(sb),
          d + Math.sin(sa) + Math.sin(sb)
        )
        const ang = wrap2pi(-sa + th - Math.asin(Math.min(1, 2 / Math.max(p, 1e-6))))
        t = s1 * ang
        q = s2 * wrap2pi(sb - th + Math.asin(Math.min(1, 2 / Math.max(p, 1e-6))))
      }
      if (t < -1e-6 || p < -1e-6 || q < -1e-6) continue

      // 弧1圆心：位置 a 沿航向左侧(s1=+1)/右侧偏移 R
      const c1: Vec3 = {
        x: a.x + Math.sin(ha + (s1 * Math.PI) / 2) * R,
        y: a.y,
        z: a.z + Math.cos(ha + (s1 * Math.PI) / 2) * R
      }
      const r1 = ha - (s1 * Math.PI) / 2 // 起点在圆上的径向角
      const h1 = ha + s1 * t // 弧1结束航向 = 直线航向
      const n1 = Math.max(2, Math.ceil((Math.abs(t) * R) / (R / 4)))
      const pts: Vec3[] = []
      for (let i = 0; i <= n1; i++) {
        const k = i / n1
        pts.push(arcPoint(c1, r1 + s1 * t * k, a.y))
      }
      // 直线段
      const p0 = pts[pts.length - 1]
      const np = Math.max(2, Math.ceil(p / 0.5))
      for (let i = 1; i <= np; i++) {
        const k = i / np
        const len = p * R * k
        pts.push({
          x: p0.x + Math.sin(h1) * len,
          y: a.y + (b.y - a.y) * k,
          z: p0.z + Math.cos(h1) * len
        })
      }
      // 弧2：在目标圆上，从直线进入航向转到 hb。直接在目标圆上按角度采样，
      // 终点必为 b（圆上径向角 hb - s2*π/2 对应位置 b）。
      const c2: Vec3 = {
        x: b.x + Math.sin(hb + (s2 * Math.PI) / 2) * R,
        y: b.y,
        z: b.z + Math.cos(hb + (s2 * Math.PI) / 2) * R
      }
      const r2start = h1 - (s2 * Math.PI) / 2
      const n2 = Math.max(2, Math.ceil((Math.abs(q) * R) / (R / 4)))
      for (let i = 1; i <= n2; i++) {
        const k = i / n2
        const ang = r2start + s2 * q * k
        pts.push(arcPoint(c2, ang, a.y + (b.y - a.y) * k))
      }
      pts[pts.length - 1] = { ...b }

      const len = polyLen(pts)
      if (!best || len < best.len) best = { pts, len }
    }
    return best ? best.pts : []
  }

  const out: Vec3[] = [{ ...path[0] }]
  for (let i = 1; i < path.length - 1; i++) {
    const a = path[i - 1]
    const m = path[i]
    const b = path[i + 1]
    const ha = Math.atan2(m.x - a.x, m.z - a.z)
    const hb = Math.atan2(b.x - m.x, b.z - m.z)
    const seg = dubinsCSC(a, ha, m, hb)
    if (seg.length >= 2) out.push(...seg.slice(1))
    else out.push({ ...m })
  }
  out.push({ ...path[path.length - 1] })

  for (let i = 1; i < out.length; i++) {
    if (!env.isSegmentFeasible(out[i - 1], out[i], clearance)) {
      return smoothBSpline(env, path, clearance)
    }
  }
  return out
}

/**
 * Clothoid（回旋曲线）角平滑：
 * 在每个折点用曲率从 0 线性增/减的过渡曲线替换尖角。
 * 用圆弧-直线混合（曲率受限的圆角过渡，工程上等价 clothoid 端点行为）
 * 加二次贝塞尔近似实现；曲率受最小转弯半径限制。碰撞复核失败回退贝塞尔。
 */
export function smoothClothoid(
  env: Environment,
  path: Vec3[],
  clearance: number,
  minRadius: number
): Vec3[] {
  if (path.length < 3) return path.map((p) => ({ ...p }))
  const R = Math.max(minRadius, 8)

  /**
   * 在折点 cur 处构造 clothoid 风格过渡：
   * 在入射/出射边上各取切点，用一段二次贝塞尔连接，
   * 贝塞尔的控制点偏移量由转弯角与 R 决定，使两端曲率连续趋于 0。
   */
  const out: Vec3[] = [{ ...path[0] }]
  const N = 10
  for (let i = 1; i < path.length - 1; i++) {
    const prev = path[i - 1]
    const cur = path[i]
    const next = path[i + 1]
    const hIn = Math.atan2(cur.x - prev.x, cur.z - prev.z)
    const hOut = Math.atan2(next.x - cur.x, next.z - cur.z)
    let delta = wrapPi(hOut - hIn)
    const absDelta = Math.abs(delta)
    if (absDelta < 0.02) {
      out.push({ ...cur })
      continue
    }
    // 切线切点距离：转弯越急切点越靠近折点，但不小于 R*tan(θ/2)
    const cut = Math.min(
      dist(prev, cur) * 0.4,
      dist(cur, next) * 0.4,
      R * Math.tan(Math.min(absDelta / 2, Math.PI / 2 - 0.05)) + R * 0.4
    )
    const pIn: Vec3 = {
      x: cur.x - Math.sin(hIn) * cut,
      y: cur.y,
      z: cur.z - Math.cos(hIn) * cut
    }
    const pOut: Vec3 = {
      x: cur.x + Math.sin(hOut) * cut,
      y: cur.y,
      z: cur.z + Math.cos(hOut) * cut
    }
    // 二次贝塞尔，控制点为两切线交点（即沿各自切点延长到折点外侧）
    const ctrl = cur
    const seg: Vec3[] = []
    for (let k = 1; k <= N; k++) {
      const t = k / N
      const u = 1 - t
      seg.push({
        x: u * u * pIn.x + 2 * u * t * ctrl.x + t * t * pOut.x,
        y: cur.y,
        z: u * u * pIn.z + 2 * u * t * ctrl.z + t * t * pOut.z
      })
    }
    out.push(...seg)
  }
  out.push({ ...path[path.length - 1] })

  for (let i = 1; i < out.length; i++) {
    if (!env.isSegmentFeasible(out[i - 1], out[i], clearance)) {
      return smoothBezier(env, path, clearance)
    }
  }
  return out
}

/** 按类型统一分发高级平滑 */
export function smoothAdvanced(
  type: 'bezier' | 'polynomial' | 'dubins' | 'clothoid',
  env: Environment,
  path: Vec3[],
  params: PlanParams
): Vec3[] {
  const clearance = params.clearance
  const R = Math.max(params.dynamics.minTurnRadius, 8)
  switch (type) {
    case 'bezier':
      return smoothBezier(env, path, clearance)
    case 'polynomial':
      return smoothPolynomial(env, path, clearance)
    case 'dubins':
      return smoothDubins(env, path, clearance, R)
    case 'clothoid':
      return smoothClothoid(env, path, clearance, R)
  }
}

function polyLen(p: Vec3[]): number {
  let l = 0
  for (let i = 1; i < p.length; i++) l += dist(p[i - 1], p[i])
  return l
}
