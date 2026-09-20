import { defineStore } from 'pinia'
import type {
  BuildingObstacle,
  CostWeights,
  DynamicEntity,
  EditMode,
  NoFlyZone,
  PlanParams,
  TerrainParams,
  ThreatKind,
  ThreatZone,
  UavInfo,
  Vec3,
  Waypoint
} from '@/types'
import {
  defaultDynamicEntities,
  defaultNoFlyZones,
  defaultObstacles,
  defaultPlanParams,
  defaultTerrain,
  defaultThreats,
  defaultUavs,
  defaultWaypoints,
  defaultWeights,
  uid
} from '@/core/defaults'
import type { SerializedScene } from '@/types'

interface SceneState {
  terrain: TerrainParams
  threats: ThreatZone[]
  noflyZones: NoFlyZone[]
  obstacles: BuildingObstacle[]
  dynamics: DynamicEntity[]
  uavs: UavInfo[]
  waypoints: Waypoint[]
  planParams: PlanParams
  weights: CostWeights
  editMode: EditMode
  selectedId: string | null
  /** 当前活动无人机（编辑/显示的对象） */
  activeUavId: string
  /** 地形参数版本号，变化即通知渲染层重建网格 */
  terrainVersion: number
}

export const useSceneStore = defineStore('scene', {
  state: (): SceneState => ({
    terrain: { ...defaultTerrain },
    threats: defaultThreats(),
    noflyZones: defaultNoFlyZones(),
    obstacles: defaultObstacles(),
    dynamics: defaultDynamicEntities(),
    uavs: defaultUavs(),
    waypoints: defaultWaypoints(),
    planParams: { ...defaultPlanParams },
    weights: { ...defaultWeights },
    editMode: 'select',
    selectedId: null,
    activeUavId: 'uav-1',
    terrainVersion: 0
  }),

  getters: {
    startPoint: (s) =>
      s.waypoints.find(
        (w) => (w.uavId ?? 'uav-1') === s.activeUavId && w.role === 'start'
      ),
    endPoint: (s) =>
      s.waypoints.find(
        (w) => (w.uavId ?? 'uav-1') === s.activeUavId && w.role === 'end'
      ),
    activeUav: (s) => s.uavs.find((u) => u.id === s.activeUavId) ?? s.uavs[0],
    /** 活动无人机的航点（排序视图） */
    activeWaypoints: (s) =>
      s.waypoints
        .filter((w) => (w.uavId ?? 'uav-1') === s.activeUavId)
        .sort((a, b) => {
          const rank = (r: Waypoint['role']) =>
            r === 'start' ? 0 : r === 'end' ? 2 : 1
          return rank(a.role) - rank(b.role)
        })
  },

  actions: {
    setEditMode(mode: EditMode) {
      this.editMode = mode
      if (mode !== 'select') this.selectedId = null
    },

    setActiveUav(id: string) {
      this.activeUavId = id
      this.selectedId = null
    },

    select(id: string | null) {
      this.selectedId = id
    },

    addThreatAt(p: Vec3, kind: ThreatKind = 'radar'): string {
      const id = uid('thr')
      const names: Record<ThreatKind, string> = {
        radar: '雷达',
        sam: '防空',
        jammer: '干扰'
      }
      this.threats.push({
        id,
        kind,
        name: `${names[kind]}-${this.threats.length + 1}`,
        position: { ...p },
        radius: 90,
        heightMin: 0,
        heightMax: 160,
        level: 3,
        opacity: kind === 'sam' ? 0.28 : 0.22
      })
      this.selectedId = id
      return id
    },

    updateThreat(id: string, patch: Partial<ThreatZone>) {
      const t = this.threats.find((x) => x.id === id)
      if (t) Object.assign(t, patch)
    },

    removeThreat(id: string) {
      this.threats = this.threats.filter((t) => t.id !== id)
      if (this.selectedId === id) this.selectedId = null
    },

    addNoFlyAt(p: Vec3): string {
      const id = uid('nfz')
      this.noflyZones.push({
        id,
        name: `禁飞区-${this.noflyZones.length + 1}`,
        position: { ...p },
        radius: 60,
        heightMin: 0,
        heightMax: 200,
        penalty: 10,
        hardBlock: true
      })
      this.selectedId = id
      return id
    },

    updateNoFly(id: string, patch: Partial<NoFlyZone>) {
      const z = this.noflyZones.find((x) => x.id === id)
      if (z) Object.assign(z, patch)
    },

    removeNoFly(id: string) {
      this.noflyZones = this.noflyZones.filter((z) => z.id !== id)
      if (this.selectedId === id) this.selectedId = null
    },

    addObstacleAt(p: Vec3): string {
      const id = uid('obs')
      this.obstacles.push({
        id,
        name: `建筑-${this.obstacles.length + 1}`,
        position: { ...p, y: 0 },
        size: { x: 30, z: 30 },
        height: 45
      })
      this.selectedId = id
      return id
    },

    updateObstacle(id: string, patch: Partial<BuildingObstacle>) {
      const o = this.obstacles.find((x) => x.id === id)
      if (o) Object.assign(o, patch)
    },

    removeObstacle(id: string) {
      this.obstacles = this.obstacles.filter((o) => o.id !== id)
      if (this.selectedId === id) this.selectedId = null
    },

    // ---------- 动态实体 ----------

    addDynamicAt(p: Vec3): string {
      const id = uid('dyn')
      this.dynamics.push({
        id,
        name: `移动障碍-${this.dynamics.length + 1}`,
        kind: 'moving-obstacle',
        motion: 'patrol',
        threatKind: 'sam',
        position: { ...p, y: 0 },
        radius: 22,
        heightMin: 0,
        heightMax: 90,
        level: 3,
        patrolPoints: [
          { x: p.x - 80, y: 0, z: p.z },
          { x: p.x + 80, y: 0, z: p.z + 40 }
        ],
        velocity: { x: 18, y: 0, z: 0 },
        patrolSpeed: 20,
        triggerTime: 0,
        growDuration: 2,
        persistent: true,
        period: 30,
        predictHorizon: 8,
        enabled: true
      })
      this.selectedId = id
      return id
    },

    updateDynamic(id: string, patch: Partial<DynamicEntity>) {
      const d = this.dynamics.find((x) => x.id === id)
      if (d) Object.assign(d, patch)
    },

    removeDynamic(id: string) {
      this.dynamics = this.dynamics.filter((d) => d.id !== id)
      if (this.selectedId === id) this.selectedId = null
    },

    addWaypointAt(p: Vec3, uavId?: string): string {
      const id = uid('wp')
      const owner = uavId ?? this.activeUavId
      // 若该无人机还没有起点则先作为起点，否则作为途经点
      const owned = this.waypoints.filter((w) => (w.uavId ?? 'uav-1') === owner)
      const hasStart = owned.some((w) => w.role === 'start')
      const hasEnd = owned.some((w) => w.role === 'end')
      const role: Waypoint['role'] = !hasStart
        ? 'start'
        : !hasEnd
          ? 'end'
          : 'via'
      this.waypoints.push({ id, uavId: owner, role, position: { ...p }, speed: 30 })
      this.selectedId = id
      return id
    },

    updateWaypoint(id: string, patch: Partial<Waypoint>) {
      const w = this.waypoints.find((x) => x.id === id)
      if (w) Object.assign(w, patch)
    },

    removeWaypoint(id: string) {
      const w = this.waypoints.find((x) => x.id === id)
      if (w && w.role === 'via') {
        this.waypoints = this.waypoints.filter((x) => x.id !== id)
        if (this.selectedId === id) this.selectedId = null
      }
    },

    addUav(): string {
      const id = `uav-${this.uavs.length + 1}`
      const palette = [0xe056fd, 0x00cec9, 0xfd79a8, 0xa3cb38, 0xfdcb6e]
      this.uavs.push({
        id,
        name: `无人机-${String(this.uavs.length + 1).padStart(2, '0')}`,
        color: palette[this.uavs.length % palette.length]
      })
      return id
    },

    removeUav(id: string) {
      if (this.uavs.length <= 1) return
      this.uavs = this.uavs.filter((u) => u.id !== id)
      this.waypoints = this.waypoints.filter((w) => (w.uavId ?? 'uav-1') !== id)
      if (this.activeUavId === id) this.activeUavId = this.uavs[0].id
    },

    removeSelected() {
      const id = this.selectedId
      if (!id) return
      this.removeThreat(id)
      this.removeNoFly(id)
      this.removeObstacle(id)
      this.removeWaypoint(id)
      this.removeDynamic(id)
    },

    /** 场景序列化（供导出） */
    serialize(
      extra: Pick<SerializedScene, 'rawPath' | 'smoothPath' | 'trajectory' | 'stats'>
    ): SerializedScene {
      return {
        version: '2.0.0',
        exportedAt: new Date().toISOString(),
        terrain: JSON.parse(JSON.stringify(this.terrain)),
        threats: JSON.parse(JSON.stringify(this.threats)),
        noflyZones: JSON.parse(JSON.stringify(this.noflyZones)),
        obstacles: JSON.parse(JSON.stringify(this.obstacles)),
        waypoints: JSON.parse(JSON.stringify(this.waypoints)),
        planParams: JSON.parse(JSON.stringify(this.planParams)),
        weights: JSON.parse(JSON.stringify(this.weights)),
        dynamics: JSON.parse(JSON.stringify(this.dynamics)),
        uavs: JSON.parse(JSON.stringify(this.uavs)),
        ...extra
      }
    },

    loadScene(data: SerializedScene) {
      this.terrain = { ...defaultTerrain, ...data.terrain }
      this.threats = data.threats ?? []
      this.noflyZones = data.noflyZones ?? []
      this.obstacles = data.obstacles ?? []
      this.waypoints = (data.waypoints ?? []).map((w) => ({
        uavId: 'uav-1',
        ...w
      }))
      this.planParams = migratePlanParams(data.planParams)
      this.weights = { ...this.weights, ...data.weights }
      this.dynamics = data.dynamics ?? []
      this.uavs = data.uavs?.length ? data.uavs : defaultUavs()
      this.activeUavId = this.uavs[0]?.id ?? 'uav-1'
      this.selectedId = null
    },

    resetScene() {
      this.terrain = { ...defaultTerrain }
      this.threats = defaultThreats()
      this.noflyZones = defaultNoFlyZones()
      this.obstacles = defaultObstacles()
      this.dynamics = defaultDynamicEntities()
      this.uavs = defaultUavs()
      this.waypoints = defaultWaypoints()
      this.planParams = { ...defaultPlanParams }
      this.weights = { ...defaultWeights }
      this.selectedId = null
      this.editMode = 'select'
      this.activeUavId = 'uav-1'
    }
  }
})

/** 兼容迭代一导出的 PlanParams（补齐动力学/高级算法字段） */
export function migratePlanParams(p: Partial<PlanParams> | undefined): PlanParams {
  const base: PlanParams = JSON.parse(JSON.stringify(defaultPlanParams))
  if (!p) return base
  return {
    ...base,
    ...p,
    dynamics: { ...base.dynamics, ...(p.dynamics ?? {}) },
    advanced: { ...base.advanced, ...(p.advanced ?? {}) }
  }
}
