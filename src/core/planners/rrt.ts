import type { AlgoType, Vec3 } from '@/types'
import {
  ensureFree,
  losShortcut,
  pathCollisionFree,
  type Planner,
  type PlannerContext,
  type PlannerOutput,
  SeededRandom
} from './types'

interface RrtNode {
  p: Vec3
  parent: number
  cost: number
}

interface RrtConfig {
  type: AlgoType
  label: string
  star: boolean
}

/**
 * RRT / RRT* 三维采样规划器。
 * - 在地形包围盒内均匀采样（高度偏置巡航层），目标偏置引导收敛；
 * - 扩展前做航段碰撞采样，满足 clearance；
 * - RRT* 在 near 半径内做选父与重布线，路径代价渐近最优；
 * - 动力学约束通过启发式转向角限制（steer 时过滤过大转角）软嵌入；
 * - 成功后做 LOS 简化与碰撞复核。
 */
function makeRrt(cfg: RrtConfig): Planner {
  return {
    type: cfg.type,
    label: cfg.label,
    plan(start: Vec3, goal: Vec3, ctx: PlannerContext) {
      const { env, params } = ctx
      const adv = params.advanced
      const rng = new SeededRandom(adv.seed + (cfg.star ? 17 : 3))
      const size = env.terrain.params.size
      const half = size / 2
      const clearance = params.clearance
      const step = adv.rrtStep
      const maxNodes = adv.rrtMaxNodes

      const s = ensureFree(env, start, clearance)
      const g = ensureFree(env, goal, clearance)
      const nodes: RrtNode[] = [{ p: s, parent: -1, cost: 0 }]
      let goalIdx = -1
      let expanded = 0

      const maxTurnRad = params.dynamics.enabled
        ? (params.dynamics.maxTurnAngle * Math.PI) / 180
        : Math.PI

      const nearest = (p: Vec3): number => {
        let best = 0
        let bd = Infinity
        for (let i = 0; i < nodes.length; i++) {
          const d = dist2(nodes[i].p, p)
          if (d < bd) {
            bd = d
            best = i
          }
        }
        return best
      }

      const steer = (from: Vec3, to: Vec3): Vec3 => {
        const d = Math.hypot(to.x - from.x, to.y - from.y, to.z - from.z)
        if (d <= step) return { ...to }
        const t = step / d
        return {
          x: from.x + (to.x - from.x) * t,
          y: from.y + (to.y - from.y) * t,
          z: from.z + (to.z - from.z) * t
        }
      }

      /** 目标偏置采样标记（引导段豁免转弯角过滤，保证可朝目标收敛） */
      let isGoalSample = false
      const sample = (): Vec3 => {
        if (rng.next() < adv.goalBias) {
          isGoalSample = true
          return { ...g }
        }
        isGoalSample = false
        const x = rng.range(-half, half)
        const z = rng.range(-half, half)
        // 高度以巡航层为中心采样，但不低于地形净空
        const ground = env.groundHeight(x, z) + clearance + 5
        const y = Math.max(
          ground,
          Math.min(
            env.maxAltitude - 20,
            params.cruiseAlt + rng.range(-90, 90)
          )
        )
        return { x, y, z }
      }

      const headingOk = (parentIdx: number, from: Vec3, to: Vec3): boolean => {
        if (!params.dynamics.enabled || parentIdx < 0) return true
        // 目标引导段放宽，避免过滤器阻止收敛
        if (isGoalSample) return true
        const pp = nodes[parentIdx].p
        const h1 = Math.atan2(from.x - pp.x, from.z - pp.z)
        const h2 = Math.atan2(to.x - from.x, to.z - from.z)
        let dh = h2 - h1
        while (dh > Math.PI) dh -= Math.PI * 2
        while (dh < -Math.PI) dh += Math.PI * 2
        return Math.abs(dh) <= maxTurnRad
      }

      const nearIndices = (p: Vec3, radius: number): number[] => {
        const r2 = radius * radius
        const out: number[] = []
        for (let i = 0; i < nodes.length; i++) {
          if (dist2(nodes[i].p, p) <= r2) out.push(i)
        }
        return out
      }

      for (let it = 0; it < maxNodes; it++) {
        const target = sample()
        const ni = nearest(target)
        const parentNode = nodes[ni]
        const q = steer(parentNode.p, target)
        expanded++
        if (env.isBlocked(q, clearance)) continue
        if (!env.isSegmentFeasible(parentNode.p, q, clearance)) continue
        if (!headingOk(ni, parentNode.p, q)) continue

        let attachIdx = ni
        let attachCost = parentNode.cost + dist(parentNode.p, q)

        // RRT*：在近邻中选代价最小且可行的父节点
        if (cfg.star) {
          const near = nearIndices(q, adv.rrtStarRadius)
          for (const k of near) {
            const cand = nodes[k]
            const c = cand.cost + dist(cand.p, q)
            if (
              c < attachCost &&
              env.isSegmentFeasible(cand.p, q, clearance) &&
              headingOk(k, cand.p, q)
            ) {
              attachCost = c
              attachIdx = k
            }
          }
        }

        const newIdx = nodes.length
        nodes.push({ p: q, parent: attachIdx, cost: attachCost })

        // RRT*：重布线
        if (cfg.star) {
          const near = nearIndices(q, adv.rrtStarRadius)
          for (const k of near) {
            if (k === attachIdx) continue
            const cand = nodes[k]
            const c = attachCost + dist(q, cand.p)
            if (
              c < cand.cost &&
              env.isSegmentFeasible(q, cand.p, clearance) &&
              headingOk(newIdx, q, cand.p)
            ) {
              cand.parent = newIdx
              cand.cost = c
            }
          }
        }

        if (dist(q, g) <= step * 1.2 && env.isSegmentFeasible(q, g, clearance)) {
          const goalCost = attachCost + dist(q, g)
          if (goalIdx < 0 || goalCost < nodes[goalIdx]?.cost) {
            nodes.push({ p: { ...g }, parent: newIdx, cost: goalCost })
            goalIdx = nodes.length - 1
          }
          if (!cfg.star) break // 普通 RRT 首次到达即返回
        }
      }

      if (goalIdx < 0) {
        return fail(cfg.type, expanded, 'RRT 未在节点上限内到达目标')
      }
      const path: Vec3[] = []
      let cur: number | undefined = goalIdx
      while (cur !== undefined) {
        path.push(nodes[cur].p)
        cur = nodes[cur].parent >= 0 ? nodes[cur].parent : undefined
      }
      path.reverse()
      const simplified = losShortcut(env, path, clearance)
      if (!pathCollisionFree(env, simplified, clearance)) {
        return fail(cfg.type, expanded, 'RRT 简化后复核发现碰撞')
      }
      return out(cfg.type, simplified, expanded)
    }
  }
}

export const rrtPlanner = makeRrt({ type: 'rrt', label: 'RRT', star: false })
export const rrtStarPlanner = makeRrt({
  type: 'rrtstar',
  label: 'RRT*',
  star: true
})

function fail(algo: AlgoType, expanded: number, message: string): PlannerOutput {
  return { success: false, path: [], expandedNodes: expanded, message, algo }
}

function out(algo: AlgoType, path: Vec3[], expanded: number): PlannerOutput {
  return { success: true, path, expandedNodes: expanded, message: '规划成功', algo }
}

function dist(a: Vec3, b: Vec3): number {
  return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z)
}
function dist2(a: Vec3, b: Vec3): number {
  const dx = a.x - b.x
  const dy = a.y - b.y
  const dz = a.z - b.z
  return dx * dx + dy * dy + dz * dz
}
