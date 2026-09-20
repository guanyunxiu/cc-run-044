import type {
  AdvancedPlanConfig,
  BuildingObstacle,
  CostWeights,
  DynamicsConstraints,
  DynamicEntity,
  NoFlyZone,
  PlanParams,
  ReplanConfig,
  TerrainParams,
  ThreatZone,
  UavInfo,
  Waypoint
} from '@/types'

export const defaultTerrain: TerrainParams = {
  size: 1000,
  segments: 128,
  seed: 20260920,
  heightScale: 140,
  noiseScale: 0.0022,
  ridgeScale: 70,
  canyon: true
}

export const defaultDynamics: DynamicsConstraints = {
  enabled: true,
  maxTurnAngle: 45,
  maxClimbAngle: 25,
  minStepLength: 12,
  maxAccel: 12,
  minTurnRadius: 30,
  maxAttitudeChange: 60
}

export const defaultAdvanced: AdvancedPlanConfig = {
  seed: 20260920,
  rrtMaxNodes: 6000,
  rrtStep: 40,
  rrtStarRadius: 90,
  goalBias: 0.12,
  headingDiscretization: 16,
  hybridStep: 30,
  acoIterations: 40,
  acoAnts: 24,
  acoAlpha: 1,
  acoBeta: 4,
  acoRho: 0.15,
  acoQ: 60,
  psoParticles: 30,
  psoIterations: 40,
  psoInertia: 0.7,
  psoCognitive: 1.4,
  psoSocial: 1.4,
  gaPopulation: 36,
  gaIterations: 40,
  gaMutation: 0.12,
  fallbackToAstar: true
}

export const defaultReplanConfig: ReplanConfig = {
  enabled: false,
  threatEnterDistance: 60,
  collisionHorizon: 6,
  yawThreshold: 35,
  detourRatio: 1.8,
  minInterval: 2,
  lookAhead: 120,
  windowRadius: 220,
  predictObstacles: true
}

export const defaultPlanParams: PlanParams = {
  algo: 'astar',
  cellSize: 25,
  heightCell: 20,
  maxNodes: 200000,
  maxStep: 2,
  clearance: 12,
  cruiseAlt: 120,
  speedMin: 15,
  speedMax: 60,
  heuristicWeight: 1.0,
  smoothIterations: 8,
  dynamics: { ...defaultDynamics },
  advanced: { ...defaultAdvanced }
}

export const defaultWeights: CostWeights = {
  distance: 1,
  threat: 25,
  altitude: 8,
  nofly: 60,
  smooth: 0.15
}

/** 多无人机：默认 2 架，航迹在峡谷上空交叉，便于演示动态对抗 */
export function defaultUavs(): UavInfo[] {
  return [
    { id: 'uav-1', name: '无人机-01', color: 0x3aa0ff },
    { id: 'uav-2', name: '无人机-02', color: 0xffb020 }
  ]
}

let seq = 0
export const uid = (prefix = 'id'): string =>
  `${prefix}-${Date.now().toString(36)}-${(seq++).toString(36)}`

export function defaultThreats(): ThreatZone[] {
  return [
    {
      id: uid('thr'),
      kind: 'radar',
      name: '雷达-01',
      position: { x: 60, y: 0, z: 40 },
      radius: 110,
      heightMin: 0,
      heightMax: 160,
      level: 4,
      opacity: 0.22
    },
    {
      id: uid('thr'),
      kind: 'sam',
      name: '防空-01',
      position: { x: -140, y: 0, z: -90 },
      radius: 90,
      heightMin: 20,
      heightMax: 220,
      level: 5,
      opacity: 0.28
    },
    {
      id: uid('thr'),
      kind: 'jammer',
      name: '干扰-01',
      position: { x: 180, y: 0, z: -160 },
      radius: 80,
      heightMin: 0,
      heightMax: 120,
      level: 2,
      opacity: 0.2
    }
  ]
}

export function defaultNoFlyZones(): NoFlyZone[] {
  return [
    {
      id: uid('nfz'),
      name: '禁飞区-城区',
      position: { x: -40, y: 0, z: 150 },
      radius: 70,
      heightMin: 0,
      heightMax: 300,
      penalty: 10,
      hardBlock: true
    }
  ]
}

export function defaultObstacles(): BuildingObstacle[] {
  return [
    {
      id: uid('obs'),
      name: '建筑-A',
      position: { x: 240, y: 0, z: 120 },
      size: { x: 36, z: 36 },
      height: 55
    },
    {
      id: uid('obs'),
      name: '建筑-B',
      position: { x: 285, y: 0, z: 80 },
      size: { x: 24, z: 40 },
      height: 40
    }
  ]
}

/** 动态实体默认场景：1 个巡逻移动障碍 + 1 个突发威胁 */
export function defaultDynamicEntities(): DynamicEntity[] {
  return [
    {
      id: uid('dyn'),
      name: '巡逻障碍车-01',
      kind: 'moving-obstacle',
      motion: 'patrol',
      threatKind: 'sam',
      position: { x: -40, y: 0, z: -20 },
      radius: 22,
      heightMin: 0,
      heightMax: 90,
      level: 3,
      patrolPoints: [
        { x: -180, y: 0, z: -40 },
        { x: 120, y: 0, z: 60 },
        { x: 60, y: 0, z: 200 }
      ],
      velocity: { x: 18, y: 0, z: 0 },
      patrolSpeed: 22,
      triggerTime: 0,
      growDuration: 2,
      persistent: true,
      period: 30,
      predictHorizon: 8,
      enabled: true
    },
    {
      id: uid('dyn'),
      name: '突发威胁-01',
      kind: 'sudden-threat',
      motion: 'burst',
      threatKind: 'sam',
      position: { x: 60, y: 0, z: 120 },
      radius: 70,
      heightMin: 0,
      heightMax: 180,
      level: 5,
      patrolPoints: [
        { x: 60, y: 0, z: 120 },
        { x: 60, y: 0, z: 120 }
      ],
      velocity: { x: 0, y: 0, z: 0 },
      patrolSpeed: 0,
      triggerTime: 12,
      growDuration: 3,
      persistent: false,
      period: 24,
      predictHorizon: 6,
      enabled: true
    }
  ]
}

/** 默认航点：uav-1 与迭代一一致；uav-2 反向任务形成交叉 */
export function defaultWaypoints(): Waypoint[] {
  return [
    {
      id: uid('wp'),
      uavId: 'uav-1',
      role: 'start',
      position: { x: -420, y: 120, z: -320 },
      speed: 30
    },
    {
      id: uid('wp'),
      uavId: 'uav-1',
      role: 'via',
      position: { x: -150, y: 130, z: 80 },
      speed: 30
    },
    {
      id: uid('wp'),
      uavId: 'uav-1',
      role: 'end',
      position: { x: 420, y: 110, z: 300 },
      speed: 30
    },
    {
      id: uid('wp'),
      uavId: 'uav-2',
      role: 'start',
      position: { x: 420, y: 130, z: -260 },
      speed: 28
    },
    {
      id: uid('wp'),
      uavId: 'uav-2',
      role: 'end',
      position: { x: -400, y: 120, z: 260 },
      speed: 28
    }
  ]
}
