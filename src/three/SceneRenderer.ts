import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import Stats from 'stats.js'
import type { UavInfo, Vec3 } from '@/types'
import { generateTerrain, type TerrainData } from '@/core/terrain'
import { Environment } from '@/core/environment'
import { dynamicStateAt, predictPath, type DynamicState } from '@/core/dynamics'
import { safetyRatio } from '@/core/kinematics'
import {
  createBuildingMesh,
  createDrone,
  createDynamicMesh,
  createNoFlyMesh,
  createPathLine,
  createSelectRing,
  createTerrainMesh,
  createTextSprite,
  createThreatMesh,
  createTrackLine,
  createWaypointMarker,
  type DroneModel,
  type DynamicMesh,
  type TerrainMeshResult
} from './factory'
import type { useSceneStore } from '@/stores/scene'
import type { useSimStore } from '@/stores/sim'

type SceneStore = ReturnType<typeof useSceneStore>
type SimStore = ReturnType<typeof useSimStore>

interface DragState {
  type: 'waypoint' | 'threat' | 'nofly' | 'obstacle' | 'dynamic'
  id: string
  pointerId: number
}

interface DroneView {
  uav: UavInfo
  model: DroneModel
  pathGroup: THREE.Group
  rawLine: THREE.Line | null
  smoothLine: THREE.Line | null
  trackLine: THREE.Line | null
  /** 约束违反高亮小球 */
  violationMarks: THREE.Object3D[]
}

/** 三维仿真渲染器：封装 Three.js 场景、实体同步、拾取拖拽与动画循环 */
export class SceneRenderer {
  private container: HTMLElement
  private sceneStore: SceneStore
  private simStore: SimStore

  private renderer!: THREE.WebGLRenderer
  private scene!: THREE.Scene
  private camera!: THREE.PerspectiveCamera
  private controls!: OrbitControls
  private stats!: Stats
  private raycaster = new THREE.Raycaster()
  private pointer = new THREE.Vector2()

  private terrainView: TerrainMeshResult | null = null
  private terrain: TerrainData | null = null
  private env: Environment | null = null

  private zoneGroup = new THREE.Group()
  private dynamicGroup = new THREE.Group()
  private waypointGroup = new THREE.Group()
  private pathRoot = new THREE.Group()
  private overlayGroup = new THREE.Group()
  private dynamicMeshes = new Map<string, DynamicMesh>()
  private drones = new Map<string, DroneView>()
  private selectRing: THREE.Mesh

  /** 重规划窗口/候选可视化对象 */
  private replanGroup = new THREE.Group()
  private replanSprite: THREE.Sprite | null = null
  private replanSpriteUntil = 0

  private drag: DragState | null = null
  private dragPlane = new THREE.Plane()
  private dragOffset = new THREE.Vector3()
  private downPos = { x: 0, y: 0 }
  private moved = false

  private raf = 0
  private clock = new THREE.Clock()
  private resizeObserver: ResizeObserver
  private disposed = false
  private replanTickAcc = 0
  private predictTickAcc = 0
  private dynamicsDirty = true

  /** 动态实体集合/参数变化时调用，下一帧重建预测线 */
  markDynamicsDirty() {
    this.dynamicsDirty = true
  }

  constructor(
    container: HTMLElement,
    sceneStore: SceneStore,
    simStore: SimStore
  ) {
    this.container = container
    this.sceneStore = sceneStore
    this.simStore = simStore

    this.initRenderer()
    this.initScene()
    this.selectRing = createSelectRing()
    this.selectRing.visible = false
    this.scene.add(this.selectRing)

    this.scene.add(
      this.zoneGroup,
      this.dynamicGroup,
      this.waypointGroup,
      this.pathRoot,
      this.overlayGroup,
      this.replanGroup
    )
    this.rebuildTerrain()
    this.syncZones()
    this.syncDynamics()
    this.syncWaypoints()
    this.syncDrones()
    this.syncPaths()
    this.ensureDrone()
    this.bindEvents()

    this.resizeObserver = new ResizeObserver(() => this.onResize())
    this.resizeObserver.observe(container)
    this.animate()
  }

  private initRenderer() {
    const canvas = document.createElement('canvas')
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance'
    })
    if (!this.renderer.capabilities.isWebGL2) {
      console.warn('当前环境不支持 WebGL 2.0，已回退到 WebGL1 渲染')
    }
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.container.appendChild(canvas)

    try {
      this.stats = new Stats()
      this.stats.showPanel(0)
      this.stats.dom.style.position = 'absolute'
      this.stats.dom.style.left = '8px'
      this.stats.dom.style.top = '8px'
      this.stats.dom.style.zIndex = '10'
      this.container.appendChild(this.stats.dom)
    } catch {
      this.stats = undefined as unknown as Stats
    }
  }

  private initScene() {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x0d1526)
    this.scene.fog = new THREE.Fog(0x0d1526, 1400, 3200)

    const w = this.container.clientWidth
    const h = this.container.clientHeight
    this.camera = new THREE.PerspectiveCamera(55, w / h, 0.5, 8000)
    this.camera.position.set(620, 480, 720)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.08
    this.controls.maxPolarAngle = Math.PI / 2 - 0.02
    this.controls.minDistance = 30
    this.controls.maxDistance = 2600
    this.controls.target.set(0, 60, 0)

    const hemi = new THREE.HemisphereLight(0xbcd8ff, 0x33412a, 0.9)
    this.scene.add(hemi)
    const sun = new THREE.DirectionalLight(0xfff2d8, 1.6)
    sun.position.set(500, 800, 300)
    sun.castShadow = true
    sun.shadow.mapSize.set(2048, 2048)
    const s = 700
    sun.shadow.camera.left = -s
    sun.shadow.camera.right = s
    sun.shadow.camera.top = s
    sun.shadow.camera.bottom = -s
    sun.shadow.camera.far = 2400
    this.scene.add(sun)

    const grid = new THREE.GridHelper(1000, 40, 0x3a5a80, 0x20304a)
    ;(grid.material as THREE.Material).transparent = true
    ;(grid.material as THREE.Material).opacity = 0.35
    this.scene.add(grid)

    const axes = new THREE.AxesHelper(60)
    axes.position.set(-500, 2, -500)
    this.scene.add(axes)
  }

  // ---------- 环境同步 ----------

  private getEnvironment(): Environment {
    if (!this.env) {
      this.env = new Environment(
        this.sceneStore.terrain,
        this.sceneStore.threats,
        this.sceneStore.noflyZones,
        this.sceneStore.obstacles
      )
    }
    return this.env
  }

  /** 地形参数变化：重建网格与环境缓存 */
  rebuildTerrain() {
    if (this.terrainView) {
      this.scene.remove(this.terrainView.mesh)
      this.terrainView.mesh.geometry.dispose()
      ;(this.terrainView.mesh.material as THREE.Material).dispose()
    }
    this.terrain = generateTerrain(this.sceneStore.terrain)
    this.env = null
    this.terrainView = createTerrainMesh(this.terrain)
    this.scene.add(this.terrainView.mesh)
    this.applyHeatmap()
    // 建筑需要贴地重建
    this.syncZones()
  }

  /** 全量同步威胁/禁飞/建筑 */
  syncZones() {
    this.disposeGroup(this.zoneGroup)
    for (const t of this.sceneStore.threats) {
      this.zoneGroup.add(createThreatMesh(t))
    }
    for (const z of this.sceneStore.noflyZones) {
      this.zoneGroup.add(createNoFlyMesh(z))
    }
    if (this.terrain) {
      for (const b of this.sceneStore.obstacles) {
        this.zoneGroup.add(createBuildingMesh(b, this.terrain))
      }
    }
    this.applyHeatmap()
  }

  /** 单个静态实体参数更新后的轻量同步（重建对应网格） */
  refreshEntity(id: string) {
    const idx = this.zoneGroup.children.findIndex(
      (c) => c.userData.entityId === id
    )
    if (idx >= 0) {
      const old = this.zoneGroup.children[idx]
      this.zoneGroup.remove(old)
      this.disposeObject(old)
    }
    const threat = this.sceneStore.threats.find((t) => t.id === id)
    if (threat) this.zoneGroup.add(createThreatMesh(threat))
    const nofly = this.sceneStore.noflyZones.find((z) => z.id === id)
    if (nofly) this.zoneGroup.add(createNoFlyMesh(nofly))
    const obs = this.sceneStore.obstacles.find((b) => b.id === id)
    if (obs && this.terrain) this.zoneGroup.add(createBuildingMesh(obs, this.terrain))
    this.applyHeatmap()
  }

  // ---------- 动态实体 ----------

  syncDynamics() {
    this.dynamicsDirty = true
    const keep = new Set(this.sceneStore.dynamics.map((d) => d.id))
    for (const [id, view] of this.dynamicMeshes) {
      if (!keep) {
        this.dynamicGroup.remove(view.group)
        this.disposeObject(view.group)
        this.dynamicMeshes.delete(id)
      }
    }
    for (const d of this.sceneStore.dynamics) {
      let view = this.dynamicMeshes.get(d.id)
      if (!view) {
        view = createDynamicMesh(d)
        view.group.userData.entityType = 'dynamic'
        this.dynamicGroup.add(view.group)
        this.dynamicMeshes.set(d.id, view)
      }
      // 每帧由 updateDynamics 刷新位置；此处更新预测线
      if (this.simStore.showPrediction) {
        const refPath = this.simStore.smoothPath
        const pred = predictPath(d, Math.max(this.simStore.simTime, 0), 0.5, refPath)
        view.setPrediction(pred)
      } else {
        view.setPrediction([])
      }
    }
  }

  /** 每帧更新动态实体位置/半径（按仿真时间） */
  private updateDynamics(time: number) {
    for (const d of this.sceneStore.dynamics) {
      const view = this.dynamicMeshes.get(d.id)
      if (!view) continue
      const ref = this.simStore.dronePosition
      const st: DynamicState | null = d.enabled
        ? dynamicStateAt(d, time, ref)
        : null
      view.updateState(st)
    }
  }

  refreshDynamic(id: string) {
    // 参数变化：重建网格
    const old = this.dynamicMeshes.get(id)
    if (old) {
      this.dynamicGroup.remove(old.group)
      this.disposeObject(old.group)
      this.dynamicMeshes.delete(id)
    }
    this.syncDynamics()
  }

  syncWaypoints() {
    this.disposeGroup(this.waypointGroup)
    const roleLabel: Record<string, string> = { start: '起点', end: '终点', via: '途经点' }
    const uavIndex = new Map<string, number>()
    for (const wp of this.sceneStore.waypoints) {
      const uavId = wp.uavId ?? 'uav-1'
      const uav = this.sceneStore.uavs.find((u) => u.id === uavId)
      const color = uav?.color ?? 0xf1c40f
      let label: string
      if (wp.role === 'via') {
        const n = (uavIndex.get(uavId) ?? 0) + 1
        uavIndex.set(uavId, n)
        label = `${uav?.name ?? ''}途经${n}`
      } else {
        label = `${uav?.name ?? ''}${roleLabel[wp.role]}`
      }
      const m = createWaypointMarker(wp.id, wp.role, label, color)
      m.position.set(wp.position.x, wp.position.y, wp.position.z)
      this.waypointGroup.add(m)
    }
  }

  findWaypointObject(id: string): THREE.Object3D | undefined {
    return this.waypointGroup.children.find((c) => c.userData.entityId === id)
  }

  // ---------- 多无人机路径/模型 ----------

  syncDrones() {
    const keep = new Set(this.sceneStore.uavs.map((u) => u.id))
    for (const [id, view] of this.drones) {
      if (!keep.has(id)) {
        this.scene.remove(view.model.group)
        this.disposeObject(view.model.group)
        this.pathRoot.remove(view.pathGroup)
        this.disposeObject(view.pathGroup)
        this.drones.delete(id)
      }
    }
    for (const uav of this.sceneStore.uavs) {
      if (!this.drones.has(uav.id)) {
        const model = createDrone(uav.color)
        this.scene.add(model.group)
        const pathGroup = new THREE.Group()
        this.pathRoot.add(pathGroup)
        this.drones.set(uav.id, {
          uav,
          model,
          pathGroup,
          rawLine: null,
          smoothLine: null,
          trackLine: null,
          violationMarks: []
        })
      }
    }
  }

  /** 同步全部无人机的航迹线（规划结果/重规划后调用） */
  syncPaths() {
    this.syncDrones()
    const sim = this.simStore
    for (const [uavId, view] of this.drones) {
      const st = sim.uavStates[uavId]
      this.clearPathLines(view)

      if (st && st.rawPath.length >= 2) {
        view.rawLine = createPathLine(st.rawPath, {
          color: 0x8fa3bf,
          opacity: 0.4
        })
        view.pathGroup.add(view.rawLine)
      }
      if (st && st.smoothPath.length >= 2) {
        const colors = this.pathVertexColors(st.smoothPath)
        view.smoothLine = createPathLine(st.smoothPath, {
          vertexColors: colors,
          opacity: 0.98
        })
        view.pathGroup.add(view.smoothLine)
      }
      // 跟踪实际轨迹对比线
      if (sim.trackingEnabled && st && st.trackingStates.length > 1) {
        const pts = st.trackingStates.map((s) => s.position)
        view.trackLine = createTrackLine(pts, 0xff5263)
        ;(view.trackLine.material as THREE.LineBasicMaterial).opacity = 0.85
        view.pathGroup.add(view.trackLine)
      }
      this.updateViolationMarks(uavId, view)
    }
  }

  private clearPathLines(view: DroneView) {
    for (const line of [view.rawLine, view.smoothLine, view.trackLine]) {
      if (line) {
        view.pathGroup.remove(line)
        line.geometry.dispose()
        ;(line.material as THREE.Material).dispose()
      }
    }
    view.rawLine = null
    view.smoothLine = null
    view.trackLine = null
    for (const m of view.violationMarks) {
      view.pathGroup.remove(m)
      this.disposeObject(m)
    }
    view.violationMarks = []
  }

  /** 约束违反点红色高亮小球 */
  private updateViolationMarks(uavId: string, view: DroneView) {
    const report = this.simStore.uavStates[uavId]?.result?.constraintReport
    if (!report) return
    const geo = new THREE.SphereGeometry(5, 10, 8)
    const mat = new THREE.MeshBasicMaterial({ color: 0xff3b30 })
    // 只标记 collision/turn/climb 三类，避免过密
    for (const v of report.violations) {
      if (v.type !== 'collision' && v.type !== 'turn' && v.type !== 'climb') continue
      const m = new THREE.Mesh(geo, mat)
      m.position.set(v.point.x, v.point.y, v.point.z)
      view.pathGroup.add(m)
      view.violationMarks.push(m)
    }
  }

  /**
   * 航迹顶点颜色：
   * - safetyColorMode：红（净空不足）-> 黄 -> 绿（安全裕度充足）
   * - 否则按威胁强度绿→红（迭代一行为）
   */
  private pathVertexColors(path: Vec3[]): Float32Array {
    const env = this.getEnvironment()
    const arr = new Float32Array(path.length * 3)
    const c = new THREE.Color()
    for (let i = 0; i < path.length; i++) {
      if (this.simStore.safetyColorMode) {
        const ratio = safetyRatio(env, path[i], this.sceneStore.planParams.clearance)
        // 0 红 -> 0.5 黄 -> 1 绿
        c.setHSL(ratio * 0.33, 0.9, 0.55)
      } else {
        const intensity = Math.min(1, env.threatIntensity(path[i]) * 0.9)
        c.setHSL(0.33 - intensity * 0.33, 0.9, 0.55)
      }
      arr[i * 3] = c.r
      arr[i * 3 + 1] = c.g
      arr[i * 3 + 2] = c.b
    }
    return arr
  }

  applyHeatmap() {
    if (!this.terrainView) return
    const env = this.getEnvironment()
    this.terrainView.applyOverlay(
      (x, z) => env.threatIntensity({ x, y: 1, z }),
      (x, z) => env.noflyPenalty({ x, y: 1, z }),
      this.simStore.showThreatHeatmap
    )
  }

  private ensureDrone() {
    this.syncDrones()
    for (const [uavId, view] of this.drones) {
      const st = this.simStore.uavStates[uavId]
      if (st && st.trajectory.length > 0) {
        const s = this.simStore.trackedSample(uavId, 0)
        if (s) view.model.group.position.set(s.position.x, s.position.y, s.position.z)
      } else {
        const wp = this.sceneStore.waypoints.find(
          (w) => (w.uavId ?? 'uav-1') === uavId && w.role === 'start'
        )
        if (wp) view.model.group.position.set(wp.position.x, wp.position.y, wp.position.z)
      }
    }
  }

  // ---------- 拾取与拖拽 ----------

  private bindEvents() {
    const el = this.renderer.domElement
    el.addEventListener('pointerdown', this.onPointerDown)
    el.addEventListener('pointermove', this.onPointerMove)
    window.addEventListener('pointerup', this.onPointerUp)
    el.addEventListener('contextmenu', this.onContextMenu)
  }

  private updatePointer(e: PointerEvent) {
    const rect = this.renderer.domElement.getBoundingClientRect()
    this.pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    this.pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
  }

  private pickEntity(): THREE.Object3D | null {
    this.raycaster.setFromCamera(this.pointer, this.camera)
    const roots = [
      ...this.zoneGroup.children,
      ...this.dynamicGroup.children,
      ...this.waypointGroup.children
    ]
    const hits = this.raycaster.intersectObjects(roots, true)
    for (const hit of hits) {
      let o: THREE.Object3D | null = hit.object
      while (o) {
        if (o.userData.entityId) return o
        o = o.parent
      }
    }
    return null
  }

  private pickTerrain(): THREE.Vector3 | null {
    if (!this.terrainView) return null
    this.raycaster.setFromCamera(this.pointer, this.camera)
    const hits = this.raycaster.intersectObject(this.terrainView.mesh, false)
    return hits.length > 0 ? hits[0].point.clone() : null
  }

  private onPointerDown = (e: PointerEvent) => {
    if (e.button !== 0) return
    this.updatePointer(e)
    this.downPos = { x: e.clientX, y: e.clientY }
    this.moved = false

    const mode = this.sceneStore.editMode
    const ground = this.pickTerrain()

    if (mode === 'select') {
      const obj = this.pickEntity()
      if (obj) {
        const id = obj.userData.entityId as string
        const type = obj.userData.entityType as DragState['type']
        this.sceneStore.select(id)
        // 开始拖拽
        this.drag = { type, id, pointerId: e.pointerId }
        this.controls.enabled = false
        const worldPos = new THREE.Vector3()
        obj.getWorldPosition(worldPos)
        this.dragPlane.set(new THREE.Vector3(0, 1, 0), -worldPos.y)
        const hit = this.rayToPlane(e)
        if (hit) this.dragOffset.copy(worldPos).sub(hit)
        else this.dragOffset.set(0, 0, 0)
        this.renderer.domElement.style.cursor = 'grabbing'
      } else {
        this.sceneStore.select(null)
      }
      return
    }

    // 添加模式：点击地形放置要素
    if (!ground) return
    const p: Vec3 = { x: ground.x, y: ground.y, z: ground.z }
    if (mode === 'add-threat') {
      p.y = 0
      this.sceneStore.addThreatAt(p, 'radar')
    } else if (mode === 'add-nofly') {
      p.y = 0
      this.sceneStore.addNoFlyAt(p)
    } else if (mode === 'add-obstacle') {
      p.y = 0
      this.sceneStore.addObstacleAt(p)
      this.syncZones()
    } else if (mode === 'add-dynamic') {
      p.y = 0
      this.sceneStore.addDynamicAt(p)
      this.syncDynamics()
    } else if (mode === 'add-waypoint') {
      const env = this.getEnvironment()
      p.y = Math.max(
        env.groundHeight(p.x, p.z) + this.sceneStore.planParams.clearance + 5,
        this.sceneStore.planParams.cruiseAlt
      )
      this.sceneStore.addWaypointAt(p)
      this.syncWaypoints()
    }
    this.simStore.markDirty()
  }

  private rayToPlane(e: PointerEvent): THREE.Vector3 | null {
    this.updatePointer(e)
    this.raycaster.setFromCamera(this.pointer, this.camera)
    const out = new THREE.Vector3()
    const hit = this.raycaster.ray.intersectPlane(this.dragPlane, out)
    return hit ? out : null
  }

  private onPointerMove = (e: PointerEvent) => {
    if (this.drag && e.pointerId === this.drag.pointerId) {
      if (
        Math.abs(e.clientX - this.downPos.x) +
          Math.abs(e.clientY - this.downPos.y) >
        3
      ) {
        this.moved = true
      }
      const hit = this.rayToPlane(e)
      if (!hit) return
      hit.add(this.dragOffset)
      this.applyDragPosition(hit)
      return
    }

    // 悬停光标
    if (this.sceneStore.editMode === 'select') {
      this.updatePointer(e)
      const obj = this.pickEntity()
      this.renderer.domElement.style.cursor = obj ? 'grab' : 'default'
    } else {
      this.renderer.domElement.style.cursor = 'crosshair'
    }
  }

  private applyDragPosition(p: THREE.Vector3) {
    if (!this.drag) return
    const { id, type } = this.drag
    const half = this.sceneStore.terrain.size / 2 - 10
    p.x = THREE.MathUtils.clamp(p.x, -half, half)
    p.z = THREE.MathUtils.clamp(p.z, -half, half)
    const env = this.getEnvironment()

    if (type === 'waypoint') {
      const wp = this.sceneStore.waypoints.find((w) => w.id === id)
      if (!wp) return
      const minY = env.groundHeight(p.x, p.z) + this.sceneStore.planParams.clearance
      p.y = Math.max(wp.position.y, minY)
      wp.position = { x: p.x, y: p.y, z: p.z }
    } else if (type === 'threat') {
      const t = this.sceneStore.threats.find((x) => x.id === id)
      if (!t) return
      t.position = { x: p.x, y: 0, z: p.z }
      this.refreshEntity(id)
    } else if (type === 'nofly') {
      const z = this.sceneStore.noflyZones.find((x) => x.id === id)
      if (!z) return
      z.position = { x: p.x, y: 0, z: p.z }
      this.refreshEntity(id)
    } else if (type === 'obstacle') {
      const b = this.sceneStore.obstacles.find((x) => x.id === id)
      if (!b) return
      b.position = { x: p.x, y: 0, z: p.z }
      this.refreshEntity(id)
    } else if (type === 'dynamic') {
      const d = this.sceneStore.dynamics.find((x) => x.id === id)
      if (!d) return
      // 巡逻点整体平移（保持相对几何）
      const ox = p.x - d.position.x
      const oz = p.z - d.position.z
      d.position = { x: p.x, y: 0, z: p.z }
      d.patrolPoints = d.patrolPoints.map((q) => ({
        x: q.x + ox,
        y: 0,
        z: q.z + oz
      }))
      this.syncDynamics()
    }
    this.simStore.markDirty()
  }

  private onPointerUp = (e: PointerEvent) => {
    if (this.drag && e.pointerId === this.drag.pointerId) {
      this.drag = null
      this.controls.enabled = this.simStore.cameraMode !== 'follow'
      this.renderer.domElement.style.cursor = 'default'
      // 拖拽结束后航迹失效，自动重算（若开启）
      if (this.moved && this.simStore.autoReplan) void this.simStore.plan()
    }
  }

  private onContextMenu = (e: Event) => e.preventDefault()

  // ---------- 相机 ----------

  setCameraMode(mode: 'orbit' | 'top' | 'follow') {
    this.controls.enabled = mode !== 'follow'
    this.camera.up.set(0, 1, 0)
    if (mode === 'top') {
      const top = this.sceneStore.terrain.size * 0.9
      this.camera.position.set(0.01, top, 0.01)
      this.controls.target.set(0, 0, 0)
    } else if (mode === 'orbit') {
      this.camera.position.set(620, 480, 720)
      this.controls.target.set(0, 60, 0)
    }
    this.controls.update()
  }

  /** 聚焦到选中实体 */
  focusSelected() {
    const id = this.sceneStore.selectedId
    if (!id) return
    const obj =
      this.zoneGroup.children.find((c) => c.userData.entityId === id) ??
      this.dynamicGroup.children.find((c) => c.userData.entityId === id) ??
      this.waypointGroup.children.find((c) => c.userData.entityId === id)
    if (!obj) return
    const p = new THREE.Vector3()
    obj.getWorldPosition(p)
    this.controls.target.copy(p)
    this.camera.position.set(p.x + 180, p.y + 160, p.z + 180)
    this.controls.update()
  }

  // ---------- 动画循环 ----------

  private animate = () => {
    if (this.disposed) return
    this.raf = requestAnimationFrame(this.animate)
    this.stats?.begin()
    const dt = Math.min(this.clock.getDelta(), 0.05)

    this.simStore.advance(dt)
    const time = this.simStore.simTime

    // 动态实体先行（环境快照依赖其位置）
    this.updateDynamics(time)
    // 预测线按固定频率（2Hz）或脏标记时重建，避免每帧重建几何
    this.predictTickAcc += dt
    if (this.dynamicsDirty || this.predictTickAcc >= 0.5) {
      this.predictTickAcc = 0
      this.dynamicsDirty = false
      if (this.simStore.showPrediction) this.syncDynamics()
    }
    this.updateDrones(dt, time)

    // 在线重规划（约 4Hz），使用当前动态环境快照
    this.replanTickAcc += dt
    if (this.replanTickAcc >= 0.25) {
      this.replanTickAcc = 0
      const env = this.simStore.buildEnvironmentAt(time)
      this.simStore.tickOnlineReplan(env, dt)
      if (this.simStore.showReplanWindow) this.updateReplanOverlay()
    }

    // 选中高亮环
    this.updateSelectRing()
    this.updateReplanSprite(dt, time)

    if (this.simStore.cameraMode === 'follow') this.updateFollowCamera()
    this.controls.update()
    this.renderer.render(this.scene, this.camera)
    this.stats?.end()
  }

  private updateDrones(dt: number, time: number) {
    const sim = this.simStore
    for (const [uavId, view] of this.drones) {
      const g = view.model.group
      const pose = sim.trackedSample(uavId, time)
      if (pose) {
        g.position.set(pose.position.x, pose.position.y, pose.position.z)
        if (Math.hypot(pose.velocity.x, pose.velocity.z) > 0.5) {
          g.rotation.y = pose.heading
          g.rotation.x = THREE.MathUtils.clamp(
            -Math.atan2(
              pose.velocity.y,
              Math.hypot(pose.velocity.x, pose.velocity.z)
            ) * 0.5,
            -0.4,
            0.4
          )
        }
        // 活动无人机回写 store（供相机跟随/触发检测）
        if (uavId === this.sceneStore.activeUavId) {
          sim.setDroneTransform(pose.position, pose.heading)
        }
      }
      const spin = sim.playing ? 1 + dt * 28 : dt * 6
      for (const r of view.model.rotors) r.rotation.y += spin
    }
  }

  /** 重规划窗口与候选航迹可视化 */
  private updateReplanOverlay() {
    this.disposeGroup(this.replanGroup)
    const ev = this.simStore.lastReplanEvent
    if (!ev || this.simStore.simTime - ev.time > 6) return

    // 局部窗口：起点绿色、目标点红色小球
    const sphereFrom = new THREE.Mesh(
      new THREE.SphereGeometry(7, 12, 10),
      new THREE.MeshBasicMaterial({ color: 0x2ecc71 })
    )
    sphereFrom.position.set(ev.replanFrom.x, ev.replanFrom.y + 4, ev.replanFrom.z)
    this.replanGroup.add(sphereFrom)
    const sphereGoal = new THREE.Mesh(
      new THREE.SphereGeometry(7, 12, 10),
      new THREE.MeshBasicMaterial({ color: 0xe74c3c })
    )
    sphereGoal.position.set(ev.replanGoal.x, ev.replanGoal.y + 4, ev.replanGoal.z)
    this.replanGroup.add(sphereGoal)

    // 旧航迹（红虚线）与新航迹（绿实线）
    if (ev.oldLocalPath.length >= 2) {
      this.replanGroup.add(
        createPathLine(ev.oldLocalPath, { color: 0xff5263, opacity: 0.5 })
      )
    }
    if (ev.newLocalPath.length >= 2) {
      this.replanGroup.add(
        createPathLine(ev.newLocalPath, { color: 0x2ecc71, opacity: 0.95 })
      )
    }
    // 候选航迹（其他算法）：暖色细线
    for (const cand of ev.candidates) {
      if (!cand.success || cand.path.length < 2) continue
      if (cand.label.includes('采用')) continue
      const line = createPathLine(cand.path, { color: 0xffd166, opacity: 0.55 })
      ;(line.material as THREE.LineBasicMaterial).opacity = 0.5
      this.replanGroup.add(line)
    }

    // 触发位置竖直光柱
    const beam = new THREE.Mesh(
      new THREE.CylinderGeometry(3, 3, 120, 8, 1, true),
      new THREE.MeshBasicMaterial({
        color: 0xff3b30,
        transparent: true,
        opacity: 0.4,
        depthWrite: false
      })
    )
    beam.position.set(ev.position.x, ev.position.y + 40, ev.position.z)
    this.replanGroup.add(beam)

    this.replanSpriteUntil = ev.time + 4
  }

  private updateReplanSprite(_dt: number, time: number) {
    const ev = this.simStore.lastReplanEvent
    if (!ev || time > this.replanSpriteUntil) {
      if (this.replanSprite) {
        this.scene.remove(this.replanSprite)
        this.disposeObject(this.replanSprite)
        this.replanSprite = null
      }
      return
    }
    if (!this.replanSprite) {
      this.replanSprite = createTextSprite(
        `⚠ 重规划：${ev.reasonLabel}`,
        '#ff6b6b'
      )
      this.scene.add(this.replanSprite)
    }
    this.replanSprite.position.set(ev.position.x, ev.position.y + 38, ev.position.z)
  }

  private updateSelectRing() {
    const id = this.sceneStore.selectedId
    if (!id) {
      this.selectRing.visible = false
      return
    }
    let p: THREE.Vector3 | null = null
    const wp = this.sceneStore.waypoints.find((w) => w.id === id)
    if (wp) {
      p = new THREE.Vector3(wp.position.x, wp.position.y, wp.position.z)
    } else {
      const obj =
        this.zoneGroup.children.find((c) => c.userData.entityId === id) ??
        this.dynamicGroup.children.find((c) => c.userData.entityId === id)
      if (obj) {
        p = new THREE.Vector3()
        obj.getWorldPosition(p)
        const threat = this.sceneStore.threats.find((t) => t.id === id)
        const nofly = this.sceneStore.noflyZones.find((z) => z.id === id)
        const dyn = this.sceneStore.dynamics.find((d) => d.id === id)
        const r = threat?.radius ?? nofly?.radius ?? dyn?.radius ?? 14
        this.selectRing.scale.setScalar(r / 14)
      }
    }
    if (p) {
      this.selectRing.visible = true
      if (wp) this.selectRing.scale.setScalar(1)
      this.selectRing.position.copy(p)
      this.selectRing.position.y += 0.3
    }
  }

  private updateFollowCamera() {
    const active = this.drones.get(this.sceneStore.activeUavId)
    if (!active) return
    const pos = active.model.group.position
    const yaw = active.model.group.rotation.y
    const dist = 70
    const height = 35
    const back = new THREE.Vector3(
      -Math.sin(yaw) * dist,
      height,
      -Math.cos(yaw) * dist
    )
    this.camera.position.lerp(pos.clone().add(back), 0.12)
    this.controls.target.lerp(pos, 0.15)
  }

  private onResize() {
    const w = this.container.clientWidth
    const h = this.container.clientHeight
    if (w === 0 || h === 0) return
    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(w, h)
  }

  private disposeGroup(group: THREE.Group) {
    while (group.children.length > 0) {
      const child = group.children.pop()!
      this.disposeObject(child)
    }
  }

  private disposeObject(obj: THREE.Object3D) {
    obj.traverse((o) => {
      const mesh = o as THREE.Mesh
      if (mesh.geometry) mesh.geometry.dispose()
      const mat = (mesh as THREE.Mesh).material
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose())
      else if (mat) (mat as THREE.Material).dispose()
    })
  }

  dispose() {
    this.disposed = true
    cancelAnimationFrame(this.raf)
    this.resizeObserver.disconnect()
    const el = this.renderer.domElement
    el.removeEventListener('pointerdown', this.onPointerDown)
    el.removeEventListener('pointermove', this.onPointerMove)
    window.removeEventListener('pointerup', this.onPointerUp)
    el.removeEventListener('contextmenu', this.onContextMenu)
    this.controls.dispose()
    this.renderer.dispose()
    el.remove()
    this.stats?.dom?.remove()
  }
}
