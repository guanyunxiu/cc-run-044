import type {
  BuildingObstacle,
  DynamicEntity,
  ThreatKind,
  ThreatZone,
  Vec3
} from '@/types'
import { clamp } from '@/utils/math3d'

/** 动态实体在某一时刻的状态 */
export interface DynamicState {
  entity: DynamicEntity
  /** 当前位置（圆柱中心，y 恒为 0，高度带决定竖直范围） */
  position: Vec3
  /** 当前有效半径（burst 生长） */
  radius: number
  /** 当前是否激活（未触发的突发威胁为 false） */
  active: boolean
  /** 当前速度向量（m/s，水平） */
  velocity: Vec3
  /** 0..1 生长进度 */
  growPhase: number
}

/** 巡逻路径总长度与各段长度（缓存计算） */
function patrolGeometry(points: Vec3[]): {
  segLen: number[]
  total: number
} {
  const segLen: number[] = []
  let total = 0
  for (let i = 1; i < points.length; i++) {
    const l = Math.hypot(
      points[i].x - points[i - 1].x,
      0,
      points[i].z - points[i - 1].z
    )
    segLen.push(l)
    total += l
  }
  return { segLen, total }
}

function patrolState(e: DynamicEntity, t: number): { pos: Vec3; vel: Vec3 } {
  const pts = e.patrolPoints.length >= 2 ? e.patrolPoints : [e.position, e.position]
  const { segLen, total } = patrolGeometry(pts)
  if (total < 1e-6) return { pos: { ...pts[0] }, vel: { x: 0, y: 0, z: 0 } }
  // 往返：周期 = 2L/v
  const period = (2 * total) / Math.max(e.patrolSpeed, 1e-6)
  let s = (t % period) * e.patrolSpeed
  let dir = 1
  if (s > total) {
    s = 2 * total - s
    dir = -1
  }
  let acc = 0
  let pos: Vec3 = { ...pts[0] }
  let segDir: Vec3 = { x: 1, y: 0, z: 0 }
  for (let i = 0; i < segLen.length; i++) {
    if (s <= acc + segLen[i] || i === segLen.length - 1) {
      const local = clamp((s - acc) / Math.max(segLen[i], 1e-6), 0, 1)
      const a = pts[i]
      const b = pts[i + 1]
      pos = {
        x: a.x + (b.x - a.x) * local,
        y: 0,
        z: a.z + (b.z - a.z) * local
      }
      segDir = {
        x: (b.x - a.x) / Math.max(segLen[i], 1e-6),
        y: 0,
        z: (b.z - a.z) / Math.max(segLen[i], 1e-6)
      }
      break
    }
    acc += segLen[i]
  }
  return {
    pos,
    vel: { x: segDir.x * e.patrolSpeed * dir, y: 0, z: segDir.z * e.patrolSpeed * dir }
  }
}

/**
 * 计算动态实体在仿真时间 t 的状态。
 * - burst：persistent 时 t>=triggerTime 出现；非持续时按周期开关
 * - linear：匀速直线
 * - patrol：往返巡逻
 * - intercept：需要 reference（参考位置），朝参考方向匀速逼近；无参考时退回 linear
 */
export function dynamicStateAt(
  e: DynamicEntity,
  t: number,
  reference?: Vec3
): DynamicState {
  let active = true
  let growPhase = 1
  let pos: Vec3 = { ...e.position, y: 0 }
  let vel: Vec3 = { ...e.velocity }

  if (e.motion === 'burst') {
    let since = t - e.triggerTime
    if (e.persistent) {
      active = since >= 0
      if (active) growPhase = clamp(since / Math.max(e.growDuration, 0.1), 0, 1)
    } else {
      const p = Math.max(e.period, 1)
      since = ((t - e.triggerTime) % p + p) % p
      const onDuration = p / 2
      active = since < onDuration
      if (active) growPhase = clamp(since / Math.max(e.growDuration, 0.1), 0, 1)
      else growPhase = 0
    }
  } else if (e.motion === 'patrol') {
    const s = patrolState(e, t)
    pos = s.pos
    vel = s.vel
  } else if (e.motion === 'linear') {
    pos = {
      x: e.position.x + e.velocity.x * t,
      y: 0,
      z: e.position.z + e.velocity.z * t
    }
    vel = { ...e.velocity }
  } else if (e.motion === 'intercept') {
    const target = reference ?? e.position
    const dx = target.x - e.position.x
    const dz = target.z - e.position.z
    const sp = Math.hypot(e.velocity.x, e.velocity.z) || 20
    const d = Math.hypot(dx, dz)
    if (d > 1) {
      vel = { x: (dx / d) * sp, y: 0, z: (dz / d) * sp }
    }
    pos = {
      x: e.position.x + vel.x * t,
      y: 0,
      z: e.position.z + vel.z * t
    }
  }

  return {
    entity: e,
    position: pos,
    radius: e.radius * growPhase,
    active,
    velocity: vel,
    growPhase
  }
}

/** 一组动态实体在 t 时刻的全部状态 */
export function dynamicStatesAt(
  entities: DynamicEntity[],
  t: number,
  reference?: Vec3
): DynamicState[] {
  return entities
    .filter((e) => e.enabled)
    .map((e) => dynamicStateAt(e, t, reference))
}

/** 将激活的动态实体转换为硬障碍（圆柱 -> 建筑 AABB 外接方盒，保守膨胀） */
export function statesToObstacles(states: DynamicState[]): BuildingObstacle[] {
  const out: BuildingObstacle[] = []
  for (const s of states) {
    if (!s.active) continue
    if (s.entity.kind !== 'moving-obstacle') continue
    const r = s.radius
    out.push({
      id: s.entity.id,
      name: s.entity.name,
      position: { x: s.position.x, y: 0, z: s.position.z },
      size: { x: r * 2, z: r * 2 },
      height: s.entity.heightMax
    })
  }
  return out
}

/** 将激活的动态/突发威胁转换为威胁区（供威胁场与暴露代价使用） */
export function statesToThreats(states: DynamicState[]): ThreatZone[] {
  const out: ThreatZone[] = []
  for (const s of states) {
    if (!s.active || s.radius < 0.5) continue
    if (s.entity.kind === 'moving-obstacle') continue
    const kind: ThreatKind = s.entity.threatKind
    out.push({
      id: s.entity.id,
      kind,
      name: s.entity.name,
      position: { x: s.position.x, y: 0, z: s.position.z },
      radius: s.radius,
      heightMin: s.entity.heightMin,
      heightMax: s.entity.heightMax,
      level: s.entity.level,
      opacity: 0.24
    })
  }
  return out
}

/**
 * 预测轨迹：从 t 时刻起，按运动模型以 dt 步长推算 horizon 秒。
 * burst 返回当前位置单点；intercept 需要参考轨迹（取最近参考点）。
 */
export function predictPath(
  e: DynamicEntity,
  t: number,
  dt = 0.5,
  referencePath?: Vec3[]
): Vec3[] {
  const out: Vec3[] = []
  const horizon = Math.max(e.predictHorizon, 0.5)
  const steps = Math.max(2, Math.ceil(horizon / dt))
  for (let i = 0; i <= steps; i++) {
    const tt = t + i * dt
    let ref: Vec3 | undefined
    if (e.motion === 'intercept' && referencePath && referencePath.length > 0) {
      // 以规划时刻位置为起点向参考航迹前方取点
      ref =
        referencePath[
          Math.min(referencePath.length - 1, Math.floor(i / 2))
        ]
    }
    const st = dynamicStateAt(e, tt, ref)
    if (st.active) {
      out.push({ x: st.position.x, y: (e.heightMin + e.heightMax) / 2, z: st.position.z })
    }
  }
  return out
}
