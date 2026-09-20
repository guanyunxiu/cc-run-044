<script setup lang="ts">
import { useSceneStore } from '@/stores/scene'
import { useSimStore } from '@/stores/sim'
import NumberSlider from './NumberSlider.vue'
import { ALGO_LABELS, isGridAlgo } from '@/core/planners'
import type { AlgoType } from '@/types'

const scene = useSceneStore()
const sim = useSimStore()
const p = scene.planParams
const w = scene.weights
const d = p.dynamics
const adv = p.advanced
const rc = sim.replanConfig

const algos: AlgoType[] = [
  'astar',
  'dijkstra',
  'rrt',
  'rrtstar',
  'hybridastar',
  'aco',
  'pso',
  'ga'
]

function setAlgo(a: AlgoType) {
  p.algo = a
}
</script>

<template>
  <div>
    <div class="section">
      <div class="section-title">高级规划算法（可插拔）</div>
      <div class="algo-grid">
        <button
          v-for="a in algos"
          :key="a"
          :class="{ active: p.algo === a }"
          @click="setAlgo(a)"
        >
          {{ ALGO_LABELS[a] }}
        </button>
      </div>
      <div class="field" style="grid-template-columns: 88px 1fr; margin-top: 8px">
        <label>平滑方式</label>
        <select
          :value="sim.smoothing"
          @change="sim.setSmoothing(($event.target as HTMLSelectElement).value as any)"
        >
          <option value="none">不平滑（原始折线）</option>
          <option value="polyline">折线松弛平滑</option>
          <option value="bspline">三次 B 样条平滑</option>
          <option value="bezier">三次贝塞尔平滑</option>
          <option value="polynomial">Catmull-Rom 多项式</option>
          <option value="dubins">Dubins 曲线</option>
          <option value="clothoid">Clothoid 回旋曲线</option>
        </select>
      </div>
      <label class="checkbox" style="margin-top: 6px">
        <input type="checkbox" v-model="adv.fallbackToAstar" />
        采样/群智算法失败时回退 A*（保证可达）
      </label>
    </div>

    <div class="section">
      <div class="section-title">
        搜索参数{{ isGridAlgo(p.algo) ? '（体素栅格）' : '（高级算法采样口径）' }}
      </div>
      <NumberSlider label="水平栅格" v-model="p.cellSize" :min="10" :max="60" :step="5" unit="m" />
      <NumberSlider label="高度栅格" v-model="p.heightCell" :min="10" :max="50" :step="5" unit="m" />
      <NumberSlider v-if="isGridAlgo(p.algo)" label="最大步长" v-model="p.maxStep" :min="1" :max="3" />
      <NumberSlider label="启发权重" v-model="p.heuristicWeight" :min="0.5" :max="3" :step="0.1" :decimals="1" />
      <NumberSlider label="扩展上限" v-model="p.maxNodes" :min="20000" :max="500000" :step="20000" />
      <NumberSlider label="平滑迭代" v-model="p.smoothIterations" :min="0" :max="30" />
      <NumberSlider label="随机种子" v-model="adv.seed" :min="1" :max="999999" :step="1" />
    </div>

    <!-- 高级算法专属参数 -->
    <div class="section" v-if="p.algo === 'rrt' || p.algo === 'rrtstar'">
      <div class="section-title">RRT 参数</div>
      <NumberSlider label="最大节点" v-model="adv.rrtMaxNodes" :min="1000" :max="20000" :step="500" />
      <NumberSlider label="扩展步长" v-model="adv.rrtStep" :min="15" :max="80" :step="5" unit="m" />
      <NumberSlider v-if="p.algo === 'rrtstar'" label="近邻半径" v-model="adv.rrtStarRadius" :min="30" :max="200" :step="10" unit="m" />
      <NumberSlider label="目标偏置" v-model="adv.goalBias" :min="0" :max="0.5" :step="0.02" :decimals="2" />
    </div>

    <div class="section" v-if="p.algo === 'hybridastar'">
      <div class="section-title">Hybrid A* 参数</div>
      <NumberSlider label="航向离散" v-model="adv.headingDiscretization" :min="8" :max="32" :step="4" />
      <NumberSlider label="扩展步长" v-model="adv.hybridStep" :min="15" :max="60" :step="5" unit="m" />
    </div>

    <div class="section" v-if="p.algo === 'aco'">
      <div class="section-title">蚁群参数</div>
      <NumberSlider label="迭代次数" v-model="adv.acoIterations" :min="10" :max="100" :step="5" />
      <NumberSlider label="蚂蚁数量" v-model="adv.acoAnts" :min="8" :max="60" :step="2" />
      <NumberSlider label="信息素 α" v-model="adv.acoAlpha" :min="0" :max="4" :step="0.1" :decimals="1" />
      <NumberSlider label="启发 β" v-model="adv.acoBeta" :min="0" :max="8" :step="0.2" :decimals="1" />
      <NumberSlider label="挥发 ρ" v-model="adv.acoRho" :min="0.02" :max="0.6" :step="0.02" :decimals="2" />
    </div>

    <div class="section" v-if="p.algo === 'pso'">
      <div class="section-title">粒子群参数</div>
      <NumberSlider label="粒子数" v-model="adv.psoParticles" :min="10" :max="80" :step="2" />
      <NumberSlider label="迭代次数" v-model="adv.psoIterations" :min="10" :max="100" :step="5" />
      <NumberSlider label="惯性权重" v-model="adv.psoInertia" :min="0.2" :max="1.2" :step="0.05" :decimals="2" />
      <NumberSlider label="认知因子" v-model="adv.psoCognitive" :min="0.5" :max="3" :step="0.1" :decimals="1" />
      <NumberSlider label="社会因子" v-model="adv.psoSocial" :min="0.5" :max="3" :step="0.1" :decimals="1" />
    </div>

    <div class="section" v-if="p.algo === 'ga'">
      <div class="section-title">遗传算法参数</div>
      <NumberSlider label="种群规模" v-model="adv.gaPopulation" :min="12" :max="80" :step="2" />
      <NumberSlider label="迭代次数" v-model="adv.gaIterations" :min="10" :max="100" :step="5" />
      <NumberSlider label="变异概率" v-model="adv.gaMutation" :min="0" :max="0.5" :step="0.02" :decimals="2" />
    </div>

    <div class="section">
      <div class="section-title">动力学约束</div>
      <label class="checkbox" style="margin-bottom: 6px">
        <input type="checkbox" v-model="d.enabled" />
        启用动力学约束检查与自动修正
      </label>
      <NumberSlider label="最大转弯角" v-model="d.maxTurnAngle" :min="10" :max="90" unit="°" />
      <NumberSlider label="最大爬升角" v-model="d.maxClimbAngle" :min="5" :max="60" unit="°" />
      <NumberSlider label="最小步长" v-model="d.minStepLength" :min="0" :max="40" :step="2" unit="m" />
      <NumberSlider label="最小转弯半径" v-model="d.minTurnRadius" :min="10" :max="120" :step="5" unit="m" />
      <NumberSlider label="最大加速度" v-model="d.maxAccel" :min="2" :max="40" :step="1" unit="m/s²" />
      <NumberSlider label="姿态变化限" v-model="d.maxAttitudeChange" :min="20" :max="120" unit="°" />
    </div>

    <div class="section">
      <div class="section-title">在线重规划（动态对抗）</div>
      <label class="checkbox" style="margin-bottom: 6px">
        <input type="checkbox" v-model="rc.enabled" />
        播放时启用在线避障与局部重规划
      </label>
      <NumberSlider label="威胁裕度" v-model="rc.threatEnterDistance" :min="20" :max="160" :step="5" unit="m" />
      <NumberSlider label="碰撞预测窗" v-model="rc.collisionHorizon" :min="2" :max="15" :step="0.5" :decimals="1" unit="s" />
      <NumberSlider label="偏航阈值" v-model="rc.yawThreshold" :min="10" :max="80" unit="°" />
      <NumberSlider label="绕航倍率" v-model="rc.detourRatio" :min="1.2" :max="3" :step="0.1" :decimals="1" unit="×" />
      <NumberSlider label="最小间隔" v-model="rc.minInterval" :min="0.5" :max="10" :step="0.5" :decimals="1" unit="s" />
      <NumberSlider label="前瞻距离" v-model="rc.lookAhead" :min="40" :max="300" :step="10" unit="m" />
      <NumberSlider label="窗口半径" v-model="rc.windowRadius" :min="80" :max="400" :step="20" unit="m" />
      <label class="checkbox">
        <input type="checkbox" v-model="rc.predictObstacles" />
        动态障碍预测避让
      </label>
    </div>

    <div class="section">
      <div class="section-title">飞行约束</div>
      <NumberSlider label="安全距离" v-model="p.clearance" :min="0" :max="40" unit="m" />
      <NumberSlider label="巡航高度" v-model="p.cruiseAlt" :min="40" :max="300" unit="m" />
      <NumberSlider label="最小速度" v-model="p.speedMin" :min="5" :max="40" unit="m/s" />
      <NumberSlider label="最大速度" v-model="p.speedMax" :min="20" :max="120" unit="m/s" />
    </div>

    <div class="section">
      <div class="section-title">代价权重（实时影响航迹）</div>
      <NumberSlider label="航程代价" v-model="w.distance" :min="0" :max="10" :step="0.1" :decimals="1" />
      <NumberSlider label="威胁暴露" v-model="w.threat" :min="0" :max="100" :step="1" />
      <NumberSlider label="高度代价" v-model="w.altitude" :min="0" :max="40" :step="0.5" :decimals="1" />
      <NumberSlider label="禁飞惩罚" v-model="w.nofly" :min="0" :max="200" :step="2" />
      <NumberSlider label="平滑代价" v-model="w.smooth" :min="0" :max="2" :step="0.05" :decimals="2" />
      <div class="field-row" style="margin-top: 6px">
        <label class="checkbox">
          <input type="checkbox" v-model="sim.autoReplan" />
          参数/环境变更后自动重规划
        </label>
      </div>
    </div>

    <div class="section">
      <div class="section-title">可视化增强</div>
      <label class="checkbox"><input type="checkbox" v-model="sim.showPrediction" />移动障碍预测轨迹</label>
      <label class="checkbox"><input type="checkbox" v-model="sim.safetyColorMode" />安全裕度颜色映射（否则按威胁着色）</label>
      <label class="checkbox"><input type="checkbox" v-model="sim.trackingEnabled" />跟踪误差对比（参考/实际）</label>
      <label class="checkbox"><input type="checkbox" v-model="sim.showReplanWindow" />局部重规划窗口与候选航迹</label>
      <label class="checkbox"><input type="checkbox" v-model="sim.showThreatHeatmap" />地形威胁热力叠加</label>
    </div>

    <div class="section">
      <div class="section-title">地形参数</div>
      <NumberSlider label="地形尺寸" v-model="scene.terrain.size" :min="600" :max="1600" :step="200" unit="m" />
      <NumberSlider label="高程幅度" v-model="scene.terrain.heightScale" :min="40" :max="260" :step="10" unit="m" />
      <NumberSlider label="山脊强度" v-model="scene.terrain.ridgeScale" :min="0" :max="150" :step="5" unit="m" />
      <NumberSlider label="噪声密度" v-model="scene.terrain.noiseScale" :min="0.001" :max="0.005" :step="0.0001" :decimals="4" />
      <div class="field" style="grid-template-columns: 88px 1fr">
        <label>峡谷</label>
        <label class="checkbox">
          <input type="checkbox" v-model="scene.terrain.canyon" />
          生成蜿蜒峡谷
        </label>
      </div>
      <div class="field-row">
        <label>随机种子</label>
        <input type="number" v-model.number="scene.terrain.seed" />
        <button @click="scene.terrain.seed = Math.floor(Math.random() * 1e6)">🎲</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.checkbox {
  display: flex;
  gap: 6px;
  align-items: flex-start;
  color: var(--text-1);
  font-size: 12px;
  margin-bottom: 5px;
}
.algo-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 5px;
}
.algo-grid button {
  padding: 7px 2px;
  font-size: 11px;
}
</style>
