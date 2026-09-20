import * as THREE from 'three'
import type {
  BuildingObstacle,
  DynamicEntity,
  NoFlyZone,
  ThreatKind,
  ThreatZone,
  Vec3
} from '@/types'
import type { TerrainData } from '@/core/terrain'
import { sampleHeight } from '@/core/terrain'
import type { DynamicState } from '@/core/dynamics'

/** 威胁类型 -> 基础颜色（颜色映射） */
export const THREAT_COLORS: Record<ThreatKind, number> = {
  radar: 0x22a7ff, // 雷达：蓝
  sam: 0xff3b30, // 防空：红
  jammer: 0xb046ff // 干扰：紫
}

export const NOFLY_COLOR = 0xff2d55
export const WAYPOINT_COLORS = {
  start: 0x2ecc71,
  end: 0xe74c3c,
  via: 0xf1c40f
}

const tmpColor = new THREE.Color()

/** 地形高程配色：低 -> 高 渐变（滩涂/草/岩/雪） */
function terrainGradient(h: number, maxH: number, out: THREE.Color): THREE.Color {
  const t = Math.max(0, Math.min(1, h / maxH))
  if (t < 0.25) out.setRGB(0.83 + t * 0.3, 0.76 + t * 0.25, 0.52)
  else if (t < 0.55)
    out.setRGB(0.36 - (t - 0.25) * 0.4, 0.55 - (t - 0.25) * 0.15, 0.28)
  else if (t < 0.8)
    out.setRGB(0.34 + (t - 0.55) * 0.9, 0.31 + (t - 0.55) * 0.8, 0.28)
  else out.setRGB(0.9, 0.92, 0.95)
  return out
}

export interface TerrainMeshResult {
  mesh: THREE.Mesh
  /** 重新计算顶点色（高度配色 + 威胁/禁飞强度叠加） */
  applyOverlay: (
    threatField: (x: number, z: number) => number,
    noflyField: (x: number, z: number) => number,
    enabled: boolean
  ) => void
}

/** 由 DEM 高程网格构建地形网格（顶点着色） */
export function createTerrainMesh(terrain: TerrainData): TerrainMeshResult {
  const n = terrain.gridSize
  const { size } = terrain.params
  const geo = new THREE.BufferGeometry()
  const positions = new Float32Array(n * n * 3)
  const colors = new Float32Array(n * n * 3)
  const indices: number[] = []

  let pi = 0
  for (let iz = 0; iz < n; iz++) {
    for (let ix = 0; ix < n; ix++) {
      const x = (ix / (n - 1)) * size - terrain.halfSize
      const z = (iz / (n - 1)) * size - terrain.halfSize
      const y = terrain.heights[iz * n + ix]
      positions[pi] = x
      positions[pi + 1] = y
      positions[pi + 2] = z
      pi += 3
    }
  }

  for (let iz = 0; iz < n - 1; iz++) {
    for (let ix = 0; ix < n - 1; ix++) {
      const a = iz * n + ix
      const b = a + 1
      const c = a + n
      const d = c + 1
      indices.push(a, c, b, b, c, d)
    }
  }

  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  geo.setIndex(indices)
  geo.computeVertexNormals()

  const mat = new THREE.MeshStandardMaterial({
    vertexColors: true,
    roughness: 0.95,
    metalness: 0.02,
    flatShading: false
  })
  const mesh = new THREE.Mesh(geo, mat)
  mesh.receiveShadow = true
  mesh.name = 'terrain'

  const maxH = Math.max(...terrain.heights, 1)
  const colorAttr = geo.getAttribute('color') as THREE.BufferAttribute
  const overlay = new THREE.Color()
  const noflyC = new THREE.Color(NOFLY_COLOR)

  const applyOverlay = (
    threatField: (x: number, z: number) => number,
    noflyField: (x: number, z: number) => number,
    enabled: boolean
  ) => {
    let k = 0
    for (let iz = 0; iz < n; iz++) {
      for (let ix = 0; ix < n; ix++) {
        const x = positions[k * 3]
        const z = positions[k * 3 + 2]
        const h = positions[k * 3 + 1]
        terrainGradient(h, maxH, tmpColor)
        if (enabled) {
          const ti = Math.min(1, threatField(x, z))
          if (ti > 0.02) {
            // 威胁热力：红/橙叠加
            overlay.setHSL(0.02 * (1 - ti), 0.95, 0.5)
            tmpColor.lerp(overlay, Math.min(0.75, ti * 0.8))
          }
          const ni = Math.min(1, noflyField(x, z))
          if (ni > 0.02) tmpColor.lerp(noflyC, Math.min(0.7, ni * 0.8))
        }
        colorAttr.setXYZ(k, tmpColor.r, tmpColor.g, tmpColor.b)
        k++
      }
    }
    colorAttr.needsUpdate = true
  }
  applyOverlay(() => 0, () => 0, false)

  return { mesh, applyOverlay }
}

/** 威胁区：半透明圆柱 + 地面范围圆环 + 顶部环（颜色随等级映射） */
export function createThreatMesh(t: ThreatZone): THREE.Group {
  const g = new THREE.Group()
  g.userData.entityId = t.id
  g.userData.entityType = 'threat'
  const base = new THREE.Color(THREAT_COLORS[t.kind])
  // 等级越高颜色越亮、越偏暖
  const color = base.clone()
  color.offsetHSL(0, 0, (t.level - 3) * 0.04)

  const h = Math.max(1, t.heightMax - t.heightMin)
  const cylGeo = new THREE.CylinderGeometry(t.radius, t.radius, h, 48, 1, true)
  const cylMat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: t.opacity,
    side: THREE.DoubleSide,
    depthWrite: false
  })
  const cyl = new THREE.Mesh(cylGeo, cylMat)
  cyl.position.set(t.position.x, (t.heightMin + t.heightMax) / 2, t.position.z)
  g.add(cyl)

  const lineMat = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: 0.9
  })
  for (const yy of [t.heightMin + 0.5, t.heightMax]) {
    const ring = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(circlePoints(t.radius, yy)),
      lineMat
    )
    ring.position.set(t.position.x, 0, t.position.z)
    g.add(ring)
  }

  // 地面圆盘（极淡填充，便于俯视识别）
  const disk = new THREE.Mesh(
    new THREE.CircleGeometry(t.radius, 48),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.08,
      depthWrite: false
    })
  )
  disk.rotation.x = -Math.PI / 2
  disk.position.set(t.position.x, 0.5, t.position.z)
  g.add(disk)

  // 中心标记小杆
  const pole = new THREE.Mesh(
    new THREE.CylinderGeometry(1.2, 1.2, h, 8),
    new THREE.MeshBasicMaterial({ color })
  )
  pole.position.set(t.position.x, t.heightMin + h / 2, t.position.z)
  g.add(pole)

  return g
}

function circlePoints(radius: number, y: number): THREE.Vector3[] {
  const pts: THREE.Vector3[] = []
  for (let i = 0; i < 64; i++) {
    const a = (i / 64) * Math.PI * 2
    pts.push(new THREE.Vector3(Math.cos(a) * radius, y, Math.sin(a) * radius))
  }
  return pts
}

/** 禁飞区：红色半透明圆柱 + 线框 + 斜纹警戒柱 */
export function createNoFlyMesh(z: NoFlyZone): THREE.Group {
  const g = new THREE.Group()
  g.userData.entityId = z.id
  g.userData.entityType = 'nofly'
  const color = new THREE.Color(NOFLY_COLOR)
  const h = Math.max(1, z.heightMax - z.heightMin)

  const cyl = new THREE.Mesh(
    new THREE.CylinderGeometry(z.radius, z.radius, h, 48, 1, true),
    new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      depthWrite: false
    })
  )
  cyl.position.set(z.position.x, (z.heightMin + z.heightMax) / 2, z.position.z)
  g.add(cyl)

  const wire = new THREE.LineSegments(
    new THREE.WireframeGeometry(
      new THREE.CylinderGeometry(z.radius, z.radius, h, 24, 4, true)
    ),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.55 })
  )
  wire.position.copy(cyl.position)
  g.add(wire)

  // 地面/顶部范围环
  for (const yy of [0.5, z.heightMax]) {
    const ring = new THREE.LineLoop(
      new THREE.BufferGeometry().setFromPoints(circlePoints(z.radius, yy)),
      new THREE.LineBasicMaterial({ color, linewidth: 2 })
    )
    ring.position.set(z.position.x, 0, z.position.z)
    g.add(ring)
  }
  return g
}

/** 建筑障碍：贴地立方体 */
export function createBuildingMesh(
  b: BuildingObstacle,
  terrain: TerrainData
): THREE.Mesh {
  const baseY = sampleHeight(terrain, b.position.x, b.position.z) - 0.3
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(b.size.x, b.height, b.size.z),
    new THREE.MeshStandardMaterial({
      color: 0x9aa3ad,
      roughness: 0.8,
      metalness: 0.15
    })
  )
  mesh.position.set(b.position.x, baseY + b.height / 2, b.position.z)
  mesh.castShadow = true
  mesh.receiveShadow = true
  mesh.userData.entityId = b.id
  mesh.userData.entityType = 'obstacle'
  return mesh
}

/** 航点标记（可拾取的小球 + 立柱 + 文字精灵） */
export function createWaypointMarker(
  id: string,
  role: 'start' | 'end' | 'via',
  label: string,
  tint?: number
): THREE.Group {
  const g = new THREE.Group()
  g.userData.entityId = id
  g.userData.entityType = 'waypoint'
  // 途经点采用所属无人机颜色；起终点仍用语义色
  const color = tint ?? WAYPOINT_COLORS[role]

  const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(7, 20, 16),
    new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.45,
      roughness: 0.4
    })
  )
  g.add(sphere)

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(10, 0.8, 8, 32),
    new THREE.MeshBasicMaterial({ color })
  )
  ring.rotation.x = Math.PI / 2
  g.add(ring)

  const sprite = createTextSprite(label, `#${new THREE.Color(color).getHexString()}`)
  sprite.position.set(0, 16, 0)
  g.add(sprite)
  return g
}

/** Canvas 文字精灵（始终面向相机） */
export function createTextSprite(text: string, color = '#ffffff'): THREE.Sprite {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  const fontSize = 44
  ctx.font = `bold ${fontSize}px sans-serif`
  const w = Math.ceil(ctx.measureText(text).width) + 24
  canvas.width = w
  canvas.height = fontSize + 20
  ctx.font = `bold ${fontSize}px sans-serif`
  ctx.fillStyle = 'rgba(15,20,30,0.65)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = color
  ctx.textBaseline = 'middle'
  ctx.fillText(text, 12, canvas.height / 2)
  const tex = new THREE.CanvasTexture(canvas)
  tex.minFilter = THREE.LinearFilter
  const mat = new THREE.SpriteMaterial({
    map: tex,
    depthTest: false,
    transparent: true
  })
  const sprite = new THREE.Sprite(mat)
  const scale = 0.5
  sprite.scale.set(canvas.width * scale * 0.5, canvas.height * scale * 0.5, 1)
  return sprite
}

/**
 * 无人机简化模型：X 型四旋翼（机身 + 机臂 + 旋翼）。
 * rotors 暴露给动画循环旋转。
 */
export interface DroneModel {
  group: THREE.Group
  rotors: THREE.Mesh[]
}

export function createDrone(tint = 0x1abc9c): DroneModel {
  const group = new THREE.Group()
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x2c3e50,
    roughness: 0.4,
    metalness: 0.4
  })
  const accentMat = new THREE.MeshStandardMaterial({
    color: tint,
    emissive: tint,
    emissiveIntensity: 0.35
  })

  const body = new THREE.Mesh(new THREE.BoxGeometry(5, 2, 6), bodyMat)
  group.add(body)
  const nose = new THREE.Mesh(new THREE.ConeGeometry(1.6, 3, 4), accentMat)
  nose.rotation.x = -Math.PI / 2
  nose.position.z = 4
  group.add(nose)

  const armGeo = new THREE.BoxGeometry(1.1, 0.8, 1.1)
  const rotorGeo = new THREE.BoxGeometry(7, 0.15, 0.6)
  const rotors: THREE.Mesh[] = []
  const offsets: [number, number][] = [
    [3.4, 3.4],
    [-3.4, 3.4],
    [3.4, -3.4],
    [-3.4, -3.4]
  ]
  for (const [x, z] of offsets) {
    const arm = new THREE.Mesh(armGeo, bodyMat)
    arm.scale.set(Math.abs(x) / 1.5, 1, Math.abs(z) / 1.5)
    arm.position.set(x / 2, 0.3, z / 2)
    arm.rotation.y = Math.sign(x) === Math.sign(z) ? Math.PI / 4 : -Math.PI / 4
    group.add(arm)

    const mast = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.5, 1.2, 8),
      bodyMat
    )
    mast.position.set(x, 0.8, z)
    group.add(mast)

    const rotor = new THREE.Mesh(rotorGeo, accentMat)
    rotor.position.set(x, 1.6, z)
    group.add(rotor)
    rotors.push(rotor)
  }
  group.scale.setScalar(1.2)
  return { group, rotors }
}

/** 由点集创建线段，支持顶点颜色（代价/威胁颜色映射） */
export function createPathLine(
  points: Vec3[],
  options: {
    color?: number
    vertexColors?: Float32Array
    opacity?: number
    dashed?: boolean
  } = {}
): THREE.Line {
  const geo = new THREE.BufferGeometry().setFromPoints(
    points.map((p) => new THREE.Vector3(p.x, p.y, p.z))
  )
  if (options.vertexColors) {
    geo.setAttribute('color', new THREE.BufferAttribute(options.vertexColors, 3))
  }
  const mat = new THREE.LineBasicMaterial({
    color: options.color ?? 0xffffff,
    transparent: true,
    opacity: options.opacity ?? 1,
    vertexColors: !!options.vertexColors
  })
  const line = new THREE.Line(geo, mat)
  line.frustumCulled = false
  return line
}

/** 选中高亮环 */
export function createSelectRing(radius = 14): THREE.Mesh {
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(radius, radius + 2, 48),
    new THREE.MeshBasicMaterial({
      color: 0xffe066,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
      depthTest: false
    })
  )
  ring.rotation.x = -Math.PI / 2
  ring.renderOrder = 99
  return ring
}

// ---------- 迭代二：动态实体 / 预测 / 重规划可视化 ----------

/** 动态实体颜色：移动障碍橙、动态威胁按威胁类型、突发威胁红 */
export function dynamicColor(e: DynamicEntity): number {
  if (e.kind === 'moving-obstacle') return 0xff8c1a
  return THREAT_COLORS[e.threatKind]
}

/**
 * 动态实体网格（圆柱 + 地面范围环 + 预测虚线组）。
 * 返回的 group 暴露 updateState(s: DynamicState) 用于实时更新位置/半径/激活。
 */
export interface DynamicMesh {
  group: THREE.Group
  updateState: (s: DynamicState | null) => void
  setPrediction: (points: Vec3[]) => void
}

export function createDynamicMesh(e: DynamicEntity): DynamicMesh {
  const group = new THREE.Group()
  group.userData.entityId = e.id
  group.userData.entityType = 'dynamic'
  const color = dynamicColor(e)
  const mat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.28,
    side: THREE.DoubleSide,
    depthWrite: false
  })
  const cyl = new THREE.Mesh(
    new THREE.CylinderGeometry(Math.max(e.radius, 1), Math.max(e.radius, 1), 1, 32, 1, true),
    mat
  )
  group.add(cyl)

  const ringMat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.95 })
  const ring = new THREE.LineLoop(
    new THREE.BufferGeometry().setFromPoints(circlePoints(Math.max(e.radius, 1), 0.6)),
    ringMat
  )
  group.add(ring)

  // 移动障碍加实体盒（更直观）
  let box: THREE.Mesh | null = null
  if (e.kind === 'moving-obstacle') {
    box = new THREE.Mesh(
      new THREE.BoxGeometry(e.radius * 1.2, e.heightMax, e.radius * 1.2),
      new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: 0.25,
        roughness: 0.6
      })
    )
    box.position.y = e.heightMax / 2
    group.add(box)
  }

  // 预测轨迹（虚线，使用顶点色渐变）
  const predGeo = new THREE.BufferGeometry()
  predGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(0), 3))
  const predLine = new THREE.Line(
    predGeo,
    new THREE.LineBasicMaterial({ color: 0xffd166, transparent: true, opacity: 0.8 })
  )
  predLine.frustumCulled = false
  group.add(predLine)

  const label = createTextSprite(e.name, `#${new THREE.Color(color).getHexString()}`)
  label.position.set(0, Math.max(e.heightMax + 14, 30), 0)
  group.add(label)

  const updateState = (s: DynamicState | null) => {
    const active = !!s && s.active
    group.visible = active
    if (!s || !active) return
    group.position.set(s.position.x, 0, s.position.z)
    const r = Math.max(s.radius, 0.5)
    const h = Math.max(e.heightMax - e.heightMin, 1)
    cyl.scale.set(r / Math.max(e.radius, 1), h, r / Math.max(e.radius, 1))
    cyl.position.y = (e.heightMin + e.heightMax) / 2
    ring.scale.setScalar(r / Math.max(e.radius, 1))
    ring.visible = true
    if (box) {
      box.scale.setScalar(Math.min(2, Math.max(0.2, r / Math.max(e.radius, 1))))
      // 朝向速度方向
      const v = s.velocity
      if (Math.hypot(v.x, v.z) > 0.5) box.rotation.y = Math.atan2(v.x, v.z)
    }
    // 突发威胁脉冲（用材质透明度提示生长）
    if (e.kind === 'sudden-threat') {
      mat.opacity = 0.12 + 0.3 * s.growPhase
    }
  }

  const setPrediction = (points: Vec3[]) => {
    const verts = new Float32Array(points.length * 3)
    points.forEach((p, i) => {
      verts[i * 3] = p.x
      verts[i * 3 + 1] = p.y
      verts[i * 3 + 2] = p.z
    })
    predLine.geometry.dispose()
    predLine.geometry = new THREE.BufferGeometry()
    predLine.geometry.setAttribute('position', new THREE.BufferAttribute(verts, 3))
  }

  return { group, updateState, setPrediction }
}

/** 局部重规划窗口：以起/终点绘制的半透明球/框 + 候选航迹组 */
export function createReplanWindow(): THREE.Group {
  const g = new THREE.Group()
  g.visible = false
  return g
}

/** 重规划触发提示精灵（位置上方文字） */
export function createTriggerSprite(text: string): THREE.Sprite {
  const s = createTextSprite(text, '#ff5263')
  return s
}

/** 跟踪误差对比线（参考=虚线白，实际=纯色实） */
export function createTrackLine(points: Vec3[], color: number): THREE.Line {
  const geo = new THREE.BufferGeometry().setFromPoints(
    points.map((p) => new THREE.Vector3(p.x, p.y, p.z))
  )
  const line = new THREE.Line(
    geo,
    new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.9 })
  )
  line.frustumCulled = false
  return line
}
