import { defineStore } from 'pinia'
import PlannerWorker from '@/workers/planner.worker.ts?worker'
import type {
  PlanMultiRequest,
  WorkerRequest,
  WorkerResponse
} from '@/workers/planner.worker'
import type {
  CameraMode,
  PlanParams,
  PlanResult,
  PlanningStats,
  ReplanConfig,
  ReplanEvent,
  SerializedScene,
  SmoothingType,
  SmoothMetrics,
  TrackingStats,
  Vec3
} from '@/types'
import type { TrajectorySample } from '@/core/smoothing'
import { Environment } from '@/core/environment'
import { environmentAt } from '@/core/dynamicEnv'
import { getCostCurve, planMultiMission } from '@/core/planning'
import { densify, planTrajectory } from '@/core/smoothing'
import {
  DEFAULT_TRACKER,
  simulateTracking,
  type TrackState
} from '@/core/tracking'
import {
  detectReplanTrigger,
  localReplan
} from '@/core/replan'
import { defaultReplanConfig } from '@/core/defaults'
import { useSceneStore } from './scene'

export interface CostCurvePoint {
  distance: number
  cumulative: number
}

/** 局部重规划时额外计算的候选算法（主算法始终作为第一个候选） */
const REPLAN_CANDIDATE_ALGOS = ['rrt'] as const

/** 单架无人机的仿真状态 */
export interface UavSimState {
  result: PlanResult | null
  rawPath: Vec3[]
  smoothPath: Vec3[]
  trajectory: TrajectorySample[]
  /** 全局 simTime 与轨迹局部时间的偏移：local = simTime - clockBase */
  clockBase: number
  costCurve: CostCurvePoint[]
  trackingStates: TrackState[]
  trackingStats: TrackingStats | null
  lastReplanTime: number
  replanCount: number
}

function emptyUavState(): UavSimState {
  return {
    result: null,
    rawPath: [],
    smoothPath: [],
    trajectory: [],
    clockBase: 0,
    costCurve: [],
    trackingStates: [],
    trackingStats: null,
    lastReplanTime: -999,
    replanCount: 0
  }
}

function EMPTY_STATS(): PlanningStats {
  return {
    distance: 0,
    threatExposure: 0,
    exposureTime: 0,
    planTimeMs: 0,
    expandedNodes: 0,
    success: false,
    segments: 0,
    obstacleAvoidanceRate: 0,
    totalCost: 0,
    costBreakdown: { distance: 0, threat: 0, altitude: 0, nofly: 0, smooth: 0 }
  }
}

type PlanStatus = 'idle' | 'planning' | 'done' | 'failed'

interface SimState {
  status: PlanStatus
  message: string
  smoothing: SmoothingType
  /** 多无人机规划结果 */
  uavStates: Record<string, UavSimState>
  /** 播放状态 */
  playing: boolean
  simTime: number
  duration: number
  playbackSpeed: number
  /** 当前无人机所在位置/朝向（活动无人机，由渲染循环回写） */
  dronePosition: Vec3
  droneHeading: number
  cameraMode: CameraMode
  /** 本次规划是否参数脏（环境/参数变更后置 true） */
  dirty: boolean
  autoReplan: boolean
  showThreatHeatmap: boolean
  /** 迭代二：在线重规划配置 */
  replanConfig: ReplanConfig
  /** 在线重规划事件流（最近在前，上限保留） */
  replanEvents: ReplanEvent[]
  /** 是否启用轨迹跟踪仿真（实际 vs 参考） */
  trackingEnabled: boolean
  /** 是否显示安全裕度颜色映射（否则按威胁强度着色） */
  safetyColorMode: boolean
  /** 是否显示动态障碍预测轨迹 */
  showPrediction: boolean
  /** 是否显示局部重规划窗口/候选 */
  showReplanWindow: boolean
}

export const useSimStore = defineStore('sim', {
  state: (): SimState => ({
    status: 'idle',
    message: '就绪',
    smoothing: 'bspline',
    uavStates: {},
    playing: false,
    simTime: 0,
    duration: 0,
    playbackSpeed: 1,
    dronePosition: { x: 0, y: 0, z: 0 },
    droneHeading: 0,
    cameraMode: 'orbit',
    dirty: true,
    autoReplan: false,
    showThreatHeatmap: false,
    replanConfig: { ...defaultReplanConfig },
    replanEvents: [],
    trackingEnabled: false,
    safetyColorMode: false,
    showPrediction: true,
    showReplanWindow: true
  }),

  getters: {
    progress: (s) => (s.duration > 0 ? Math.min(1, s.simTime / s.duration) : 0),
    // 迭代一兼容别名：活动无人机的数据
    rawPath(s): Vec3[] {
      const scene = useSceneStore()
      return s.uavStates[scene.activeUavId]?.rawPath ?? []
    },
    smoothPath(s): Vec3[] {
      const scene = useSceneStore()
      return s.uavStates[scene.activeUavId]?.smoothPath ?? []
    },
    trajectory(s): TrajectorySample[] {
      const scene = useSceneStore()
      return s.uavStates[scene.activeUavId]?.trajectory ?? []
    },
    stats(s): PlanningStats | null {
      const scene = useSceneStore()
      return s.uavStates[scene.activeUavId]?.result?.stats ?? null
    },
    costCurve(s): CostCurvePoint[] {
      const scene = useSceneStore()
      return s.uavStates[scene.activeUavId]?.costCurve ?? []
    },
    constraintReport(s) {
      const scene = useSceneStore()
      return s.uavStates[scene.activeUavId]?.result?.constraintReport ?? null
    },
    rawMetrics(s): SmoothMetrics | undefined {
      const scene = useSceneStore()
      return s.uavStates[scene.activeUavId]?.result?.rawMetrics
    },
    smoothMetrics(s): SmoothMetrics | undefined {
      const scene = useSceneStore()
      return s.uavStates[scene.activeUavId]?.result?.smoothMetrics
    },
    trackingStats(s): TrackingStats | null {
      const scene = useSceneStore()
      return s.uavStates[scene.activeUavId]?.trackingStats ?? null
    },
    /** 最新一条重规划事件（渲染层做短暂高亮） */
    lastReplanEvent: (s): ReplanEvent | null => s.replanEvents[0] ?? null
  },

  actions: {
    setCameraMode(mode: CameraMode) {
      this.cameraMode = mode
    },

    setSmoothing(mode: SmoothingType) {
      this.smoothing = mode
      this.dirty = true
    },

    markDirty() {
      this.dirty = true
    },

    setPlaybackSpeed(v: number) {
      this.playbackSpeed = v
    },

    setDroneTransform(p: Vec3, heading: number) {
      this.dronePosition = p
      this.droneHeading = heading
    },

    play() {
      if (Object.values(this.uavStates).every((u) => u.trajectory.length < 2)) return
      if (this.simTime >= this.duration) this.simTime = 0
      this.playing = true
    },

    pause() {
      this.playing = false
    },

    togglePlay() {
      if (this.playing) this.pause()
      else this.play()
    },

    seek(t: number) {
      this.simTime = Math.max(0, Math.min(this.duration, t))
    },

    /** 渲染循环每帧调用，推进仿真时钟 */
    advance(dt: number) {
      if (!this.playing) return
      const hasTraj = Object.values(this.uavStates).some(
        (u) => u.trajectory.length >= 2
      )
      if (!hasTraj) return
      this.simTime += dt * this.playbackSpeed
      if (this.simTime >= this.duration) {
        this.simTime = this.duration
        this.playing = false
      }
    },

    resetPlayback() {
      this.playing = false
      this.simTime = 0
    },

    /** 构建 t 时刻的动态环境快照（动态威胁/移动障碍） */
    buildEnvironmentAt(t: number): Environment {
      const scene = useSceneStore()
      return environmentAt(
        {
          terrain: scene.terrain,
          threats: scene.threats,
          noflyZones: scene.noflyZones,
          obstacles: scene.obstacles,
          dynamics: scene.dynamics
        },
        t
      )
    },

    /** 静态环境（t=0，用于编辑/全局规划兜底） */
    buildEnvironment(): Environment {
      return this.buildEnvironmentAt(0)
    },

    // ---------- 多机规划 ----------

    ensureUavStates() {
      const scene = useSceneStore()
      for (const u of scene.uavs) {
        if (!this.uavStates[u.id]) this.uavStates[u.id] = emptyUavState()
      }
    },

    /** 主线程规划（同步，用于测试 / Worker 不可用时兜底）：规划全部无人机 */
    planLocally(): PlanResult {
      const scene = useSceneStore()
      this.ensureUavStates()
      const env = this.buildEnvironmentAt(0)
      const results = planMultiMission(
        env,
        scene.waypoints,
        scene.planParams,
        scene.weights,
        { smoothing: this.smoothing }
      )
      for (const u of scene.uavs) {
        const r = results[u.id]
        if (r) this.applyUavResult(u.id, r, env)
      }
      this.finishPlan(results[scene.activeUavId])
      return results[scene.activeUavId] ?? this.failureResult('无机可规划')
    },

    /** 通过 Web Worker 执行多机全局规划（并行，不阻塞渲染） */
    plan(): Promise<PlanResult> {
      const scene = useSceneStore()
      this.status = 'planning'
      this.message = '规划中…'
      this.pause()
      this.ensureUavStates()

      return new Promise((resolve) => {
        const worker = new PlannerWorker()
        const req: PlanMultiRequest = {
          type: 'plan-multi',
          terrain: scene.terrain,
          threats: JSON.parse(JSON.stringify(scene.threats)),
          noflyZones: JSON.parse(JSON.stringify(scene.noflyZones)),
          obstacles: JSON.parse(JSON.stringify(scene.obstacles)),
          dynamics: JSON.parse(JSON.stringify(scene.dynamics)),
          waypoints: JSON.parse(JSON.stringify(scene.waypoints)),
          uavIds: scene.uavs.map((u) => u.id),
          planParams: JSON.parse(JSON.stringify(scene.planParams)),
          weights: JSON.parse(JSON.stringify(scene.weights)),
          smoothing: this.smoothing
        }

        const timer = setTimeout(() => {
          worker.terminate()
          this.status = 'failed'
          this.message = '规划超时（请增大栅格分辨率或减少最大节点数）'
          resolve(this.failureResult(this.message))
        }, 30000)

        worker.onmessage = (ev: MessageEvent<WorkerResponse>) => {
          clearTimeout(timer)
          const msg = ev.data
          if (msg.type === 'plan-multi-done') {
            const env = this.buildEnvironmentAt(0)
            for (const u of scene.uavs) {
              const r = msg.results[u.id]
              if (r) this.applyUavResult(u.id, r, env)
            }
            const active = msg.results[scene.activeUavId]
            this.finishPlan(active)
            const okCount = Object.values(msg.results).filter((r) => r.success).length
            this.message = `规划完成 ${okCount}/${scene.uavs.length} 架（Worker ${msg.workerMs} ms）`
            worker.terminate()
            resolve(active ?? this.failureResult('无规划结果'))
          } else if (msg.type === 'plan-done') {
            // 兼容只返回单机结果的 Worker
            this.applyUavResult(scene.activeUavId, msg.result, this.buildEnvironmentAt(0))
            this.finishPlan(msg.result)
            this.message = msg.result.success
              ? `规划成功（Worker ${msg.workerMs} ms）`
              : msg.result.message
            worker.terminate()
            resolve(msg.result)
          }
        }
        worker.onerror = (e) => {
          clearTimeout(timer)
          this.status = 'failed'
          this.message = `Worker 错误：${e.message}`
          worker.terminate()
          resolve(this.failureResult(this.message))
        }
        worker.postMessage(req as WorkerRequest)
      })
    },

    failureResult(message: string): PlanResult {
      return {
        success: false,
        rawPath: [],
        smoothPath: [],
        stats: EMPTY_STATS(),
        legs: [],
        message
      }
    },

    finishPlan(active?: PlanResult) {
      this.status = active?.success ? 'done' : active ? 'failed' : 'idle'
      this.dirty = false
      this.simTime = 0
      this.playing = false
      this.replanEvents = []
      this.recomputeDuration()
      const scene = useSceneStore()
      const st = this.uavStates[scene.activeUavId]
      if (st?.trajectory.length) {
        this.dronePosition = { ...st.trajectory[0].position }
      }
    },

    /** 应用单机规划结果：平滑路径、代价曲线、速度轨迹、跟踪仿真 */
    applyUavResult(uavId: string, result: PlanResult, env: Environment) {
      const scene = useSceneStore()
      if (!this.uavStates[uavId]) this.uavStates[uavId] = emptyUavState()
      const st = this.uavStates[uavId]
      st.result = result
      st.rawPath = result.rawPath
      st.smoothPath = result.smoothPath
      st.clockBase = 0
      st.lastReplanTime = -999
      st.replanCount = 0

      if (result.success && result.smoothPath.length >= 2) {
        st.costCurve = getCostCurve(
          env,
          result.smoothPath,
          scene.weights,
          scene.planParams
        ).map((c) => ({ distance: c.distance, cumulative: c.cumulative }))
        this.rebuildTrajectory(uavId, result.smoothPath, env)
      } else {
        st.costCurve = []
        st.trajectory = []
        st.trackingStates = []
        st.trackingStats = null
      }
    },

    /** 由平滑路径重建速度轨迹并做离线跟踪仿真 */
    rebuildTrajectory(uavId: string, smoothPath: Vec3[], env?: Environment) {
      const scene = useSceneStore()
      const st = this.uavStates[uavId]
      if (!st) return
      st.trajectory = planTrajectory(smoothPath, scene.planParams)
      const { states, stats } = simulateTracking(
        st.trajectory,
        {
          ...DEFAULT_TRACKER,
          maxAccel: scene.planParams.dynamics.maxAccel
        },
        0.2
      )
      st.trackingStates = states
      st.trackingStats = stats
      void env
    },

    recomputeDuration() {
      let max = 0
      for (const st of Object.values(this.uavStates)) {
        if (st.trajectory.length > 0) {
          max = Math.max(max, st.trajectory[st.trajectory.length - 1].time + st.clockBase)
        }
      }
      this.duration = max
    },

    // ---------- 迭代一兼容接口（作用于活动无人机） ----------

    applyPlanResult(
      result: PlanResult,
      planParams: PlanParams,
      weights: SerializedScene['weights'],
      env: Environment
    ) {
      const scene = useSceneStore()
      this.ensureUavStates()
      this.applyUavResult(scene.activeUavId, result, env)
      void planParams
      void weights
      this.finishPlan(result)
    },

    requestTrajectory(
      _env: Environment,
      smoothPath: Vec3[],
      _planParams: PlanParams
    ) {
      const scene = useSceneStore()
      this.rebuildTrajectory(scene.activeUavId, smoothPath)
      this.recomputeDuration()
      this.simTime = 0
      const st = this.uavStates[scene.activeUavId]
      if (st?.trajectory.length) {
        this.dronePosition = { ...st.trajectory[0].position }
      }
    },

    /** 按当前全局仿真时间在活动无人机轨迹上插值（含 clockBase 偏移） */
    sampleAt(time: number): TrajectorySample | null {
      const scene = useSceneStore()
      const st = this.uavStates[scene.activeUavId]
      if (!st || st.trajectory.length === 0) return null
      return this.sampleUavAt(scene.activeUavId, time)
    },

    /** 指定无人机在全局时间 time 的参考轨迹样本 */
    sampleUavAt(uavId: string, time: number): TrajectorySample | null {
      const st = this.uavStates[uavId]
      if (!st || st.trajectory.length === 0) return null
      const local = time - st.clockBase
      return interpTrajectory(st.trajectory, local)
    },

    /** 指定无人机的跟踪（实际）状态；未启用跟踪时回退参考样本 */
    trackedSample(uavId: string, time: number): TrackState | null {
      const st = this.uavStates[uavId]
      if (!st) return null
      const local = time - st.clockBase
      if (this.trackingEnabled && st.trackingStates.length > 1) {
        const arr = st.trackingStates
        if (local <= arr[0].refTime) return arr[0]
        const last = arr[arr.length - 1]
        if (local >= last.refTime) return last
        let lo = 0
        let hi = arr.length - 1
        while (lo < hi - 1) {
          const mid = (lo + hi) >> 1
          if (arr[mid].refTime <= local) lo = mid
          else hi = mid
        }
        const a = arr[lo]
        const b = arr[lo + 1]
        const dt = b.refTime - a.refTime
        const t = dt > 1e-6 ? (local - a.refTime) / dt : 0
        return {
          refTime: local,
          speed: a.speed + (b.speed - a.speed) * t,
          heading: a.heading + (b.heading - a.heading) * t,
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
      const ref = interpTrajectory(st.trajectory, local)
      if (!ref) return null
      return {
        position: ref.position,
        velocity: ref.velocity,
        speed: ref.speed,
        heading: Math.atan2(ref.velocity.x, ref.velocity.z),
        refTime: local
      }
    },

    // ---------- 在线重规划 ----------

    /**
     * 渲染循环周期调用（约 4Hz）：对各无人机检测触发条件并局部重规划。
     * 局部规划在主线程同步执行（规模小、有节点上限）。
     */
    tickOnlineReplan(env: Environment, dt: number) {
      if (!this.replanConfig.enabled || !this.playing) return
      void dt
      const scene = useSceneStore()
      for (const uavId of Object.keys(this.uavStates)) {
        const st = this.uavStates[uavId]
        if (!st || st.trajectory.length < 4) continue
        const local = this.simTime - st.clockBase
        if (local < 0.2) continue
        const pose = this.trackedSample(uavId, this.simTime)
        if (!pose) continue

        const trigger = detectReplanTrigger({
          time: this.simTime,
          position: pose.position,
          heading: pose.heading,
          trajectory: st.trajectory,
          env,
          params: scene.planParams,
          weights: scene.weights,
          config: this.replanConfig,
          lastReplanTime: st.lastReplanTime
        })
        if (!trigger.reason) continue

        const rr = localReplan(
          {
            time: this.simTime,
            position: pose.position,
            heading: pose.heading,
            trajectory: st.trajectory,
            env,
            params: scene.planParams,
            weights: scene.weights,
            config: this.replanConfig,
            lastReplanTime: st.lastReplanTime
          },
          trigger.reason,
          trigger.label,
          trigger.entityId,
          [...REPLAN_CANDIDATE_ALGOS]
        )

        if (rr.success && rr.mergedPath) {
          // 用与重规划同一密度的加密路径计算到「重规划起点（前瞻点）」的弧长，
          // 当前位置到前瞻点的已飞段仍由原轨迹提供，保证时间对齐。
          const oldDense = densify(
            st.smoothPath,
            Math.max(scene.planParams.cellSize * 0.5, 4)
          )
          const flown = nearestArcLength(oldDense, rr.event.replanFrom)
          this.rebuildTrajectory(uavId, rr.mergedPath)
          const newLocal = this.timeAtArcLength(uavId, flown)
          st.clockBase = this.simTime - newLocal
          st.lastReplanTime = this.simTime
          st.replanCount++
          st.result = st.result
            ? {
                ...st.result,
                smoothPath: rr.mergedPath,
                rawPath: rr.mergedPath
              }
            : null
          this.replanEvents.unshift(rr.event)
          if (this.replanEvents.length > 12) this.replanEvents.length = 12
          this.recomputeDuration()
        } else {
          // 触发但重规划失败也提示（避免无提示穿障）
          st.lastReplanTime = this.simTime
          this.replanEvents.unshift({ ...rr.event, reasonLabel: rr.event.reasonLabel + '（重规划失败）' })
          if (this.replanEvents.length > 12) this.replanEvents.length = 12
        }
      }
    },

    /** 已参考轨迹最接近某位置点之前的弧长 */
    arcLengthBefore(uavId: string, p: Vec3): number {
      const st = this.uavStates[uavId]
      if (!st) return 0
      let bestI = 0
      let bd = Infinity
      st.trajectory.forEach((s, i) => {
        const d =
          (s.position.x - p.x) ** 2 +
          (s.position.y - p.y) ** 2 +
          (s.position.z - p.z) ** 2
        if (d < bd) {
          bd = d
          bestI = i
        }
      })
      return st.trajectory[bestI]?.s ?? 0
    },

    timeAtArcLength(uavId: string, s: number): number {
      const st = this.uavStates[uavId]
      if (!st || st.trajectory.length === 0) return 0
      let lo = 0
      let hi = st.trajectory.length - 1
      while (lo < hi - 1) {
        const mid = (lo + hi) >> 1
        if (st.trajectory[mid].s <= s) lo = mid
        else hi = mid
      }
      const a = st.trajectory[lo]
      const b = st.trajectory[lo + 1] ?? a
      const ds = b.s - a.s
      const t = ds > 1e-6 ? (s - a.s) / ds : 0
      return a.time + (b.time - a.time) * t
    },

    clearReplanEvents() {
      this.replanEvents = []
    },

    clearPlan() {
      this.uavStates = {}
      this.status = 'idle'
      this.message = '就绪'
      this.playing = false
      this.simTime = 0
      this.duration = 0
      this.dirty = true
      this.replanEvents = []
    },

    exportScene(): SerializedScene {
      const scene = useSceneStore()
      const st = this.uavStates[scene.activeUavId]
      return scene.serialize({
        rawPath: st?.rawPath ?? [],
        smoothPath: st?.smoothPath ?? [],
        trajectory: (st?.trajectory ?? []).map((t) => t.position),
        stats: st?.result?.stats ?? null
      })
    }
  }
})

/** 轨迹时间线性插值 */
function nearestArcLength(path: Vec3[], p: Vec3): number {
  let bestI = 0
  let bd = Infinity
  for (let i = 0; i < path.length; i++) {
    const d =
      (path[i].x - p.x) ** 2 +
      (path[i].y - p.y) ** 2 +
      (path[i].z - p.z) ** 2
    if (d < bd) {
      bd = d
      bestI = i
    }
  }
  let s = 0
  for (let i = 1; i <= bestI; i++) {
    s += Math.hypot(
      path[i].x - path[i - 1].x,
      path[i].y - path[i - 1].y,
      path[i].z - path[i - 1].z
    )
  }
  return s
}

/** 轨迹时间线性插值 */
function interpTrajectory(traj: TrajectorySample[], local: number): TrajectorySample | null {
  if (traj.length === 0) return null
  if (local <= traj[0].time) return traj[0]
  const last = traj[traj.length - 1]
  if (local >= last.time) return last
  let lo = 0
  let hi = traj.length - 1
  while (lo < hi - 1) {
    const mid = (lo + hi) >> 1
    if (traj[mid].time <= local) lo = mid
    else hi = mid
  }
  const a = traj[lo]
  const b = traj[lo + 1]
  const dt = b.time - a.time
  const t = dt > 1e-6 ? (local - a.time) / dt : 0
  return {
    time: local,
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
