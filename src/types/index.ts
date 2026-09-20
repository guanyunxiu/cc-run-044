/** 三维向量，y 轴为高度（与 Three.js 一致） */
export interface Vec3 {
  x: number
  y: number
  z: number
}

export type ZoneId = string
export type EditMode =
  | 'select'
  | 'add-threat'
  | 'add-nofly'
  | 'add-waypoint'
  | 'add-obstacle'
  | 'add-dynamic'

export type CameraMode = 'orbit' | 'top' | 'follow'

/** 迭代二新增高级规划策略；astar/dijkstra 为体素栅格搜索 */
export type AlgoType =
  | 'astar'
  | 'dijkstra'
  | 'rrt'
  | 'rrtstar'
  | 'hybridastar'
  | 'aco'
  | 'pso'
  | 'ga'

export type SmoothingType =
  | 'none'
  | 'polyline'
  | 'bspline'
  | 'bezier'
  | 'polynomial'
  | 'dubins'
  | 'clothoid'

/** 威胁区类型 */
export type ThreatKind = 'radar' | 'sam' | 'jammer'

/** 动态威胁/移动障碍的运动模型 */
export type DynamicMotionKind = 'patrol' | 'linear' | 'intercept' | 'burst'

/** 动态实体类型：移动障碍（硬碰撞）/ 动态威胁区（软暴露+可选硬碰撞）/ 突发威胁 */
export type DynamicKind = 'moving-obstacle' | 'dynamic-threat' | 'sudden-threat'

/** 威胁区等级 1~5，数值越高威胁越强（用于颜色映射与暴露代价） */
export interface ThreatZone {
  id: ZoneId
  kind: ThreatKind
  name: string
  position: Vec3
  radius: number
  heightMin: number
  heightMax: number
  level: number
  opacity: number
}

export interface NoFlyZone {
  id: ZoneId
  name: string
  position: Vec3
  radius: number
  heightMin: number
  heightMax: number
  /** 惩罚权重，仅软避障时生效；hardBlock=true 时体素直接不可通行 */
  penalty: number
  hardBlock: boolean
}

export interface BuildingObstacle {
  id: ZoneId
  name: string
  position: Vec3
  /** 底面尺寸 */
  size: { x: number; z: number }
  height: number
}

/**
 * 动态实体：移动障碍 / 动态威胁 / 突发威胁。
 * 位置由仿真时间决定（见 core/dynamics.ts 与 dynamic.ts）：
 * - patrol：在 waypoints 之间匀速往返巡逻
 * - linear：沿 velocity 匀速直线（可出界后停止/循环）
 * - intercept：朝参考航迹方向拦截（在环境快照中按时间推算）
 * - burst：突发威胁，在 triggerTime 出现，半径在 growDuration 内长到 radius
 */
export interface DynamicEntity {
  id: string
  name: string
  kind: DynamicKind
  motion: DynamicMotionKind
  /** 对动态威胁：威胁类型；移动障碍忽略 */
  threatKind: ThreatKind
  /** 当前基准位置（编辑时使用；运行时由运动模型推算） */
  position: Vec3
  radius: number
  heightMin: number
  heightMax: number
  level: number
  /** patrol 路径点（世界坐标 x/z，y 取实体高度带）；至少 2 个 */
  patrolPoints: Vec3[]
  /** linear/intercept 速度向量（m/s） */
  velocity: Vec3
  /** patrol 速度（m/s） */
  patrolSpeed: number
  /** burst：出现时刻（s）与生长时间（s） */
  triggerTime: number
  growDuration: number
  /** burst：是否为一次性（出现后保持）；false 则周期性出现消失 */
  persistent: boolean
  /** 周期出现间隔（persistent=false 时使用） */
  period: number
  /** 预测轨迹显示时长（s） */
  predictHorizon: number
  /** 是否参与在线重规划触发 */
  enabled: boolean
}

/** 无人机 */
export interface UavInfo {
  id: string
  name: string
  /** 轨迹/标记显示颜色 */
  color: number
}

/** 起点 / 终点 / 途经点统一为航点 */
export interface Waypoint {
  id: string
  /** 所属无人机（多机任务）；缺省视为 uav-1 */
  uavId?: string
  position: Vec3
  speed: number
  role: 'start' | 'end' | 'via'
}

export interface TerrainParams {
  size: number
  segments: number
  seed: number
  heightScale: number
  noiseScale: number
  ridgeScale: number
  canyon: boolean
}

export interface CostWeights {
  distance: number
  threat: number
  altitude: number
  nofly: number
  smooth: number
}

/** 动力学约束（功能03） */
export interface DynamicsConstraints {
  /** 是否在规划/平滑中启动力学约束 */
  enabled: boolean
  /** 最大水平转弯角（度） */
  maxTurnAngle: number
  /** 最大爬升/下滑角（度） */
  maxClimbAngle: number
  /** 最小航段步长（米） */
  minStepLength: number
  /** 最大加速度（m/s²） */
  maxAccel: number
  /** 最小转弯半径（米） */
  minTurnRadius: number
  /** 相邻航点姿态（航向）最大变化（度） */
  maxAttitudeChange: number
}

/** 高级规划算法的可插拔参数（各算法按需读取） */
export interface AdvancedPlanConfig {
  /** 随机采样算法种子 */
  seed: number
  /** RRT/RRT* 最大采样节点数 */
  rrtMaxNodes: number
  /** RRT 扩展步长（米） */
  rrtStep: number
  /** RRT* 近邻半径（米） */
  rrtStarRadius: number
  /** 目标偏置概率 0..1 */
  goalBias: number
  /** Hybrid A* 航向离散数 */
  headingDiscretization: number
  /** Hybrid A* 扩展步长（米） */
  hybridStep: number
  /** 蚁群迭代次数 / 蚂蚁数 / 信息素因子 */
  acoIterations: number
  acoAnts: number
  acoAlpha: number
  acoBeta: number
  acoRho: number
  acoQ: number
  /** 粒子群粒子数 / 迭代次数 */
  psoParticles: number
  psoIterations: number
  psoInertia: number
  psoCognitive: number
  psoSocial: number
  /** 遗传种群 / 迭代 / 变异率 */
  gaPopulation: number
  gaIterations: number
  gaMutation: number
  /** 随机/群智规划失败时回退到体素 A* */
  fallbackToAstar: boolean
}

export interface PlanParams {
  algo: AlgoType
  /** 体素分辨率（米/格） */
  cellSize: number
  /** 高度方向分辨率（米/层） */
  heightCell: number
  /** A* 单次搜索最大扩展节点数 */
  maxNodes: number
  /** 单步最大格数（步长）：1 为 6/26 邻域，>1 为长步长扩展 */
  maxStep: number
  /** 最小离地安全距离 */
  clearance: number
  /** 巡航高度（高度代价基准） */
  cruiseAlt: number
  /** 飞行速度范围 */
  speedMin: number
  speedMax: number
  /** A* 启发式权重 */
  heuristicWeight: number
  /** B样条/折线平滑迭代次数 */
  smoothIterations: number
  /** 动力学约束 */
  dynamics: DynamicsConstraints
  /** 高级算法参数 */
  advanced: AdvancedPlanConfig
}

/** 在线重规划触发条件配置（功能02） */
export interface ReplanConfig {
  enabled: boolean
  /** 威胁进入安全裕度（米）：预测航迹上动态威胁接近到此距离触发 */
  threatEnterDistance: number
  /** 碰撞风险时间窗（秒）：该时间内预测碰撞即触发 */
  collisionHorizon: number
  /** 偏航过大阈值（度）：实际跟踪航向偏离参考航向 */
  yawThreshold: number
  /** 剩余航程异常：剩余航程/直线距离超过此倍率触发 */
  detourRatio: number
  /** 两次重规划最小间隔（秒） */
  minInterval: number
  /** 局部重规划前瞻距离（米） */
  lookAhead: number
  /** 局部重规划窗口半径（米，候选航迹显示范围） */
  windowRadius: number
  /** 是否对动态障碍做预测避让（按预测位置膨胀） */
  predictObstacles: boolean
}

export interface PlanningStats {
  distance: number
  threatExposure: number
  exposureTime: number
  planTimeMs: number
  expandedNodes: number
  success: boolean
  segments: number
  obstacleAvoidanceRate: number
  totalCost: number
  costBreakdown: CostWeights
  /** 迭代二：使用的规划算法 */
  algo?: AlgoType
  /** 约束满足率（0..100） */
  constraintRate?: number
  /** 违反约束次数（按类别） */
  constraintViolations?: Partial<Record<ConstraintViolationType, number>>
  /** 平滑前后指标对比 */
  metrics?: SmoothMetrics
}

export type ConstraintViolationType =
  | 'turn'
  | 'climb'
  | 'step'
  | 'radius'
  | 'attitude'
  | 'collision'

export interface ConstraintViolation {
  type: ConstraintViolationType
  pointIndex: number
  point: Vec3
  /** 实际值与限值 */
  actual: number
  limit: number
  message: string
}

export interface ConstraintReport {
  violations: ConstraintViolation[]
  /** 受检航段总数 */
  segments: number
  /** 满足约束的航段比例（0..1） */
  satisfaction: number
  counts: Record<ConstraintViolationType, number>
}

/** 平滑前后航迹质量指标（功能04） */
export interface SmoothMetrics {
  /** 航程（米） */
  length: number
  /** 最大曲率（1/米） */
  maxCurvature: number
  /** 平均曲率（1/米） */
  avgCurvature: number
  /** 最大转角（度） */
  maxTurnAngle: number
  /** 最大加速度（m/s²，基于速度剖面估计） */
  maxAccel: number
  /** 最大抖动 jerk（m/s³） */
  maxJerk: number
  /** 平均速度（m/s） */
  avgSpeed: number
}

/** 跟踪误差统计（功能04） */
export interface TrackingStats {
  /** 平均位置误差（米） */
  meanError: number
  /** 最大位置误差（米） */
  maxError: number
  /** 平均航向误差（度） */
  meanHeadingError: number
  /** 跟踪样本数 */
  samples: number
}

export interface PlanLegResult {
  legIndex: number
  points: Vec3[]
  success: boolean
  expandedNodes: number
  costBreakdown: CostWeights
  cumulativeCost: number
}

export interface PlanResult {
  success: boolean
  /** 原始折线路径（全部航段合并） */
  rawPath: Vec3[]
  /** 平滑后路径 */
  smoothPath: Vec3[]
  stats: PlanningStats
  legs: PlanLegResult[]
  message: string
  /** 迭代二：实际使用的算法（可能因回退与请求不同） */
  algo?: AlgoType
  /** 动力学约束报告（针对平滑后航迹） */
  constraintReport?: ConstraintReport
  /** 平滑前（原始折线）指标 */
  rawMetrics?: SmoothMetrics
  /** 平滑后指标 */
  smoothMetrics?: SmoothMetrics
  /** 候选航迹（规划策略对比 / 局部重规划候选） */
  candidates?: PlanCandidate[]
}

/** 规划候选（多算法/多次采样的可对比结果） */
export interface PlanCandidate {
  label: string
  algo: AlgoType
  path: Vec3[]
  success: boolean
  distance: number
  totalCost: number
  planTimeMs: number
}

/** 在线重规划事件（功能02） */
export interface ReplanEvent {
  /** 仿真时间（秒） */
  time: number
  /** 触发原因 */
  reason: 'threat-enter' | 'collision-risk' | 'yaw-deviation' | 'range-anomaly' | 'manual'
  reasonLabel: string
  /** 触发时无人机位置 */
  position: Vec3
  /** 局部重规划起点（航迹上前瞻点） */
  replanFrom: Vec3
  /** 重规划目标点 */
  replanGoal: Vec3
  /** 旧（重规划前）局部航迹 */
  oldLocalPath: Vec3[]
  /** 新局部航迹 */
  newLocalPath: Vec3[]
  /** 候选航迹（局部） */
  candidates: PlanCandidate[]
  /** 重规划前剩余代价 */
  costBefore: number
  /** 重规划后剩余代价 */
  costAfter: number
  /** 重规划耗时（ms） */
  planTimeMs: number
  /** 关联的动态实体 id（若有） */
  entityId?: string
}

export interface SerializedScene {
  version: string
  exportedAt: string
  terrain: TerrainParams
  threats: ThreatZone[]
  noflyZones: NoFlyZone[]
  obstacles: BuildingObstacle[]
  waypoints: Waypoint[]
  planParams: PlanParams
  weights: CostWeights
  rawPath: Vec3[] | null
  smoothPath: Vec3[] | null
  trajectory: Vec3[] | null
  stats: PlanningStats | null
  /** 迭代二扩展 */
  dynamics?: DynamicEntity[]
  uavs?: UavInfo[]
  replanConfig?: ReplanConfig
}
