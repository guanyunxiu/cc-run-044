import type { Vec3 } from '@/types'
import {
  ensureFree,
  losShortcut,
  pathCollisionFree,
  type Planner,
  type PlannerContext,
  type PlannerOutput
} from './types'

interface HNode {
  p: Vec3
  /** 航向（弧度） */
  h: number
  parent: number
  g: number
}

/** 二叉小顶堆（元素为节点 id，按 f=g+h 排序） */
class Heap {
  private ids: number[] = []
  constructor(private readonly f: (id: number) => number) {}
  get size(): number {
    return this.ids.length
  }
  push(id: number): void {
    this.ids.push(id)
    let i = this.ids.length - 1
    while (i > 0) {
      const p = (i - 1) >> 1
      if (this.f(this.ids[p]) <= this.f(this.ids[i])) break
      ;[this.ids[i], this.ids[p]] = [this.ids[p], this.ids[i]]
      i = p
    }
  }
  pop(): number {
    const top = this.ids[0]
    const last = this.ids.pop()!
    if (this.ids.length > 0) {
      this.ids[0] = last
      let i = 0
      const n = this.ids.length
      for (;;) {
        const l = i * 2 + 1
        const r = l + 1
        let s = i
        if (l < n && this.f(this.ids[l]) < this.f(this.ids[s])) s = l
        if (r < n && this.f(this.ids[r]) < this.f(this.ids[s])) s = r
        if (s === i) break
        ;[this.ids[i], this.ids[s]] = [this.ids[s], this.ids[i]]
        i = s
      }
    }
    return top
  }
}

/**
 * Hybrid A*（三维简化实现）：
 * - 状态 = 位置栅格 (ix,iy,iz) × 离散航向 bin，同一栅格只保留最优航向状态；
 * - 运动基元：固定步长 hybridStep，航向取 {-1,0,+1} 个航向 bin 的转向，
 *   曲率受最小转弯半径约束；竖直方向取 {-1,0,+1} 个爬升档（受爬升角约束）；
 * - 基元做碰撞采样，满足 clearance；
 * - 启发式 = 欧氏距离 × 权重 × 航程权重；找到目标后回溯并 LOS 简化。
 */
export const hybridAStarPlanner: Planner = {
  type: 'hybridastar',
  label: 'Hybrid A*',
  plan(start: Vec3, goal: Vec3, ctx: PlannerContext): PlannerOutput {
    const { env, params, weights } = ctx
    const adv = params.advanced
    const clearance = params.clearance
    const cell = Math.max(params.cellSize, 10)
    const hCell = Math.max(params.heightCell, 10)
    const bins = Math.max(8, adv.headingDiscretization)
    const step = Math.max(adv.hybridStep, cell * 0.8)
    const maxNodes = Math.min(params.maxNodes, 260000)

    const s = ensureFree(env, start, clearance)
    const g0 = ensureFree(env, goal, clearance)
    const h0 = Math.atan2(g0.x - s.x, g0.z - s.z)

    const nodes: HNode[] = [{ p: s, h: h0, parent: -1, g: 0 }]
    const bestAt = new Map<string, number>()
    const closed = new Set<number>()

    const keyOf = (p: Vec3, h: number): string => {
      const ix = Math.round(p.x / cell)
      const iy = Math.round(p.y / hCell)
      const iz = Math.round(p.z / cell)
      let b = Math.round((h / (Math.PI * 2)) * bins) % bins
      if (b < 0) b += bins
      return `${ix},${iy},${iz},${b}`
    }
    const startKey = keyOf(s, h0)
    bestAt.set(startKey, 0)

    const heuristic = (p: Vec3): number =>
      Math.hypot(p.x - g0.x, p.y - g0.y, p.z - g0.z) *
      params.heuristicWeight *
      weights.distance

    const heap = new Heap((id) => nodes[id].g + heuristic(nodes[id].p))
    heap.push(0)

    let expanded = 0
    let goalId = -1

    const maxTurnRad = params.dynamics.enabled
      ? (params.dynamics.maxTurnAngle * Math.PI) / 180
      : Math.PI / 3
    const minRadius = params.dynamics.enabled
      ? Math.max(params.dynamics.minTurnRadius, step)
      : step
    const maxClimb = params.dynamics.enabled
      ? (params.dynamics.maxClimbAngle * Math.PI) / 180
      : Math.PI / 4
    // 单步航向增量：受转弯角与最小半径双重约束
    const dTurn = Math.min(maxTurnRad, step / minRadius)
    const dClimb = Math.min(maxClimb, Math.PI / 6)

    const expandPrimitive = (
      node: HNode,
      turnSign: number,
      climbSign: number
    ): { p: Vec3; h: number; ok: boolean } => {
      const h1 = node.h + turnSign * dTurn
      // 水平单位向量（heading: x=sin, z=cos）；爬升沿水平方向的竖直分量
      const climb = climbSign * dClimb
      const horiz = Math.cos(climb)
      const mid: Vec3 = {
        x: node.p.x + Math.sin(h1) * step * horiz,
        y: node.p.y + Math.sin(climb) * step,
        z: node.p.z + Math.cos(h1) * step * horiz
      }
      const ok =
        !env.isBlocked(mid, clearance) &&
        env.isSegmentFeasible(node.p, mid, clearance, Math.min(cell * 0.6, 10))
      return { p: mid, h: h1, ok }
    }

    while (heap.size > 0 && goalId < 0) {
      const curId = heap.pop()
      if (closed.has(curId)) continue
      const cur = nodes[curId]
      closed.add(curId)
      expanded++
      if (expanded > maxNodes) break

      if (dist(cur.p, g0) <= step * 1.2) {
        goalId = curId
        break
      }

      for (const ts of [-1, 0, 1]) {
        for (const cs of [-1, 0, 1]) {
          if (nodes.length >= maxNodes) break
          const { p, h, ok } = expandPrimitive(cur, ts, cs)
          if (!ok) continue
          const key = keyOf(p, h)
          const g = cur.g + dist(cur.p, p)
          const prevId = bestAt.get(key)
          if (prevId !== undefined) {
            // 同一离散状态已有更优或等优节点：跳过（节点已关闭则必然更优）
            if (closed.has(prevId) || nodes[prevId].g <= g) continue
          }
          const id = nodes.length
          nodes.push({ p, h, parent: curId, g })
          bestAt.set(key, id)
          heap.push(id)
        }
      }
    }

    if (goalId < 0) {
      return {
        success: false,
        path: [],
        expandedNodes: expanded,
        message: 'Hybrid A* 未在节点上限内到达目标',
        algo: 'hybridastar'
      }
    }

    const path: Vec3[] = []
    let cur: number = goalId
    while (cur >= 0) {
      path.push(nodes[cur].p)
      cur = nodes[cur].parent
    }
    path.reverse()
    const simplified = losShortcut(env, path, clearance)
    const finalPath = pathCollisionFree(env, simplified, clearance)
      ? simplified
      : path
    return {
      success: true,
      path: finalPath,
      expandedNodes: expanded,
      message: '规划成功',
      algo: 'hybridastar'
    }
  }
}

function dist(a: Vec3, b: Vec3): number {
  return Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z)
}
