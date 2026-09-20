import type { TrackingStats, Vec3 } from '@/types'
import type { TrajectorySample } from './smoothing'
import { dist } from '@/utils/math3d'

/** 跟踪器状态（位置/速度/航向） */
export interface TrackState {
  position: Vec3
  velocity: Vec3
  speed: number
  heading: number
  /** 当前对应参考时间（秒） */
  refTime: number
}

export interface TrackerConfig {
  /** 速度响应时间常数（秒），越小跟踪越紧 */
  speedTau: number
  /** 航向响应时间常数（秒） */
  headingTau: number
  /** 最大加速度（m/s²） */
  maxAccel: number
  /** 最大偏航角速度（rad/s） */
  maxYawRate: number
}

export const DEFAULT_TRACKER: TrackerConfig = {
  speedTau: 0.6,
  headingTau: 0.45,
  maxAccel: 12,
  maxYawRate: 1.2
}

/**
 * 简化无人机轨迹跟踪器：
 * - 对参考速度做一阶惯性响应（限速/限加速度）；
 * - 对参考航向做一阶跟随（限偏航角速度）；
 * - 沿当前航向以跟踪速度积分位置。
 * 用于在参考轨迹之上产生“实际飞行轨迹”，从而暴露跟踪误差与姿态。
 */
export class TrajectoryTracker {
  state: TrackState
  errors: { t: number; positionError: number; headingError: number }[] = []

  constructor(private readonly cfg: TrackerConfig = DEFAULT_TRACKER) {
    this.state = {
      position: { x: 0, y: 0, z: 0 },
      velocity: { x: 0, y: 0, z: 0 },
      speed: 0,
      heading: 0,
      refTime: 0
    }
  }

  reset(start: Vec3, heading = 0): void {
    this.state = {
      position: { ...start },
      velocity: { x: 0, y: 0, z: 0 },
      speed: 0,
      heading,
      refTime: 0
    }
    this.errors = []
  }

  /**
   * 推进一个仿真步。
   * ref 为当前时刻参考轨迹样本；dt 秒。
   */
  step(ref: TrajectorySample, dt: number): TrackState {
    const s = this.state
    const refHeading = Math.atan2(ref.velocity.x, ref.velocity.z)
    const refSpeed = ref.speed

    // 速度一阶响应 + 加速度限幅
    const targetSpeed =
      s.speed + (refSpeed - s.speed) * (1 - Math.exp(-dt / this.cfg.speedTau))
    const dv = Math.max(
      -this.cfg.maxAccel * dt,
      Math.min(this.cfg.maxAccel * dt, targetSpeed - s.speed)
    )
    s.speed = Math.max(0, s.speed + dv)

    // 航向一阶跟随 + 偏航角速度限幅
    let dh = refHeading - s.heading
    while (dh > Math.PI) dh -= Math.PI * 2
    while (dh < -Math.PI) dh += Math.PI * 2
    const wantDh = dh * (1 - Math.exp(-dt / this.cfg.headingTau))
    const clampedDh = Math.max(
      -this.cfg.maxYawRate * dt,
      Math.min(this.cfg.maxYawRate * dt, wantDh)
    )
    s.heading += clampedDh

    // 竖直方向直接跟随参考（简化），水平沿航向积分
    s.position.x += Math.sin(s.heading) * s.speed * dt
    s.position.z += Math.cos(s.heading) * s.speed * dt
    s.position.y += (ref.position.y - s.position.y) *
      (1 - Math.exp(-dt / this.cfg.headingTau))
    s.velocity = {
      x: Math.sin(s.heading) * s.speed,
      y: (ref.position.y - s.position.y) / Math.max(dt, 1e-3),
      z: Math.cos(s.heading) * s.speed
    }
    s.refTime = ref.time

    const posErr = dist(s.position, ref.position)
    let headErr = Math.abs(dh) * (180 / Math.PI)
    this.errors.push({ t: ref.time, positionError: posErr, headingError: headErr })
    return s
  }

  stats(): TrackingStats {
    if (this.errors.length === 0) {
      return { meanError: 0, maxError: 0, meanHeadingError: 0, samples: 0 }
    }
    let sum = 0
    let max = 0
    let sumH = 0
    for (const e of this.errors) {
      sum += e.positionError
      max = Math.max(max, e.positionError)
      sumH += e.headingError
    }
    return {
      meanError: sum / this.errors.length,
      maxError: max,
      meanHeadingError: sumH / this.errors.length,
      samples: this.errors.length
    }
  }
}

/** 在参考轨迹上按固定步长离线推演跟踪轨迹（供规划后评估与可视化） */
export function simulateTracking(
  ref: TrajectorySample[],
  cfg: TrackerConfig = DEFAULT_TRACKER,
  dt = 0.2
): { states: TrackState[]; stats: TrackingStats } {
  const tracker = new TrajectoryTracker(cfg)
  if (ref.length === 0) return { states: [], stats: tracker.stats() }
  tracker.reset(ref[0].position, Math.atan2(ref[0].velocity.x, ref[0].velocity.z))
  const states: TrackState[] = [{ ...tracker.state, position: { ...tracker.state.position } }]
  const tEnd = ref[ref.length - 1].time
  for (let t = dt; t <= tEnd; t += dt) {
    const sample = sampleTrajectory(ref, t)
    const st = tracker.step(sample, dt)
    states.push({ ...st, position: { ...st.position } })
  }
  return { states, stats: tracker.stats() }
}

/** 在参考轨迹上按时间线性插值取样 */
export function sampleTrajectory(
  traj: TrajectorySample[],
  time: number
): TrajectorySample {
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
  const a = traj[lo]
  const b = traj[lo + 1]
  const ddt = b.time - a.time
  const t = ddt > 1e-6 ? (time - a.time) / ddt : 0
  return {
    time,
    s: a.s + (b.s - a.s) * t,
    speed: a.speed + (b.speed - a.speed) * t,
    position: {
      x: a.position.x + (b.position.x - a.position.x) * t,
      y: a.position.y + (b.position.y - a.position.y) * t,
      z: a.position.z + (b.position.z - a.position.z) * t
    },
    velocity: {
      x: a.velocity.x + (b.velocity.x - a.velocity.x) * t,
      y: a.velocity.y + (b.velocity.y - a.velocity.y) * t,
      z: a.velocity.z + (b.velocity.z - a.velocity.z) * t
    }
  }
}
