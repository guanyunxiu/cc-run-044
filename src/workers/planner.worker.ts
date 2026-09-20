/// <reference lib="webworker" />
import { Environment } from '@/core/environment'
import { DynamicEnvironment } from '@/core/dynamic-environment'
import { compareAlgorithms, planMission } from '@/core/planning'
import { planTrajectory, type TrajectorySample } from '@/core/smoothing'
import type {
  AlgoType,
  BuildingObstacle,
  CostWeights,
  DynamicEntity,
  NoFlyZone,
  PlanParams,
  PlanResult,
  SmoothingType,
  TerrainParams,
  ThreatZone,
  Vec3,
  Waypoint
} from '@/types'
import type { AlgoCompareEntry } from '@/core/planning'

export interface PlanRequest {
  type: 'plan'
  terrain: TerrainParams
  threats: ThreatZone[]
  noflyZones: NoFlyZone[]
  obstacles: BuildingObstacle[]
  /** 动态实体（全局规划在 t=0 口径下不参与碰撞，仅用于在线重规划） */
  dynamics: DynamicEntity[]
  waypoints: Waypoint[]
  planParams: PlanParams
  weights: CostWeights
  smoothing: SmoothingType
}

export interface PlanResponse {
  type: 'plan-done'
  result: PlanResult
  /** 规划用时（Worker 内测量） */
  workerMs: number
}

export interface TrajRequest {
  type: 'trajectory'
  terrain: TerrainParams
  threats: ThreatZone[]
  noflyZones: NoFlyZone[]
  obstacles: BuildingObstacle[]
  smoothPath: Vec3[]
  planParams: PlanParams
  cruiseSpeed?: number
}

export interface TrajResponse {
  type: 'trajectory-done'
  trajectory: TrajectorySample[]
}

export interface CompareRequest {
  type: 'compare'
  terrain: TerrainParams
  threats: ThreatZone[]
  noflyZones: NoFlyZone[]
  obstacles: BuildingObstacle[]
  dynamics: DynamicEntity[]
  waypoints: Waypoint[]
  planParams: PlanParams
  weights: CostWeights
  smoothing: SmoothingType
  algos: AlgoType[]
}

export interface CompareResponse {
  type: 'compare-done'
  entries: AlgoCompareEntry[]
  workerMs: number
}

export type WorkerRequest = PlanRequest | TrajRequest | CompareRequest
export type WorkerResponse = PlanResponse | TrajResponse | CompareResponse

const ctx = self as unknown as DedicatedWorkerGlobalScope

ctx.onmessage = (ev: MessageEvent<WorkerRequest>) => {
  const msg = ev.data
  // 全局规划使用静态环境（动态威胁/障碍在回放期由在线重规划处理）
  const env = new Environment(
    msg.terrain,
    msg.threats,
    msg.noflyZones,
    msg.obstacles
  )

  if (msg.type === 'plan') {
    const t0 = performance.now()
    const result = planMission(
      env,
      msg.waypoints,
      msg.planParams,
      msg.weights,
      { smoothing: msg.smoothing }
    )
    const workerMs = performance.now() - t0
    const res: PlanResponse = {
      type: 'plan-done',
      result,
      workerMs: Math.round(workerMs * 100) / 100
    }
    ctx.postMessage(res)
  } else if (msg.type === 'trajectory') {
    const trajectory = planTrajectory(
      msg.smoothPath,
      msg.planParams,
      msg.cruiseSpeed
    )
    const res: TrajResponse = { type: 'trajectory-done', trajectory }
    ctx.postMessage(res)
  } else if (msg.type === 'compare') {
    const dynEnv = new DynamicEnvironment(
      msg.terrain,
      msg.threats,
      msg.noflyZones,
      msg.obstacles,
      msg.dynamics
    )
    void dynEnv
    const t0 = performance.now()
    const entries = compareAlgorithms(
      env,
      msg.waypoints,
      msg.planParams,
      msg.weights,
      msg.algos,
      msg.smoothing
    )
    const res: CompareResponse = {
      type: 'compare-done',
      entries,
      workerMs: Math.round((performance.now() - t0) * 100) / 100
    }
    ctx.postMessage(res)
  }
}
