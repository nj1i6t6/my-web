<template>
  <div 
    class="blueprint-skeleton" 
    :style="{ 
      width: width || '100%', 
      height: height || '200px',
      minHeight: minHeight || 'auto'
    }"
  >
    <!-- Blueprint 網格背景層 -->
    <div class="absolute inset-0 blueprint-bg opacity-50"></div>
    
    <!-- 可選：顯示載入提示 -->
    <div 
      v-if="showLabel" 
      class="absolute inset-0 flex items-center justify-center"
    >
      <span class="tech-data text-sm text-white/40">
        載入中...
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * BlueprintSkeleton - Blueprint 風格骨架屏組件
 * 
 * 特色：
 * 1. CAD 工程網格背景
 * 2. Shimmer 載入動畫
 * 3. 支援 prefers-reduced-motion
 * 4. 靈活尺寸配置
 */

interface Props {
  /** 寬度（支援 CSS 單位：px, %, rem 等） */
  width?: string
  /** 高度（支援 CSS 單位：px, %, rem 等） */
  height?: string
  /** 最小高度 */
  minHeight?: string
  /** 是否顯示載入文字 */
  showLabel?: boolean
}

withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '200px',
  minHeight: 'auto',
  showLabel: false
})
</script>

<style scoped>
/* 組件內部樣式由 blueprint-grid.css 提供 */
</style>
