// @vitest-environment node
import { describe, expect, it } from 'vitest'
import { Environment } from '@/core/environment'
import {
  checkConstraints,
  pathMetrics,
  repairPath,
  safetyMargin
} from '@/core/kinematics'
import {
  defaultPlanParams,
  defaultTerrain
} from '@/core/defaults'
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

function params(over: Partial<PlanParams> = {}): PlanParams {
  return {
    ...defaultPlanParams,
    clearance: 8,
    cruiseAlt: 100,
    dynamics: { ...defaultPlanParams.dynamics, ...over.dynamics }
  }
}

describe('动力学约束检查', () => {
  it('满足约束的平直路径无违反，满足率 100%', () => {
    const path: Vec3[] = [
      { x: -200, y: 100, z: -200 },
      { x: -100, y: 100, z: -100 },
      { x: 0, y: 100, z: 0 },
      { x: 100, y: 100, z: 100 },
      { x: 200, y: 100, z: 200 }
    ]
    const r = checkConstraints(path, params(), env)
    expect(r.violations).toHaveLength(0)
    expect(r.satisfaction).toBe(1)
  })

  it('检测出急转弯（转弯角超限）', () => {
    const path: Vec3[] = [
      { x: -100, y: 100, z: 0 },
      { x: 0, y: 100, z: 0 },
      { x: 0, y: 100, z: 100 }
    ]
    const r = checkConstraints(path, params({ dynamics: { maxTurnAngle: 45 } as any }), env)
    expect(r.counts.turn).toBeGreaterThan(0)
    expect(r.satisfaction).toBeLessThan(1)
  })

  it('检测出过短航段与过陡爬升', () => {
    const path: Vec3[] = [
      { x: 0, y: 100, z: 0 },
      { x: 4, y: 100, z: 0 }, // 过短
      { x: 30, y: 160, z: 0 }, // 陡爬升
      { x: 80, y: 160, z: 0 }
    ]
    const r = checkConstraints(
      path,
      params({ dynamics: { minStepLength: 12, maxClimbAngle: 20 } as any }),
      env
    )
    expect(r.counts.step).toBeGreaterThan(0)
    expect(r.counts.climb).toBeGreaterThan(0)
  })

  it('检测碰撞类违反', () => {
    // 穿过地面以下的航段
    const path: Vec3[] = [
      { x: 0, y: 100, z: 0 },
      { x: 0, y: -10, z: 0 }
    ]
    const r = checkConstraints(path, params(), env)
    expect(r.counts.collision).toBeGreaterThan(0)
  })
})

describe('航迹自动修正', () => {
  it('合并短航段后首末点保持，且不引入碰撞', () => {
    const path: Vec3[] = [
      { x: -200, y: 120, z: -200 },
      { x: -199, y: 120, z: -199 },
      { x: -150, y: 120, z: -150 },
      { x: -100, y: 120, z: -100 },
      { x: 200, y: 120, z: 200 }
    ]
    const p = params({ dynamics: { minStepLength: 30 } as any })
    const fixed = repairPath(env, path, p)
    expect(fixed[0]).toMatchObject({ x: -200, z: -200 })
    expect(fixed[fixed.length - 1]).toMatchObject({ x: 200, z: 200 })
    // 修正后碰撞违反为 0（高空路径）
    const r = checkConstraints(fixed, p, env)
    expect(r.counts.collision).toBe(0)
    expect(fixed.length).toBeLessThanOrEqual(path.length)
  })
})

describe('航迹指标与安全裕度', () => {
  it('pathMetrics 返回航程/曲率/转角，折线比平滑曲线曲率大', () => {
    const sharp: Vec3[] = [
      { x: 0, y: 100, z: 0 },
      { x: 50, y: 100, z: 0 },
      { x: 50, y: 100, z: 50 }
    ]
    const m = pathMetrics(sharp, params())
    expect(m.length).toBeCloseTo(100, 1)
    expect(m.maxTurnAngle).toBeCloseTo(90, 0)
    expect(m.maxCurvature).toBeGreaterThan(0)

    const smooth: Vec3[] = []
    for (let i = 0; i <= 20; i++) {
      const t = i / 20
      smooth.push({ x: t * 200 - 100, y: 100, z: Math.sin(t * Math.PI) * 60 })
    }
    const m2 = pathMetrics(smooth, params())
    expect(m2.maxCurvature).toBeLessThan(m.maxCurvature)
  })

  it('safetyMargin 高空大、贴地小', () => {
    const high = safetyMargin(env, { x: 0, y: 400, z: 0 })
    const low = safetyMargin(env, { x: 0, y: env.groundHeight(0, 0) + 2, z: 0 })
    expect(high).toBeGreaterThan(200)
    expect(low).toBeLessThan(5)
  })
})
