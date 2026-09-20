<script setup lang="ts">
import { computed, ref } from 'vue'
import { useSimStore } from '@/stores/sim'
import { useSceneStore } from '@/stores/scene'
import CostChart from './CostChart.vue'
import { ALGO_LABELS } from '@/core/planners'
import { environmentAt } from '@/core/dynamicEnv'
import { runPlanner } from '@/core/planners'
import { pathDistance } from '@/core/smoothing'
import { evaluatePath } from '@/core/cost'
import type { AlgoType, PlanCandidate } from '@/types'

const sim = useSimStore()
const scene = useSceneStore()
const s = computed(() => sim.stats)

const allAlgos: AlgoType[] = ['astar', 'dijkstra', 'rrt', 'rrtstar', 'hybridastar', 'aco', 'pso', 'ga']
const selectedAlgos = ref<AlgoType[]>(['astar', 'rrt', 'aco'])
const comparing = ref(false)
const compareResults = ref<PlanCandidate[]>([])

const costItems = computed(() => {
  const b = s.value?.costBreakdown
  const total =
    (b?.distance ?? 0) +
    (b?.threat ?? 0) +
    (b?.altitude ?? 0) +
    (b?.nofly ?? 0) +
    (b?.smooth ?? 0)
  return [
    { key: '航程', v: b?.distance ?? 0, color: '#3aa0ff', total },
    { key: '威胁', v: b?.threat ?? 0, color: '#ff5263', total },
    { key: '高度', v: b?.altitude ?? 0, color: '#ffb020', total },
    { key: '禁飞', v: b?.nofly ?? 0, color: '#b046ff', total },
    { key: '平滑', v: b?.smooth ?? 0, color: '#1abc9c', total }
  ]
})

const report = computed(() => sim.constraintReport)
const rawM = computed(() => sim.rawMetrics)
const smM = computed(() => sim.smoothMetrics)

const violationRows = computed(() => {
  const c = report.value?.counts
  if (!c) return []
  return [
    { key: '转弯角超限', v: c.turn },
    { key: '爬升角超限', v: c.climb },
    { key: '步长不足', v: c.step },
    { key: '转弯半径不足', v: c.radius },
    { key: '姿态变化超限', v: c.attitude },
    { key: '碰撞/净空侵入', v: c.collision }
  ].filter((r) => r.v > 0)
})

function toggleAlgo(a: AlgoType) {
  const i = selectedAlgos.value.indexOf(a)
  if (i >= 0) selectedAlgos.value.splice(i, 1)
  else if (selectedAlgos.value.length < 4) selectedAlgos.value.push(a)
}

/** 主线程同步对比（小规模演示）：对活动无人机首航段执行所选算法 */
async function runCompare() {
  comparing.value = true
  compareResults.value = []
  await new Promise((r) => setTimeout(r, 30))
  const wps = scene.activeWaypoints
  if (wps.length < 2) {
    comparing.value = false
    return
  }
  const env = environmentAt(
    {
      terrain: scene.terrain,
      threats: scene.threats,
      noflyZones: scene.noflyZones,
      obstacles: scene.obstacles,
      dynamics: scene.dynamics
    },
    0
  )
  const start = wps[0].position
  const goal = wps[wps.length - 1].position
  const out: PlanCandidate[] = []
  for (const algo of selectedAlgos.value) {
    const t0 = performance.now()
    const r = runPlanner(env, start, goal, { ...scene.planParams, algo }, scene.weights)
    const ms = performance.now() - t0
    out.push({
      label: ALGO_LABELS[algo],
      algo,
      path: r.success ? r.path : [],
      success: r.success,
      distance: r.success ? pathDistance(r.path) : 0,
      totalCost: r.success
        ? evaluatePath(env, r.path, scene.weights, { ...scene.planParams, algo }).total
        : Infinity,
      planTimeMs: Math.round(ms)
    })
  }
  compareResults.value = out
  comparing.value = false
}

function fmt(n: number | undefined, digits = 1) {
  return n === undefined ? '—' : n.toFixed(digits)
}
</script>

<template>
  <div>
    <div class="section">
      <div class="section-title">仿真评估（{{ scene.activeUav?.name }}）</div>
      <div class="stat-grid">
        <div class="stat-card">
          <div class="k">总航程 (m)</div>
          <div class="v">{{ s ? s.distance.toFixed(0) : '—' }}</div>
        </div>
        <div class="stat-card">
          <div class="k">规划耗时 (ms)</div>
          <div class="v">{{ s ? s.planTimeMs.toFixed(1) : '—' }}</div>
        </div>
        <div class="stat-card">
          <div class="k">威胁暴露量</div>
          <div class="v">{{ s ? s.threatExposure.toFixed(1) : '—' }}</div>
        </div>
        <div class="stat-card">
          <div class="k">暴露时间 (s)</div>
          <div class="v">{{ s ? s.exposureTime.toFixed(1) : '—' }}</div>
        </div>
        <div class="stat-card">
          <div class="k">扩展节点</div>
          <div class="v">{{ s ? s.expandedNodes : '—' }}</div>
        </div>
        <div class="stat-card">
          <div class="k">避障成功率</div>
          <div class="v" :style="{ color: (s?.obstacleAvoidanceRate ?? 100) >= 100 ? 'var(--ok)' : 'var(--danger)' }">
            {{ s ? s.obstacleAvoidanceRate + '%' : '—' }}
          </div>
        </div>
        <div class="stat-card">
          <div class="k">规划算法</div>
          <div class="v" style="font-size: 13px">{{ s?.algo ? ALGO_LABELS[s.algo] : '—' }}</div>
        </div>
        <div class="stat-card">
          <div class="k">约束满足率</div>
          <div class="v" :style="{ color: (s?.constraintRate ?? 100) >= 99 ? 'var(--ok)' : 'var(--warn)' }">
            {{ s ? s.constraintRate + '%' : '—' }}
          </div>
        </div>
        <div class="stat-card" style="grid-column: 1 / -1">
          <div class="k">总加权代价（{{ s?.success ? '可行航迹' : '规划失败' }}）</div>
          <div class="v">{{ s ? s.totalCost.toFixed(1) : '—' }}</div>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">动力学约束统计</div>
      <div v-if="!report" class="sub">完成规划后显示约束检查结果</div>
      <div v-else-if="violationRows.length === 0" class="sub ok">✓ 全部航段满足动力学约束</div>
      <div v-else class="vio-list">
        <div v-for="r in violationRows" :key="r.key" class="vio-row">
          <span>{{ r.key }}</span>
          <span class="vio-n">{{ r.v }}</span>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">平滑前后指标对比</div>
      <table class="metrics">
        <thead>
          <tr><th>指标</th><th>原始</th><th>平滑后</th></tr>
        </thead>
        <tbody>
          <tr><td>航程 (m)</td><td>{{ fmt(rawM?.length, 0) }}</td><td>{{ fmt(smM?.length, 0) }}</td></tr>
          <tr><td>最大曲率 (1/m)</td><td>{{ fmt(rawM?.maxCurvature, 4) }}</td><td>{{ fmt(smM?.maxCurvature, 4) }}</td></tr>
          <tr><td>平均曲率 (1/m)</td><td>{{ fmt(rawM?.avgCurvature, 4) }}</td><td>{{ fmt(smM?.avgCurvature, 4) }}</td></tr>
          <tr><td>最大转角 (°)</td><td>{{ fmt(rawM?.maxTurnAngle, 1) }}</td><td>{{ fmt(smM?.maxTurnAngle, 1) }}</td></tr>
          <tr><td>最大加速度 (m/s²)</td><td>{{ fmt(rawM?.maxAccel, 2) }}</td><td>{{ fmt(smM?.maxAccel, 2) }}</td></tr>
          <tr><td>最大抖动 (m/s³)</td><td>{{ fmt(rawM?.maxJerk, 2) }}</td><td>{{ fmt(smM?.maxJerk, 2) }}</td></tr>
          <tr><td>平均速度 (m/s)</td><td>{{ fmt(rawM?.avgSpeed, 1) }}</td><td>{{ fmt(smM?.avgSpeed, 1) }}</td></tr>
        </tbody>
      </table>
    </div>

    <div class="section" v-if="sim.trackingStats">
      <div class="section-title">轨迹跟踪误差（参考 vs 实际）</div>
      <div class="stat-grid">
        <div class="stat-card"><div class="k">平均位置误差 (m)</div><div class="v">{{ sim.trackingStats.meanError.toFixed(2) }}</div></div>
        <div class="stat-card"><div class="k">最大位置误差 (m)</div><div class="v">{{ sim.trackingStats.maxError.toFixed(2) }}</div></div>
        <div class="stat-card"><div class="k">平均航向误差 (°)</div><div class="v">{{ sim.trackingStats.meanHeadingError.toFixed(1) }}</div></div>
        <div class="stat-card"><div class="k">样本数</div><div class="v">{{ sim.trackingStats.samples }}</div></div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">规划策略对比（首航段，最多选 4 个）</div>
      <div class="algo-pick">
        <button
          v-for="a in allAlgos"
          :key="a"
          :class="{ active: selectedAlgos.includes(a) }"
          @click="toggleAlgo(a)"
        >{{ ALGO_LABELS[a] }}</button>
      </div>
      <button class="primary" style="width: 100%; margin-top: 6px" :disabled="comparing || selectedAlgos.length === 0" @click="runCompare">
        {{ comparing ? '对比计算中…' : '运行策略对比' }}
      </button>
      <table v-if="compareResults.length" class="metrics" style="margin-top: 8px">
        <thead>
          <tr><th>算法</th><th>航程</th><th>代价</th><th>耗时</th></tr>
        </thead>
        <tbody>
          <tr v-for="c in compareResults" :key="c.algo">
            <td>{{ c.label }}</td>
            <td :class="{ fail: !c.success }">{{ c.success ? c.distance.toFixed(0) : '失败' }}</td>
            <td>{{ c.success ? c.totalCost.toFixed(0) : '—' }}</td>
            <td>{{ c.planTimeMs }} ms</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="section">
      <div class="section-title">在线重规划事件（{{ sim.replanEvents.length }}）</div>
      <div v-if="sim.replanEvents.length === 0" class="sub">
        开启「在线重规划」并播放后，遇到移动障碍/突发威胁将在此记录
      </div>
      <div v-else class="replan-list">
        <div v-for="(e, i) in sim.replanEvents" :key="i" class="replan-row">
          <div class="rr-head">
            <span class="rr-time">t={{ e.time.toFixed(1) }}s</span>
            <span class="rr-reason">{{ e.reasonLabel }}</span>
          </div>
          <div class="rr-cost">
            代价 {{ e.costBefore.toFixed(0) }} →
            <b :style="{ color: e.costAfter < e.costBefore ? 'var(--ok)' : 'var(--warn)' }">{{ e.costAfter.toFixed(0) }}</b>
            · {{ e.planTimeMs.toFixed(0) }} ms
          </div>
        </div>
      </div>
      <button v-if="sim.replanEvents.length" style="width: 100%; margin-top: 6px" @click="sim.clearReplanEvents()">清空事件</button>
    </div>

    <div class="section">
      <div class="section-title">代价分量</div>
      <div class="cost-bars">
        <div v-for="c in costItems" :key="c.key" class="bar-row">
          <span style="color: var(--text-1)">{{ c.key }}</span>
          <div class="bar-track">
            <div
              class="bar-fill"
              :style="{
                width: c.total > 0 ? Math.max(2, (c.v / c.total) * 100) + '%' : '0%',
                background: c.color
              }"
            ></div>
          </div>
          <span style="text-align: right; font-variant-numeric: tabular-nums">
            {{ c.v.toFixed(1) }}
          </span>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-title">累积代价曲线</div>
      <CostChart :curve="sim.costCurve" />
    </div>
  </div>
</template>

<style scoped>
.sub { color: var(--text-2); font-size: 11px; }
.sub.ok { color: var(--ok); }
.metrics {
  width: 100%;
  border-collapse: collapse;
  font-size: 11px;
}
.metrics th,
.metrics td {
  border: 1px solid var(--line);
  padding: 4px 6px;
  text-align: right;
  font-variant-numeric: tabular-nums;
}
.metrics th:first-child,
.metrics td:first-child {
  text-align: left;
  color: var(--text-1);
}
.metrics .fail {
  color: var(--danger);
}
.vio-list {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.vio-row {
  display: flex;
  justify-content: space-between;
  background: var(--bg-2);
  border: 1px solid var(--line);
  border-radius: 5px;
  padding: 4px 8px;
  font-size: 11px;
}
.vio-n {
  color: var(--danger);
  font-weight: 700;
}
.algo-pick {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4px;
}
.algo-pick button {
  padding: 5px 2px;
  font-size: 10px;
}
.replan-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
  max-height: 200px;
  overflow-y: auto;
}
.replan-row {
  background: var(--bg-2);
  border: 1px solid #7a2c38;
  border-radius: 5px;
  padding: 5px 8px;
  font-size: 11px;
}
.rr-head {
  display: flex;
  justify-content: space-between;
  gap: 8px;
}
.rr-time { color: var(--text-2); }
.rr-reason { color: var(--danger); }
.rr-cost {
  color: var(--text-1);
  margin-top: 2px;
}
</style>
