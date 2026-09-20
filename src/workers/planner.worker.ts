/// <reference lib="webworker" />
import { Environment } from '@/core/environment'
import { environmentAt } from '@/core/dynamicEnv'
import { planMission, planMultiMission } from '@/core/planning'
import { planTrajectory, type TrajectorySample } from '@/core/smoothing'
import { comparePlanners } from '@/core/planners'
import { evaluatePath } from '@/core/cost'
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

export interface PlanRequest {
  type: 'plan'
  terrain: TerrainParams
  threats: ThreatZone[]
  noflyZones: NoFlyZone[]
  obstacles: BuildingObstacle[]
  dynamics?: DynamicEntity[]
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

/** 迭代二：多无人机任务规划请求/响应 */
export interface PlanMultiRequest {
  type: 'plan-multi'
  terrain: TerrainParams
  threats: ThreatZone[]
  noflyZones: NoFlyZone[]
  obstacles: BuildingObstacle[]
  dynamics: DynamicEntity[]
  waypoints: Waypoint[]
  uavIds: string[]
  planParams: PlanParams
  weights: CostWeights
  smoothing: SmoothingType
}

export interface PlanMultiResponse {
  type: 'plan-multi-done'
  results: Record<string, PlanResult>
  workerMs: number
}

/** 规划策略对比请求 */
export interface CompareRequest {
  type: 'compare'
  terrain: TerrainParams
  threats: ThreatZone[]
  noflyZones: NoFlyZone[]
  obstacles: BuildingObstacle[]
  dynamics: DynamicEntity[]
  start: Vec3
  goal: Vec3
  planParams: PlanParams
  weights: CostWeights
  algos: AlgoType[]
}

export interface CompareCandidate {
  algo: AlgoType
  label: string
  success: boolean
  path: Vec3[]
  distance: number
  totalCost: number
  expandedNodes: number
  planTimeMs: number
  message: string
}

export interface CompareResponse {
  type: 'compare-done'
  candidates: CompareCandidate[]
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

export type WorkerRequest =
  | PlanRequest
  | PlanMultiRequest
  | CompareRequest
  | TrajRequest
export type WorkerResponse =
  | PlanResponse
  | PlanMultiResponse
  | CompareResponse
  | TrajResponse

const ctx = self as unknown as DedicatedWorkerGlobalScope

ctx.onmessage = (ev: MessageEvent<WorkerRequest>) => {
  const msg = ev.data

  if (msg.type === 'plan') {
    const env = msg.dynamics
      ? environmentAt(
          {
            terrain: msg.terrain,
            threats: msg.threats,
            noflyZones: msg.noflyZones,
            obstacles: msg.obstacles,
            dynamics: msg.dynamics
          },
          0
        )
      : new Environment(
          msg.terrain,
          msg.threats,
          msg.noflyZones,
          msg.obstacles
        )
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
  } else if (msg.type === 'plan-multi') {
    const env = environmentAt(
      {
        terrain: msg.terrain,
        threats: msg.threats,
        noflyZones: msg.noflyZones,
        obstacles: msg.obstacles,
        dynamics: msg.dynamics
      },
      0
    )
    const t0 = performance.now()
    const results = planMultiMission(
      env,
      msg.waypoints,
      msg.planParams,
      msg.weights,
      { smoothing: msg.smoothing }
    )
    // 保证每个请求的 uavId 都有结果
    for (const id of msg.uavIds) {
      if (!results[id]) {
        results[id] = {
          success: false,
          rawPath: [],
          smoothPath: [],
          stats: {
            distance: 0,
            threatExposure: 0,
            exposureTime: 0,
            planTimeMs: 0,
            expandedNodes: 0,
            success: false,
            segments: 0,
            obstacleAvoidanceRate: 0,
            totalCost: 0,
            costBreakdown: {
              distance: 0,
              threat: 0,
              altitude: 0,
              nofly: 0,
              smooth: 0
            }
          },
          legs: [],
          message: '该无人机缺少起终点'
        }
      }
    }
    const res: PlanMultiResponse = {
      type: 'plan-multi-done',
      results,
      workerMs: Math.round((performance.now() - t0) * 100) / 100
    }
    ctx.postMessage(res)
  } else if (msg.type === 'compare') {
    const env = environmentAt(
      {
        terrain: msg.terrain,
        threats: msg.threats,
        noflyZones: msg.noflyZones,
        obstacles: msg.obstacles,
        dynamics: msg.dynamics
      },
      0
    )
    const outputs = comparePlanners(
      env,
      msg.start,
      msg.goal,
      msg.planParams,
      msg.weights,
      msg.algos
    )
    const candidates: CompareCandidate[] = outputs.map((o, i) => {
      const algo = msg.algos[i]
      let distance = 0
      let totalCost = 0
      if (o.success) {
        for (let k = 1; k < o.path.length; k++) {
          distance += Math.hypot(
            o.path[k].x - o.path[k - 1].x,
            o.path[k].y - o.path[k - 1].y,
            o.path[k].z - o.path[k - 1].z
          )
        }
        totalCost = evaluatePath(env, o.path, msg.weights, msg.planParams).total
      }
      return {
        algo,
        label: algo,
        success: o.success,
        path: o.path,
        distance,
        totalCost,
        expandedNodes: o.expandedNodes,
        planTimeMs: 0,
        message: o.message
      }
    })
    const res: CompareResponse = { type: 'compare-done', candidates }
    ctx.postMessage(res)
  } else if (msg.type === 'trajectory') {
    const trajectory = planTrajectory(
      msg.smoothPath,
      msg.planParams,
      msg.cruiseSpeed
    )
    const res: TrajResponse = { type: 'trajectory-done', trajectory }
    ctx.postMessage(res)
  }
}
