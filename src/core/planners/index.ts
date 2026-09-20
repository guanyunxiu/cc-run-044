import type { AlgoType, CostWeights, PlanParams, Vec3 } from '@/types'
import type { Environment } from '../environment'
import {
  getPlanner,
  registerPlanner,
  type PlannerContext,
  type PlannerOutput
} from './types'
import { astarPlanner, dijkstraPlanner } from './grid'
import { rrtPlanner, rrtStarPlanner } from './rrt'
import { hybridAStarPlanner } from './hybrid'
import { acoPlanner, gaPlanner, psoPlanner } from './swarm'

let registered = false

/** 注册全部内置规划策略（可插拔：重复注册以同 type 覆盖） */
export function ensurePlannersRegistered(): void {
  if (registered) return
  registerPlanner(astarPlanner)
  registerPlanner(dijkstraPlanner)
  registerPlanner(rrtPlanner)
  registerPlanner(rrtStarPlanner)
  registerPlanner(hybridAStarPlanner)
  registerPlanner(acoPlanner)
  registerPlanner(psoPlanner)
  registerPlanner(gaPlanner)
  registered = true
}

export const ALGO_LABELS: Record<AlgoType, string> = {
  astar: 'A*',
  dijkstra: 'Dijkstra',
  rrt: 'RRT',
  rrtstar: 'RRT*',
  hybridastar: 'Hybrid A*',
  aco: '蚁群算法',
  pso: '粒子群算法',
  ga: '遗传算法'
}

/** 需要体素栅格的算法（参数面板栅格分辨率对其有意义） */
export const GRID_ALGOS: AlgoType[] = ['astar', 'dijkstra']

export function isGridAlgo(algo: AlgoType): boolean {
  return GRID_ALGOS.includes(algo)
}

/**
 * 统一规划入口：按 algo 从注册表取规划器执行；
 * 采样/群智算法失败且 fallbackToAstar 时回退到栅格 A*。
 */
export function runPlanner(
  env: Environment,
  start: Vec3,
  goal: Vec3,
  params: PlanParams,
  weights: CostWeights
): PlannerOutput {
  ensurePlannersRegistered()
  const ctx: PlannerContext = {
    env,
    params,
    weights,
    seed: params.advanced.seed
  }
  const planner = getPlanner(params.algo)
  if (!planner) {
    const fallback = getPlanner('astar')!
    return fallback.plan(start, goal, ctx)
  }
  const result = planner.plan(start, goal, ctx)
  if (!result.success && params.advanced.fallbackToAstar && params.algo !== 'astar') {
    const fb = getPlanner('astar')!
    const r = fb.plan(start, goal, { ...ctx, params: { ...params, algo: 'astar' } })
    if (r.success) {
      return {
        ...r,
        algo: 'astar',
        message: `${planner.label}未成功，已回退 A*：${result.message}`
      }
    }
  }
  return result
}

/** 规划策略对比：对给定算法集合逐一规划，返回候选结果 */
export function comparePlanners(
  env: Environment,
  start: Vec3,
  goal: Vec3,
  params: PlanParams,
  weights: CostWeights,
  algos: AlgoType[]
): PlannerOutput[] {
  ensurePlannersRegistered()
  const out: PlannerOutput[] = []
  for (const algo of algos) {
    const r = runPlanner(env, start, goal, { ...params, algo }, weights)
    out.push(r)
  }
  return out
}

export * from './types'
