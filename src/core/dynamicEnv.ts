import type { DynamicEntity, TerrainParams } from '@/types'
import { Environment, type MovingCylinder } from './environment'
import type {
  BuildingObstacle,
  NoFlyZone,
  ThreatZone,
  Vec3
} from '@/types'
import { dynamicStateAt } from './dynamics'

export interface SnapshotInput {
  terrain: TerrainParams
  threats: ThreatZone[]
  noflyZones: NoFlyZone[]
  obstacles: BuildingObstacle[]
  dynamics: DynamicEntity[]
}

/**
 * 在仿真时间 t 构建环境快照：
 * - moving-obstacle 转为圆柱动态障碍（带速度，供预测避让）
 * - dynamic-threat / sudden-threat 并入静态威胁列表（威胁场/暴露代价）
 */
export function environmentAt(
  input: SnapshotInput,
  t: number,
  reference?: Vec3
): Environment {
  const moving: MovingCylinder[] = []
  const extraThreats: ThreatZone[] = []

  for (const e of input.dynamics) {
    if (!e.enabled) continue
    const s = dynamicStateAt(e, t, reference)
    if (!s.active || s.radius < 0.5) continue
    if (e.kind === 'moving-obstacle') {
      moving.push({
        position: { x: s.position.x, y: 0, z: s.position.z },
        radius: s.radius,
        heightMin: e.heightMin,
        heightMax: e.heightMax,
        velocity: s.velocity,
        entityId: e.id
      })
    } else {
      extraThreats.push({
        id: e.id,
        kind: e.threatKind,
        name: e.name,
        position: { x: s.position.x, y: 0, z: s.position.z },
        radius: s.radius,
        heightMin: e.heightMin,
        heightMax: e.heightMax,
        level: e.level,
        opacity: 0.24
      })
    }
  }

  return new Environment(
    input.terrain,
    [...input.threats, ...extraThreats],
    input.noflyZones,
    input.obstacles,
    moving
  )
}
