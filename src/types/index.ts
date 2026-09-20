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

/** 迭代一：A星/Dijkstra；迭代二新增 RRT/RRT星/Hybrid A星/蚁群/粒子群/遗传 */
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

/** 威胁等级 1~5，数值越高威胁越强（用于颜色映射与暴露代价） */
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
 * 动态实体：移动障碍物 / 突发威胁（功能02）。
 * - 静态时等价于普通障碍/威胁；
 * - patrol 模式沿折线航点巡逻并往返；linear 模式匀速直线；
 * - 突发威胁受 schedule 控制（enableAt/disableAt），到时出现/消失。
 */
export interface DynamicEntity {
  id: string
  name: string
  /** obstacle：硬碰撞球；threat：动态威胁（场强 + 安全膨胀碰撞） */
  kind: 'obstacle' | 'threat'
  motion: 'static' | 'linear' | 'patrol'
  /** 初始位置（linear 起点 / patrol 首个航点） */
  position: Vec3
  /** linear 目标点 */
  target: Vec3
  /** patrol 巡逻航点（含起点，世界坐标） */
  patrolPoints: Vec3[]
  /** 运动速度（m/s，仿真时间口径） */
  speed: number
  /** obstacle：球体半径（碰撞+渲染） */
  radius: number
  /** threat：威胁半径与高度范围 */
  threatRadius: number
  heightMin: number
  heightMax: number
  /** threat：威胁等级 1~5 */
  level: number
  /** 预测时域（秒），渲染预测轨迹与重规划前瞻共用 */
  predictHorizon: number
  /** 突发：启用时刻（秒），Infinity 表示永不自动出现 */
  enableAt: number
  /** 突发：消失时刻（秒），Infinity 表示出现后不消失 */
  disableAt: number
  /** 当前是否激活（突发威胁受调度控制；移动障碍默认 true） */
  active: boolean
  color: string
}

/** 起点 / 终点 / 途经点统一为航点 */
export interface Waypoint {
  id: string
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
export interface DynamicsParams {
  /** 是否在搜索过程中施加约束（false 时仅做事后检查统计） */
  enforceInSearch: boolean
  /** 最大水平转弯角（度） */
  maxTurnAngle: number
  /** 最大爬升/下滑角（度） */
  maxClimbAngle: number
  /** 最小航段步长（米） */
  minStep: number
  /** 最大加速度（m/s²） */
  maxAccel: number
  /** 最小转弯半径（米） */
  minTurnRadius: number
  /** 最大姿态角变化率（度/秒） */
  maxAttitudeRate: number
  /** 违反约束后是否尝试自动修正（航迹整形） */
  autoRepair: boolean
}

/** 各高级算法的可调参数（功能01：参数实时调节） */
export interface AlgoTuning {
  /** RRT 系列：单步扩展步长（米） */
  rrtStep: number
  /** RRT 系列：目标偏置概率 0~1 */
  goalBias: number
  /** RRT*：邻域重连半径（米） */
  rewireRadius: number
  /** RRT 系列：最大采样节点数 */
  maxSamples: number
  /** Hybrid A*：运动基元档位（档位数） */
  motionPrims: number
  /** 蚁群：蚂蚁数量 */
  antCount: number
  /** 蚁群：迭代代数 */
  acoIterations: number
  /** 蚁群：信息素重要度 alpha */
  acoAlpha: number
  /** 蚁群：启发重要度 beta */
  acoBeta: number
  /** 蚁群：信息素挥发率 */
  acoEvap: number
  /** 蚁群：信息素强度 Q */
  acoQ: number
  /** 粒子群：粒子数 */
  psoParticles: number
  /** 粒子群：迭代代数 */
  psoIterations: number
  /** 粒子群：惯性权重 */
  psoInertia: number
  /** 粒子群：自我学习因子 */
  psoC1: number
  /** 粒子群：社会学习因子 */
  psoC2: number
  /** 粒子群：走廊侧向半宽（米） */
  psoCorridor: number
  /** 遗传：种群规模 */
  gaPopulation: number
  /** 遗传：迭代代数 */
  gaIterations: number
  /** 遗传：交叉概率 */
  gaCrossover: number
  /** 遗传：变异概率 */
  gaMutation: number
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
  dynamics: DynamicsParams
  /** 各算法参数 */
  tuning: AlgoTuning
}

/** 在线重规划触发开关与阈值（功能02） */
export interface ReplanTriggers {
  enabled: boolean
  /** 移动障碍/突发威胁进入预警距离 */
  onThreatApproach: boolean
  /** 前瞻航段碰撞风险 */
  onCollisionRisk: boolean
  /** 偏航过大（相对原航迹航向偏差，度） */
  onYawDeviation: boolean
  /** 剩余航程异常（与原计划偏差比例） */
  onRangeAnomaly: boolean
  /** 碰撞风险前瞻时间（秒） */
  lookaheadTime: number
  /** 威胁接近预警距离（米） */
  warnDistance: number
  /** 偏航阈值（度） */
  yawThreshold: number
  /** 剩余航程异常阈值（比例，如 0.35 = 偏差超过 35%） */
  rangeThreshold: number
  /** 局部重规划窗口半径（米） */
  windowRadius: number
}

/** 约束违反统计（功能03） */
export interface ConstraintReport {
  /** 参与检查的加密采样点总数 */
  samples: number
  /** 转弯角违反点数 */
  turnViolations: number
  /** 爬升角违反点数 */
  climbViolations: number
  /** 步长违反段数 */
  stepViolations: number
  /** 最小转弯半径违反点数 */
  radiusViolations: number
  /** 加速度违反采样数 */
  accelViolations: number
  /** 姿态变化率违反采样数 */
  attitudeRateViolations: number
  /** 综合约束满足率（%） */
  satisfactionRate: number
  /** 违反点（供渲染高亮），值为航迹点下标 */
  violationIndices: number[]
}

/** 航迹几何/动力学指标（功能04：平滑前后对比） */
export interface PathMetrics {
  length: number
  maxCurvature: number
  meanCurvature: number
  maxTurnAngle: number
  maxClimbAngle: number
  /** 最大速度 m/s */
  maxSpeed: number
  /** 最大加速度 m/s² */
  maxAccel: number
  /** 最大抖动（加加速度）m/s³ */
  maxJerk: number
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
  /** 使用的算法 */
  algo?: AlgoType
  /** 平滑方式 */
  smoothing?: SmoothingType
  /** 约束满足报告 */
  constraints?: ConstraintReport
  /** 原始折线指标 */
  rawMetrics?: PathMetrics
  /** 平滑后指标 */
  smoothMetrics?: PathMetrics
  /** 重规划次数（在线累计） */
  replanCount?: number
}

export interface PlanLegResult {
  legIndex: number
  points: Vec3[]
  success: boolean
  expandedNodes: number
  costBreakdown: CostWeights
  cumulativeCost: number
}

/** RRT 类算法记录的候选航迹（功能05：候选航迹显示） */
export interface CandidatePath {
  points: Vec3[]
  /** 候选代价（越小越优） */
  cost: number
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
  /** 搜索过程中的候选航迹（RRT 采样树叶子等，用于可视化） */
  candidates?: CandidatePath[]
}

/** 重规划触发原因（功能02/05） */
export type ReplanReason =
  | 'threat-approach'
  | 'collision-risk'
  | 'yaw-deviation'
  | 'range-anomaly'
  | 'manual'

export interface ReplanEvent {
  /** 触发仿真时刻（秒） */
  time: number
  reason: ReplanReason
  /** 人类可读说明 */
  detail: string
  /** 触发点（无人机当时位置） */
  position: Vec3
  /** 重规划前局部代价 */
  costBefore: number
  /** 重规划后局部代价 */
  costAfter: number
  /** 重规划耗时 ms */
  planMs: number
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
  /** 迭代二：动态实体 */
  dynamics?: DynamicEntity[]
  /** 迭代二：重规划触发配置 */
  replanTriggers?: ReplanTriggers
  rawPath: Vec3[] | null
  smoothPath: Vec3[] | null
  trajectory: Vec3[] | null
  stats: PlanningStats | null
}
