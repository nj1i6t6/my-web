<template>
  <button
    class="gauge-btn group flex flex-col items-center gap-3"
    type="button"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <span
      ref="circleRef"
      :class="[
        'gauge-circle flex h-20 w-20 items-center justify-center rounded-full bg-steel-950 ring-2 shadow-lg shadow-black/40 transition duration-300 ease-out',
        ringClass,
        'group-hover:brightness-125',
      ]"
    >
      <i :class="icon" class="text-3xl"></i>
    </span>
    <span class="text-xs text-white/60 transition group-hover:text-white">
      {{ label }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { gsap } from 'gsap'

interface Props {
  /** 圖標類名（Font Awesome） */
  icon: string
  /** 按鈕標籤文字 */
  label: string
  /** Ring 顏色類別 */
  ringClass: string
  /** 無障礙標籤 */
  ariaLabel: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  click: []
}>()

const circleRef = ref<HTMLElement | null>(null)

// 點擊事件：360度旋轉動畫
const handleClick = () => {
  if (circleRef.value) {
    gsap.to(circleRef.value, {
      rotation: '+=360',
      duration: 0.6,
      ease: 'power2.out'
    })
  }
  emit('click')
}
</script>

<style scoped>
/* GaugeButton 特定樣式 */
.bg-steel-950 {
  background-color: #0f1419;
}

.gauge-btn:active .gauge-circle {
  transform: scale(0.95);
}

/* 無障礙：支援鍵盤焦點 */
.gauge-btn:focus-visible {
  outline: 2px solid #00ff88;
  outline-offset: 4px;
  border-radius: 0.5rem;
}
</style>
