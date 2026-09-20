import type { Vec3 } from '@/types'
import { GridPlanner } from '../planner'
import type { Planner, PlannerContext } from './types'

/** A* / Dijkstra 栅格规划器适配器 */
function gridPlanner(algo: 'astar' | 'dijkstra', label: string): Planner {
  return {
    type: algo,
    label,
    plan(start: Vec3, goal: Vec3, ctx: PlannerContext) {
      const params = { ...ctx.params, algo }
      const g = new GridPlanner(ctx.env, params, ctx.weights)
      const r = g.plan(start, goal)
      return { ...r, algo }
    }
  }
}

export const astarPlanner: Planner = gridPlanner('astar', 'A* 三维搜索')
export const dijkstraPlanner: Planner = gridPlanner('dijkstra', 'Dijkstra')
