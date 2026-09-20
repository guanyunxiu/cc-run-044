<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { SceneRenderer } from '@/three/SceneRenderer'
import { useSceneStore } from '@/stores/scene'
import { useSimStore } from '@/stores/sim'

const scene = useSceneStore()
const sim = useSimStore()
const containerRef = ref<HTMLDivElement | null>(null)
let renderer: SceneRenderer | null = null

onMounted(() => {
  renderer = new SceneRenderer(containerRef.value!, scene, sim)

  // 区域/建筑：ID 集合或任意属性变化 -> 全量同步（数量少，重建成本可忽略）
  watch(
    () => JSON.stringify([scene.threats, scene.noflyZones, scene.obstacles]),
    () => renderer?.syncZones()
  )

  // 动态实体集合变化 -> 重建动态网格
  watch(
    () => scene.dynamics.map((d) => d.id).join(','),
    () => renderer?.syncDynamics()
  )
  watch(
    () => JSON.stringify(scene.dynamics),
    () => renderer?.syncDynamics(),
    { deep: false }
  )

  // 航点：ID 集合变化时重建标记
  watch(
    () => scene.waypoints.map((w) => w.id).join(','),
    () => renderer?.syncWaypoints()
  )

  // 无人机集合变化 -> 同步模型/航迹
  watch(
    () => scene.uavs.map((u) => u.id).join(','),
    () => {
      renderer?.syncDrones()
      renderer?.syncPaths()
    }
  )

  // 地形参数变化 -> 重建地形网格
  watch(
    () => scene.terrainVersion,
    () => renderer?.rebuildTerrain()
  )

  // 航点位置变化（拖拽/滑块）-> 只更新位置，避免重建文字精灵
  watch(
    () =>
      scene.waypoints
        .map((w) => [w.position.x, w.position.y, w.position.z].join(','))
        .join('|'),
    () => {
      for (const wp of scene.waypoints) {
        const marker = renderer?.findWaypointObject(wp.id)
        marker?.position.set(wp.position.x, wp.position.y, wp.position.z)
      }
    }
  )

  // 规划结果（任一机）变化 -> 重绘全部航迹
  watch(
    () => [
      ...Object.values(sim.uavStates).map((u) => u.smoothPath.length),
      sim.trackingEnabled,
      sim.safetyColorMode,
      scene.activeUavId
    ].join('|'),
    () => renderer?.syncPaths()
  )
  watch(
    () => sim.showThreatHeatmap,
    () => renderer?.applyHeatmap()
  )
  watch(
    () => sim.cameraMode,
    (m) => renderer?.setCameraMode(m)
  )
  watch(
    () => sim.showPrediction,
    () => renderer?.syncDynamics()
  )

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') scene.setEditMode('select')
    if (e.key === 'Delete' || e.key === 'Backspace') {
      if (document.activeElement?.tagName !== 'INPUT') scene.removeSelected()
    }
    if (e.key === ' ') {
      e.preventDefault()
      sim.togglePlay()
    }
  }
  window.addEventListener('keydown', onKey)
  onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
})

onBeforeUnmount(() => {
  renderer?.dispose()
  renderer = null
})

const hintText = () => {
  switch (scene.editMode) {
    case 'add-threat':
      return '点击地形放置雷达威胁区（放置后在右侧面板修改类型与参数）'
    case 'add-nofly':
      return '点击地形放置禁飞区'
    case 'add-obstacle':
      return '点击地形放置建筑障碍'
    case 'add-dynamic':
      return '点击地形放置移动障碍（默认巡逻运动，可在面板改为突发威胁/拦截）'
    case 'add-waypoint':
      return `点击地形添加 ${scene.activeUav?.name ?? ''} 的途经航点（自动设置安全高度）`
    default:
      return '左键旋转 · 右键平移 · 滚轮缩放 · 拖拽要素编辑 · Delete 删除选中'
  }
}
</script>

<template>
  <div ref="containerRef" class="viewport">
    <div class="hint">{{ hintText() }}</div>
    <div class="status-chip">
      <span
        class="dot"
        :class="{
          green: sim.status === 'done' && sim.stats?.success,
          red: sim.status === 'failed',
          yellow: sim.status === 'planning',
          gray: sim.status === 'idle'
        }"
      ></span>
      <span>{{ sim.message }}</span>
      <span v-if="sim.dirty && sim.status !== 'planning'" style="color: var(--warn)">
        ●参数已变更
      </span>
      <span v-if="sim.replanEvents.length" style="color: var(--danger)">
        ⚠ 在线重规划 ×{{ sim.replanEvents.reduce((n, e) => n + 1, 0) }}
      </span>
    </div>
    <div class="replan-toast" v-if="sim.lastReplanEvent">
      <div class="rt-title">⚠ 在线重规划（{{ sim.lastReplanEvent.time.toFixed(1) }}s）</div>
      <div>{{ sim.lastReplanEvent.reasonLabel }}</div>
      <div>
        代价 {{ sim.lastReplanEvent.costBefore.toFixed(0) }} →
        <b :style="{ color: sim.lastReplanEvent.costAfter < sim.lastReplanEvent.costBefore ? 'var(--ok)' : 'var(--warn)' }">
          {{ sim.lastReplanEvent.costAfter.toFixed(0) }}
        </b>
        · {{ sim.lastReplanEvent.planTimeMs.toFixed(0) }} ms
      </div>
    </div>
    <div class="legend">
      <div><i style="background:#22a7ff"></i>雷达区</div>
      <div><i style="background:#ff3b30"></i>防空区</div>
      <div><i style="background:#b046ff"></i>干扰区</div>
      <div><i style="background:#ff2d55"></i>禁飞区</div>
      <div><i style="background:#ff8c1a"></i>移动障碍（黄虚线为预测）</div>
      <div><i style="background:#2ecc71"></i>起点 / <i style="background:#e74c3c"></i>终点 / <i style="background:#f1c40f"></i>途经</div>
    </div>
  </div>
</template>

<style scoped>
.replan-toast {
  position: absolute;
  top: 48px;
  right: 12px;
  background: rgba(20, 12, 18, 0.88);
  border: 1px solid #7a2c38;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 11px;
  color: var(--text-1);
  z-index: 6;
  line-height: 1.6;
  pointer-events: none;
  max-width: 280px;
}
.rt-title {
  color: var(--danger);
  font-weight: 700;
  margin-bottom: 2px;
}
</style>
