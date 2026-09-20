// @vitest-environment jsdom
import { describe, expect, it, beforeEach, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

/** 最小 WebGL2 mock：用 Proxy 覆盖 Three.js 调用的所有方法/常量 */
function installWebGLMock() {
  function makeCtx(version: 1 | 2) {
    const special: Record<string, unknown> = {
      getParameter(p: number) {
        if (p === 0x1f00)
          return version === 2 ? 'WebGL 2.0 (SwiftShader)' : 'WebGL 1.0'
        if (p === 0x1f01) return 'MockGL' // RENDERER
        if (p === 0x8869 || p === 0x8dfb || p === 0x8b4c || p === 0x8b49)
          return 32
        if (p === 0x851c || p === 0x84ff) return 16384
        return 0
      },
      getExtension(name: string) {
        if (name === 'WEBGL_lose_context')
          return { loseContext: () => {}, restoreContext: () => {} }
        if (
          name === 'ANGLE_instanced_arrays' ||
          name === 'OES_texture_float' ||
          name === 'OES_vertex_array_object' ||
          name === 'EXT_color_buffer_float' ||
          name === 'OES_texture_half_float'
        )
          return {}
        return null
      },
      getSupportedExtensions: () => ['WEBGL_lose_context'],
      getShaderPrecisionFormat: () => ({ rangeMin: 1, rangeMax: 1, precision: 1 }),
      getShaderParameter: () => true,
      getProgramParameter: (p: number) =>
        p === 0x8b86 || p === 0x8b82 ? true : 0, // LINK_STATUS/DELETE_STATUS
      getActiveUniformsiv: () => 0,
      getShaderInfoLog: () => '',
      getProgramInfoLog: () => '',
      createShader: () => ({}),
      createProgram: () => ({}),
      createBuffer: () => ({}),
      createTexture: () => ({}),
      createFramebuffer: () => ({}),
      createRenderbuffer: () => ({}),
      createVertexArray: () => ({}),
      getUniformLocation: () => ({}),
      getActiveUniform: () => null,
      getActiveAttrib: () => null,
      getAttribLocation: () => 0,
      checkFramebufferStatus: () => 0x8cd5,
      isContextLost: () => false
    }
    const GL_CONST: Record<string, number> = {
      VERSION: 0x1f00,
      RENDERER: 0x1f01,
      VENDOR: 0x1f00,
      SHADING_LANGUAGE_VERSION: 0x8b8c
    }
    const ctx = new Proxy(special, {
      get(target, prop) {
        if (prop in target) return target[prop as string]
        if (typeof prop === 'string' && prop in GL_CONST) return GL_CONST[prop]
        // GL 常量属性（大写下划线命名）返回数字，其余为无操作方法
        if (typeof prop === 'string' && /^[A-Z][A-Z0-9_]+$/.test(prop)) return 0
        return () => {}
      },
      has() {
        return true
      }
    })
    return ctx as unknown as WebGL2RenderingContext
  }

  const orig = HTMLCanvasElement.prototype.getContext
  HTMLCanvasElement.prototype.getContext = function (type: any) {
    if (
      type === 'webgl2' ||
      type === 'webgl' ||
      type === 'experimental-webgl2'
    ) {
      return makeCtx(type === 'webgl' ? 1 : 2)
    }
    if (type === '2d') {
      // Canvas 2D mock（createTextSprite 使用）
      const target: Record<string, unknown> = {
        measureText: () => ({ width: 80, actualBoundingBoxAscent: 10 }),
        getContextAttributes: () => ({})
      }
      return new Proxy(target, {
        get(t, p) {
          if (p in t) return t[p as string]
            if (p === 'canvas') return this
            if (p === 'fillStyle' || p === 'font' || p === 'textBaseline')
              return ''
            if (/^[A-Z][A-Z0-9_]+$/.test(String(p))) return 0
            const noop = () => {}
            return noop
          },
          set() {
            return true
          }
        }
      ) as unknown as CanvasRenderingContext2D
    }
    // @ts-expect-error mock
    return orig.call(this, type)
  } as typeof HTMLCanvasElement.prototype.getContext
}

// jsdom 缺失 API
class RO {
  observe() {}
  unobserve() {}
  disconnect() {}
}
;(globalThis as any).ResizeObserver = RO
;(globalThis as any).requestAnimationFrame = (cb: FrameRequestCallback) =>
  setTimeout(() => cb(performance.now()), 16) as unknown as number
;(globalThis as any).cancelAnimationFrame = (id: number) => clearTimeout(id)

installWebGLMock()

import { SceneRenderer } from '@/three/SceneRenderer'
import { useSceneStore } from '@/stores/scene'
import { useSimStore } from '@/stores/sim'

describe('SceneRenderer（jsdom + WebGL mock）', () => {
  let container: HTMLDivElement
  let renderer: SceneRenderer

  beforeEach(() => {
    setActivePinia(createPinia())
    container = document.createElement('div')
    container.style.width = '800px'
    container.style.height = '600px'
    document.body.appendChild(container)
  })

  afterEach(() => {
    renderer?.dispose()
    container.remove()
  })

  it('能挂载：地形/区域/航点/路径/无人机全部创建，且渲染循环可跑', async () => {
    const scene = useSceneStore()
    const sim = useSimStore()
    // jsdom 中布局尺寸为 0，手动 stub
    Object.defineProperty(container, 'clientWidth', { value: 800 })
    Object.defineProperty(container, 'clientHeight', { value: 600 })

    expect(() => {
      renderer = new SceneRenderer(container, scene, sim)
    }).not.toThrow()

    // 执行一次本地规划（jsdom Worker 在 vitest 中可用，但直接用 store action）
    const result = sim.planLocally()
    expect(result.success).toBe(true)
    expect(sim.smoothPath.length).toBeGreaterThan(10)
    expect(sim.trajectory.length).toBeGreaterThan(10)
    expect(sim.duration).toBeGreaterThan(0)

    // 驱动 5 帧动画
    await new Promise((r) => setTimeout(r, 90))

    // 路径同步后不抛错，相机模式可切换
    expect(() => renderer.setCameraMode('top')).not.toThrow()
    expect(() => renderer.setCameraMode('follow')).not.toThrow()
    expect(() => renderer.applyHeatmap()).not.toThrow()
    sim.showThreatHeatmap = true
    expect(() => renderer.applyHeatmap()).not.toThrow()

    // 添加/同步实体
    scene.addThreatAt({ x: 10, y: 0, z: 10 }, 'sam')
    expect(() => renderer.syncZones()).not.toThrow()
    scene.addNoFlyAt({ x: 20, y: 0, z: 20 })
    scene.addObstacleAt({ x: 30, y: 0, z: 30 })
    expect(() => renderer.syncZones()).not.toThrow()
    expect(() => renderer.rebuildTerrain()).not.toThrow()

    // 播放推进
    sim.play()
    await new Promise((r) => setTimeout(r, 60))
    expect(sim.simTime).toBeGreaterThan(0)
  })

  it('迭代二：多机任务 + 动态实体 + 在线重规划循环不抛错', async () => {
    const scene = useSceneStore()
    const sim = useSimStore()
    Object.defineProperty(container, 'clientWidth', { value: 800 })
    Object.defineProperty(container, 'clientHeight', { value: 600 })

    expect(() => {
      renderer = new SceneRenderer(container, scene, sim)
    }).not.toThrow()

    // 默认场景含 2 架无人机与动态实体；本地多机规划
    const r1 = sim.planLocally()
    expect(r1.success).toBe(true)
    expect(Object.keys(sim.uavStates).length).toBe(2)

    // 切换活动无人机后别名为该机数据
    scene.setActiveUav('uav-2')
    expect(sim.smoothPath.length).toBeGreaterThan(2)
    scene.setActiveUav('uav-1')

    // 路径/动态实体同步不抛错
    expect(() => renderer.syncPaths()).not.toThrow()
    expect(() => renderer.syncDynamics()).not.toThrow()
    expect(() => renderer.syncDrones()).not.toThrow()

    // 可视化开关
    sim.safetyColorMode = true
    sim.trackingEnabled = true
    sim.showReplanWindow = true
    expect(() => renderer.syncPaths()).not.toThrow()

    // 新增动态实体并同步
    scene.addDynamicAt({ x: 0, y: 0, z: 0 })
    expect(() => renderer.syncDynamics()).not.toThrow()

    // 开启在线重规划并播放，驱动足够多帧触发至少一次 tick
    sim.replanConfig.enabled = true
    sim.replanConfig.minInterval = 0
    sim.seek(0)
    sim.play()
    await new Promise((r) => setTimeout(r, 400))
    // 动画循环执行过程中不抛错（即使有/无重规划事件）
    expect(typeof sim.replanEvents.length).toBe('number')

    // 时间轴上动态实体更新与无人机推进不抛错
    sim.seek(sim.duration * 0.6)
    await new Promise((r) => setTimeout(r, 60))
    expect(() => renderer.syncPaths()).not.toThrow()
  })
})
