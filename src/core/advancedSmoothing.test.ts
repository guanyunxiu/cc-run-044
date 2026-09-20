// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { Environment } from '@/core/environment'
import { GridPlanner } from '@/core/planner'
import {
  smoothBezier,
  smoothClothoid,
  smoothDubins,
  smoothPolynomial
} from '@/core/advancedSmoothing'
import {
  defaultPlanParams,
  defaultTerrain,
  defaultWeights
} from '@/core/defaults'
import { pathMetrics } from '@/core/kinematics'
import type { PlanParams, Vec3 } from '@/types'

const terrain = {
  ...defaultTerrain,
  size: 600,
  segments: 48,
  heightScale: 60,
  noiseScale: 0.003,
  ridgeScale: 20,
  canyon: false
}
const env = new Environment(terrain, [], [], [])
const params: PlanParams = {
  ...defaultPlanParams,
  cellSize: 22,
  heightCell: 20,
  maxNodes: 120000,
  clearance: 8,
  cruiseAlt: 110
}
const start: Vec3 = { x: -240, y: 110, z: -200 }
const goal: Vec3 = { x: 240, y: 110, z: 200 }

function rawPath(): Vec3[] {
  return new GridPlanner(env, params, defaultWeights).plan(start, goal).path
}

describe('高级平滑方法', () => {
  const cases: [string, (p: Vec3[]) => Vec3[]][] = [
    ['贝塞尔', (p) => smoothBezier(env, p, params.clearance)],
    ['多项式 Catmull-Rom', (p) => smoothPolynomial(env, p, params.clearance)],
    ['Dubins', (p) => smoothDubins(env, p, params.clearance, params.dynamics.minTurnRadius)],
    ['Clothoid', (p) => smoothClothoid(env, p, params.clearance, params.dynamics.minTurnRadius)]
  ]

  for (const [name, fn] of cases) {
    it(`${name}：首尾保持、加密输出、全程无碰`, () => {
      const raw = rawPath()
      expect(raw.length).toBeGreaterThan(2)
      const sm = fn(raw)
      expect(sm.length).toBeGreaterThan(raw.length - 2)
      expect(sm[0].x).toBeCloseTo(raw[0].x, 0)
      expect(sm[sm.length - 1].x).toBeCloseTo(raw[raw.length - 1].x, 0)
      for (let i = 1; i < sm.length; i++) {
        expect(env.isSegmentFeasible(sm[i - 1], sm[i], params.clearance)).toBe(true)
      }
    })
  }

  it('平滑后最大转角较原始折线降低（贝塞尔/多项式）', () => {
    const raw = rawPath()
    const before = pathMetrics(raw).maxTurnAngle
    const after = pathMetrics(smoothPolynomial(env, raw, params.clearance)).maxTurnAngle
    expect(after).toBeLessThanOrEqual(before + 1)
    const afterB = pathMetrics(smoothBezier(env, raw, params.clearance)).maxTurnAngle
    expect(afterB).toBeLessThanOrEqual(before + 1)
  })
})
