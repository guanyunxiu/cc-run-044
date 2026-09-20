import type { Vec3 } from '@/types'
import {
  ensureFree,
  losShortcut,
  pathCollisionFree,
  scorePath,
  SeededRandom,
  type Planner,
  type PlannerContext,
  type PlannerOutput
} from './types'

/**
 * 走廊航路点图：沿 start->goal 方向建立 L 层 × W×H 个候选节点，
 * 同层不连接，相邻层全连接（边做碰撞可行性检查）。
 * 蚁群在该图上释放信息素；粒子群/遗传算法以“各层节点编号序列”为染色体。
 */
export interface Corridor {
  layers: Vec3[][]
  /** 可行边邻接：adj[l][i] = 下一层可连节点 index 列表 */
  adj: number[][]
  layerCount: number
}

export function buildCorridor(
  ctx: PlannerContext,
  start: Vec3,
  goal: Vec3
): Corridor | null {
  const { env, params } = ctx
  const clearance = params.clearance
  const dx = goal.x - start.x
  const dz = goal.z - start.z
  const total = Math.hypot(dx, dz)
  if (total < 1) return null

  // 沿航向坐标系：u 沿 start->goal，v 为水平法向
  const ux = dx / total
  const uz = dz / total
  const vx = -uz
  const vz = ux

  const layerSpacing = Math.max(params.cellSize * 1.6, 28)
  const layerCount = Math.max(4, Math.min(14, Math.floor(total / layerSpacing) + 1))
  const widthCount = 5 // -2..2
  const heightCount = 3 // -1..1
  const widthStep = Math.max(params.cellSize * 1.4, 26)
  const heightStep = Math.max(params.heightCell * 1.2, 18)

  const layers: Vec3[][] = [[{ ...start }]]
  for (let l = 1; l < layerCount - 1; l++) {
    const t = l / (layerCount - 1)
    const cx = start.x + dx * t
    const cz = start.z + dz * t
    const baseY = start.y + (goal.y - start.y) * t
    const row: Vec3[] = []
    for (let wi = 0; wi < widthCount; wi++) {
      for (let hi = 0; hi < heightCount; hi++) {
        const woff = (wi - (widthCount - 1) / 2) * widthStep
        const hoff = (hi - (heightCount - 1) / 2) * heightStep
        const p: Vec3 = {
          x: cx + vx * woff,
          y: Math.max(
            env.groundHeight(cx + vx * woff, cz + vz * woff) + clearance + 3,
            Math.min(env.maxAltitude - 10, baseY + hoff)
          ),
          z: cz + vz * woff
        }
        if (!env.isBlocked(p, clearance)) row.push(p)
      }
    }
    if (row.length === 0) return null
    layers.push(row)
  }
  layers.push([{ ...goal }])

  // 相邻层可行边
  const adj: number[][] = []
  for (let l = 0; l < layers.length - 1; l++) {
    for (let i = 0; i < layers[l].length; i++) {
      const feasible: number[] = []
      for (let j = 0; j < layers[l + 1].length; j++) {
        if (env.isSegmentFeasible(layers[l][i], layers[l + 1][j], clearance)) {
          feasible.push(j)
        }
      }
      adj[l * 64 + i] = feasible
    }
  }
  return { layers, adj, layerCount: layers.length }
}

function adjOf(c: Corridor, l: number, i: number): number[] {
  return c.adj[l * 64 + i] ?? []
}

/** 节点序列 -> 世界坐标路径 */
function sequenceToPath(c: Corridor, seq: number[]): Vec3[] {
  return seq.map((idx, l) => ({ ...c.layers[l][idx] }))
}

/** 完整路径收尾并复核 */
function finalize(
  ctx: PlannerContext,
  path: Vec3[],
  algo: PlannerOutput['algo'],
  expanded: number
): PlannerOutput {
  if (path.length < 2) {
    return {
      success: false,
      path: [],
      expandedNodes: expanded,
      message: '走廊图无可行序列',
      algo
    }
  }
  const simplified = losShortcut(ctx.env, path, ctx.params.clearance)
  if (!pathCollisionFree(ctx.env, simplified, ctx.params.clearance)) {
    return {
      success: false,
      path: [],
      expandedNodes: expanded,
      message: '候选路径复核碰撞',
      algo
    }
  }
  return {
    success: true,
    path: simplified,
    expandedNodes: expanded,
    message: '规划成功',
    algo
  }
}

/**
 * 蚁群算法（ACO）：
 * 信息素留存在“相邻层可行边”上；蚂蚁按 τ^α · η^β 概率逐层选路，
 * η = 1/边代价值；每轮全局更新（挥发 ρ + Q/蚂蚁路径代价沉积）。
 */
export const acoPlanner: Planner = {
  type: 'aco',
  label: '蚁群算法',
  plan(start: Vec3, goal: Vec3, ctx: PlannerContext): PlannerOutput {
    const corridor = buildCorridor(ctx, ensureFree(ctx.env, start, ctx.params.clearance), ensureFree(ctx.env, goal, ctx.params.clearance))
    if (!corridor)
      return { success: false, path: [], expandedNodes: 0, message: '走廊构建失败', algo: 'aco' }
    const { env, params, weights } = ctx
    const a = params.advanced
    const rng = new SeededRandom(a.seed + 101)
    let expanded = 0

    // 信息素表（边键 `${l}:${i}->${j}`）
    const tau0 = 1
    const tau = new Map<string, number>()
    const getTau = (l: number, i: number, j: number) =>
      tau.get(`${l}:${i}->${j}`) ?? tau0
    const edgeCost = (p1: Vec3, p2: Vec3): number => {
      const d = Math.hypot(p2.x - p1.x, p2.y - p1.y, p2.z - p1.z)
      const threat = ((env.threatIntensity(p1) + env.threatIntensity(p2)) / 2) * d
      return Math.max(1, d * weights.distance + threat * weights.threat)
    }

    let bestSeq: number[] | null = null
    let bestScore = Infinity

    for (let it = 0; it < a.acoIterations; it++) {
      const antPaths: { seq: number[]; score: number }[] = []
      for (let ant = 0; ant < a.acoAnts; ant++) {
        const seq = [0]
        let valid = true
        for (let l = 0; l < corridor.layerCount - 1; l++) {
          const i = seq[l]
          const choices = adjOf(corridor, l, i)
          expanded++
          if (choices.length === 0) {
            valid = false
            break
          }
          const probs = choices.map((j) => {
            const eta = 1 / edgeCost(corridor.layers[l][i], corridor.layers[l + 1][j])
            return Math.pow(getTau(l, i, j), a.acoAlpha) * Math.pow(eta, a.acoBeta)
          })
          const sum = probs.reduce((x, y) => x + y, 0)
          let r = rng.next() * sum
          let pick = choices[0]
          for (let k = 0; k < choices.length; k++) {
            r -= probs[k]
            if (r <= 0) {
              pick = choices[k]
              break
            }
          }
          seq.push(pick)
        }
        if (!valid || seq.length !== corridor.layerCount) continue
        const worldPath = sequenceToPath(corridor, seq)
        const s = scorePath(env, worldPath, params, weights)
        antPaths.push({ seq, score: s })
        if (s < bestScore) {
          bestScore = s
          bestSeq = seq
        }
      }

      // 挥发
      for (const [k, v] of tau) tau.set(k, v * (1 - a.acoRho))
      // 沉积
      for (const ap of antPaths) {
        const deposit = a.acoQ / Math.max(ap.score, 1)
        for (let l = 0; l < ap.seq.length - 1; l++) {
          const key = `${l}:${ap.seq[l]}->${ap.seq[l + 1]}`
          tau.set(key, (tau.get(key) ?? tau0) + deposit)
        }
      }
    }

    if (!bestSeq) {
      return { success: false, path: [], expandedNodes: expanded, message: '蚁群未找到可行序列', algo: 'aco' }
    }
    return finalize(ctx, sequenceToPath(corridor, bestSeq), 'aco', expanded)
  }
}

/**
 * 粒子群算法（PSO）：
 * 粒子 = 各层候选节点编号（连续值，取整映射）；适应度 = 路径加权代价
 * （碰撞序列由 scorePath 重罚）。速度/位置按标准 PSO 方程更新并裁剪到层范围。
 */
export const psoPlanner: Planner = {
  type: 'pso',
  label: '粒子群算法',
  plan(start: Vec3, goal: Vec3, ctx: PlannerContext): PlannerOutput {
    const corridor = buildCorridor(ctx, ensureFree(ctx.env, start, ctx.params.clearance), ensureFree(ctx.env, goal, ctx.params.clearance))
    if (!corridor)
      return { success: false, path: [], expandedNodes: 0, message: '走廊构建失败', algo: 'pso' }
    const { env, params, weights } = ctx
    const a = params.advanced
    const rng = new SeededRandom(a.seed + 202)
    const L = corridor.layerCount
    const dims = L
    // 各层合法取值范围（首尾层固定为 0）
    const countAt = (l: number) => corridor.layers[l].length

    interface Particle {
      x: number[]
      v: number[]
      best: number[]
      bestScore: number
    }
    const randVec = (scale: number) =>
      Array.from({ length: dims }, () => rng.range(-scale, scale))
    const particles: Particle[] = []
    let gBest: number[] = []
    let gBestScore = Infinity
    let expanded = 0

    const clip = (x: number[], out: number[]): number[] => {
      for (let l = 0; l < L; l++) {
        if (l === 0 || l === L - 1) {
          out[l] = 0
        } else {
          out[l] = Math.max(0, Math.min(countAt(l) - 1, Math.round(x[l])))
        }
      }
      return out
    }
    const evaluate = (idx: number[]): number => {
      // 仅评估相邻层均可行的序列；不可行边直接重罚
      for (let l = 0; l < L - 1; l++) {
        if (!adjOf(corridor, l, idx[l]).includes(idx[l + 1])) return 1e9
      }
      expanded++
      return scorePath(env, sequenceToPath(corridor, idx), params, weights)
    }

    for (let p = 0; p < a.psoParticles; p++) {
      const x: number[] = []
      for (let l = 0; l < L; l++) {
        x.push(l === 0 || l === L - 1 ? 0 : rng.int(0, countAt(l) - 1))
      }
      const part: Particle = {
        x,
        v: randVec(1),
        best: [...x],
        bestScore: evaluate(x)
      }
      particles.push(part)
      if (part.bestScore < gBestScore) {
        gBestScore = part.bestScore
        gBest = [...part.best]
      }
    }

    for (let it = 0; it < a.psoIterations; it++) {
      for (const part of particles) {
        for (let l = 1; l < L - 1; l++) {
          const r1 = rng.next()
          const r2 = rng.next()
          part.v[l] =
            a.psoInertia * part.v[l] +
            a.psoCognitive * r1 * (part.best[l] - part.x[l]) +
            a.psoSocial * r2 * (gBest[l] - part.x[l])
          part.v[l] = Math.max(-2, Math.min(2, part.v[l]))
          part.x[l] += part.v[l]
        }
        const idx = clip(part.x, new Array(L))
        const s = evaluate(idx)
        part.x = [...idx]
        if (s < part.bestScore) {
          part.bestScore = s
          part.best = [...idx]
        }
        if (s < gBestScore) {
          gBestScore = s
          gBest = [...idx]
        }
      }
    }

    if (!isFinite(gBestScore) || gBestScore >= 1e9) {
      return { success: false, path: [], expandedNodes: expanded, message: '粒子群未收敛到可行序列', algo: 'pso' }
    }
    return finalize(ctx, sequenceToPath(corridor, gBest), 'pso', expanded)
  }
}

/**
 * 遗传算法（GA）：
 * 染色体 = 各层节点编号序列；适应度 = 1/(1+路径代价)；
 * 锦标赛选择 + 单点交叉 + 随机变异（变异到同层随机可行节点）。
 */
export const gaPlanner: Planner = {
  type: 'ga',
  label: '遗传算法',
  plan(start: Vec3, goal: Vec3, ctx: PlannerContext): PlannerOutput {
    const corridor = buildCorridor(ctx, ensureFree(ctx.env, start, ctx.params.clearance), ensureFree(ctx.env, goal, ctx.params.clearance))
    if (!corridor)
      return { success: false, path: [], expandedNodes: 0, message: '走廊构建失败', algo: 'ga' }
    const { env, params, weights } = ctx
    const a = params.advanced
    const rng = new SeededRandom(a.seed + 303)
    const L = corridor.layerCount
    let expanded = 0

    const countAt = (l: number) => corridor.layers[l].length
    const randomChrom = (): number[] => {
      const x: number[] = [0]
      for (let l = 1; l < L - 1; l++) x.push(rng.int(0, countAt(l) - 1))
      x.push(0)
      return x
    }
    const feasible = (idx: number[]): boolean => {
      for (let l = 0; l < L - 1; l++) {
        if (!adjOf(corridor, l, idx[l]).includes(idx[l + 1])) return false
      }
      return true
    }
    const fitnessOf = (idx: number[]): number => {
      if (!feasible(idx)) return 0
      expanded++
      const s = scorePath(env, sequenceToPath(corridor, idx), params, weights)
      return 1 / (1 + s / 1000)
    }

    // 初始化时保证有一定比例可行个体
    let pop: number[][] = []
    let guard = 0
    while (pop.length < a.gaPopulation && guard < a.gaPopulation * 40) {
      const c = randomChrom()
      if (feasible(c) || rng.next() < 0.2) pop.push(c)
      guard++
    }
    if (pop.length < 4) {
      return { success: false, path: [], expandedNodes: expanded, message: '遗传算法初始种群无可通行路径', algo: 'ga' }
    }

    let best = pop[0]
    let bestF = fitnessOf(best)
    for (const c of pop) {
      const f = fitnessOf(c)
      if (f > bestF) {
        bestF = f
        best = c
      }
    }

    const tournament = (popIn: number[][], fit: number[]): number[] => {
      const i = rng.int(0, popIn.length - 1)
      const j = rng.int(0, popIn.length - 1)
      return fit[i] >= fit[j] ? popIn[i] : popIn[j]
    }

    for (let it = 0; it < a.gaIterations; it++) {
      const fit = pop.map(fitnessOf)
      const next: number[][] = [[...best]] // 精英保留
      while (next.length < a.gaPopulation) {
        const p1 = tournament(pop, fit)
        const p2 = tournament(pop, fit)
        const cut = rng.int(1, L - 2)
        const child = [...p1.slice(0, cut), ...p2.slice(cut)]
        // 变异
        for (let l = 1; l < L - 1; l++) {
          if (rng.next() < a.gaMutation) {
            // 变异时优先选与前后层可行的节点
            const options: number[] = []
            for (let k = 0; k < countAt(l); k++) {
              if (
                adjOf(corridor, l - 1, child[l - 1]).includes(k) &&
                adjOf(corridor, l, k).includes(child[l + 1])
              ) {
                options.push(k)
              }
            }
            if (options.length > 0) child[l] = rng.pick(options)
          }
        }
        child[0] = 0
        child[L - 1] = 0
        next.push(child)
      }
      pop = next
      for (const c of pop) {
        const f = fitnessOf(c)
        if (f > bestF) {
          bestF = f
          best = c
        }
      }
    }

    if (!feasible(best)) {
      return { success: false, path: [], expandedNodes: expanded, message: '遗传算法未产生可行路径', algo: 'ga' }
    }
    return finalize(ctx, sequenceToPath(corridor, best), 'ga', expanded)
  }
}
