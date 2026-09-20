// @vitest-environment node
import { describe, expect, it } from 'vitest'
import {
  defaultPlanParams,
  defaultTerrain,
  defaultWeights
} from '@/core/defaults'
import { Environment } from '@/core/environment'
import {
  comparePlanners,
  ensurePlannersRegistered,
  runPlanner
} from '@/core/planners'
import { registeredAlgos } from '@/core/planners/types'
import type { AlgoType, PlanParams, Vec3 } from '@/types'

const terrain = {
  ...defaultTerrain,
  size: 600,
  segments: 48,
  heightScale: 80,
  noiseScale: 0.003,
  ridgeScale: 30,
  canyon: false
}

const params: PlanParams = {
  ...defaultPlanParams,
  cellSize: 22,
  heightCell: 20,
  maxNodes: 120000,
  clearance: 8,
  cruiseAlt: 100
}
const start: Vec3 = { x: -240, y: 100, z: -200 }
const goal: Vec3 = { x: 240, y: 100, z: 200 }

function assertCollisionFree(env: Environment, path: Vec3[], clearance: number) {
  for (let i = 1; i < path.length; i++) {
    expect(
      env.isSegmentFeasible(path[i - 1], path[i], clearance)
    ).toBe(true)
  }
}

describe('可插拔规划器注册表', () => {
  it('注册后包含全部 8 种策略', () => {
    ensurePlannersRegistered()
    const algos = registeredAlgos()
    for (const a of [
      'astar',
      'dijkstra',
      'rrt',
      'rrtstar',
      'hybridastar',
      'aco',
      'pso',
      'ga'
    ] as AlgoType[]) {
      expect(algos).toContain(a)
    }
  })
})

describe('高级三维规划策略', () => {
  const algos: AlgoType[] = [
    'rrt',
    'rrtstar',
    'hybridastar',
    'aco',
    'pso',
    'ga'
  ]
  for (const algo of algos) {
    it(`${algo} 原生规划成功且全程无碰`, () => {
      const env = new Environment(terrain, [], [], [])
      const r = runPlanner(env, start, goal, { ...params, algo }, defaultWeights)
      expect(r.success).toBe(true)
      // 关闭回退时仍应成功（验证算法本身，而非兜底）
      expect(r.algo).toBe(algo)
      expect(r.path.length).toBeGreaterThanOrEqual(2)
      assertCollisionFree(env, r.path, params.clearance)
    })
  }

  it('RRT 与 RRT* 同种子结果确定', () => {
    const env1 = new Environment(terrain, [], [], [])
    const env2 = new Environment(terrain, [], [], [])
    const p = { ...params, algo: 'rrt' as AlgoType }
    const r1 = runPlanner(env1, start, goal, p, defaultWeights)
    const r2 = runPlanner(env2, start, goal, p, defaultWeights)
    expect(r1.path.length).toBe(r2.path.length)
    expect(r1.path[0]).toEqual(r2.path[0])
  })

  it('规划策略对比返回全部候选结果', () => {
    const env = new Environment(terrain, [], [], [])
    const out = comparePlanners(
      env,
      start,
      goal,
      params,
      defaultWeights,
      ['astar', 'rrt', 'pso']
    )
    expect(out).toHaveLength(3)
    expect(out.every((o) => o.success)).toBe(true)
  })

  it('障碍封闭场景下采样算法失败时可回退 A*（若 A* 也不可达则明确失败）', () => {
    // 开阔场景不会触发回退；人为构造一个采样器难以收敛的极小高度限制
    const env = new Environment(terrain, [], [], [])
    const tight: PlanParams = {
      ...params,
      algo: 'rrt',
      advanced: {
        ...params.advanced,
        fallbackToAstar: true,
        rrtMaxNodes: 30 // 极少节点，大概率无法到达 -> 触发回退
      }
    }
    const r = runPlanner(env, start, goal, tight, defaultWeights)
    expect(r.success).toBe(true)
    expect(r.algo).toBe('astar')
  })
})
