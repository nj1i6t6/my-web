<template>
  <section id="home" class="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-16">
    <div class="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
      <!-- 左側：個人簡介 -->
      <div>
        <p class="text-sm uppercase tracking-[0.35em] text-white/60">你好，我是</p>
        <h1 class="mt-4 text-4xl font-semibold text-white md:text-5xl">
          Simon Su 
          <span class="block text-2xl text-white/70">蘇柏誠</span>
        </h1>
        <p class="mt-6 text-lg text-white/70">
          從機械工程到 AI 開發，用技術為傳統產業注入創新能量。
        </p>
        
        <!-- CTA 按鈕 -->
        <div class="mt-8 flex flex-wrap gap-4">
          <a
            href="#contact"
            class="inline-flex items-center gap-2 rounded-full bg-neon-green/20 px-6 py-3 text-sm font-semibold text-neon-green shadow-neon-green transition hover:bg-neon-green/30"
          >
            <i class="fas fa-paper-plane"></i>
            聯繫我
          </a>
          <a
            href="#projects"
            class="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-neon-green hover:text-neon-green"
          >
            <i class="fas fa-folder-open"></i>
            查看作品
          </a>
        </div>
        
        <!-- 社交媒體連結 -->
        <div class="mt-10 flex flex-wrap items-center gap-4 text-white/70">
          <a 
            v-for="social in socialLinks" 
            :key="social.url"
            :href="social.url" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="transition hover:text-neon-green" 
            :aria-label="social.label"
          >
            <i :class="social.icon" class="text-lg"></i>
          </a>
        </div>
      </div>
      
      <!-- 右側：儀表板監控系統 -->
      <div class="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl shadow-black/50">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm uppercase tracking-[0.35em] text-white/60">即時監控</p>
            <h2 class="mt-2 text-xl font-semibold text-white">車輛狀態儀表板</h2>
          </div>
          <div class="flex items-center gap-2">
            <span class="relative flex h-3 w-3">
              <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
            </span>
            <span class="text-xs text-emerald-400">運行中</span>
          </div>
        </div>
        
        <!-- GaugeButton 組件 -->
        <div
          ref="dashboardRef"
          class="mt-6 grid grid-cols-5 gap-3"
          aria-label="汽車儀表板狀態監控區塊"
        >
          <button
            v-for="gauge in gaugeStates"
            :key="gauge.key"
            class="gauge-btn group relative flex flex-col items-center gap-2"
            type="button"
            :aria-label="gauge.aria"
            @click="showGaugeDetail(gauge)"
          >
            <!-- 狀態指示環 -->
            <span
              :class="[
                'gauge-circle relative flex h-16 w-16 items-center justify-center rounded-full bg-steel-950 ring-2 shadow-lg shadow-black/40 transition-all duration-300 ease-out',
                gauge.ringClass,
                'group-hover:brightness-125 group-hover:scale-105',
                gauge.status === 'warning' && 'animate-pulse',
              ]"
            >
              <i :class="gauge.icon" class="text-2xl"></i>
              
              <!-- 狀態小點 -->
              <span 
                :class="[
                  'absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-slate-900',
                  gauge.status === 'normal' ? 'bg-emerald-500' : 
                  gauge.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                ]"
              ></span>
            </span>
            
            <!-- 標籤與數值 -->
            <div class="text-center">
              <span class="block text-xs text-white/60 transition group-hover:text-white">{{ gauge.label }}</span>
              <span 
                :class="[
                  'block text-xs font-mono font-semibold',
                  gauge.status === 'normal' ? 'text-emerald-400' : 
                  gauge.status === 'warning' ? 'text-amber-400' : 'text-red-400'
                ]"
              >
                {{ gauge.displayValue }}
              </span>
            </div>
          </button>
        </div>
        
        <!-- 詳細資訊浮窗 -->
        <Transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-2"
        >
          <div 
            v-if="selectedGauge" 
            class="mt-4 rounded-xl border border-white/10 bg-slate-800/80 p-4 backdrop-blur"
          >
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-3">
                <span :class="['flex h-10 w-10 items-center justify-center rounded-full', selectedGauge.ringClass.replace('ring-', 'bg-').replace('/50', '/20')]">
                  <i :class="selectedGauge.icon" class="text-lg"></i>
                </span>
                <div>
                  <h3 class="font-semibold text-white">{{ selectedGauge.label }}狀態</h3>
                  <p :class="[
                    'text-sm font-medium',
                    selectedGauge.status === 'normal' ? 'text-emerald-400' : 
                    selectedGauge.status === 'warning' ? 'text-amber-400' : 'text-red-400'
                  ]">
                    {{ selectedGauge.statusText }}
                  </p>
                </div>
              </div>
              <button 
                class="text-white/40 transition hover:text-white"
                @click="selectedGauge = null"
                aria-label="關閉詳細資訊"
              >
                <i class="fas fa-times"></i>
              </button>
            </div>
            
            <!-- 詳細數據 -->
            <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div class="rounded-lg bg-slate-900/50 p-3">
                <p class="text-white/50">當前數值</p>
                <p class="mt-1 font-mono text-lg font-bold text-white">{{ selectedGauge.value }}{{ selectedGauge.unit }}</p>
              </div>
              <div class="rounded-lg bg-slate-900/50 p-3">
                <p class="text-white/50">正常範圍</p>
                <p class="mt-1 font-mono text-lg font-bold text-white/80">{{ selectedGauge.normalRange }}</p>
              </div>
            </div>
            
            <!-- 建議操作 -->
            <div 
              v-if="selectedGauge.recommendation"
              :class="[
                'mt-3 rounded-lg p-3 text-sm',
                selectedGauge.status === 'normal' ? 'bg-emerald-500/10 text-emerald-300' : 
                selectedGauge.status === 'warning' ? 'bg-amber-500/10 text-amber-300' : 'bg-red-500/10 text-red-300'
              ]"
            >
              <i class="fas fa-lightbulb mr-2"></i>
              {{ selectedGauge.recommendation }}
            </div>
          </div>
        </Transition>
        
        <!-- 底部說明 -->
        <p class="mt-4 text-center text-xs text-white/40">
          <i class="fas fa-info-circle mr-1"></i>
          點擊各儀表查看詳細狀態 · 數據每 3 秒自動更新
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

interface GaugeState {
  key: string
  icon: string
  label: string
  ringClass: string
  aria: string
  status: 'normal' | 'warning' | 'critical'
  statusText: string
  value: number
  displayValue: string
  unit: string
  normalRange: string
  recommendation: string
}

const dashboardRef = ref<HTMLElement | null>(null)
const selectedGauge = ref<GaugeState | null>(null)
let updateInterval: ReturnType<typeof setInterval> | null = null

const socialLinks = [
  { url: 'https://github.com/nj1i6t6', icon: 'fab fa-github', label: 'GitHub - 個人首頁' },
  { url: 'https://www.linkedin.com/in/柏誠-蘇-066816375', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
  { url: 'https://x.com/Sucheng0913', icon: 'fab fa-x-twitter', label: 'X' },
  { url: 'https://www.instagram.com/nj_1i6t_6', icon: 'fab fa-instagram', label: 'Instagram' },
  { url: 'mailto:bochengsu@gmail.com', icon: 'fas fa-envelope', label: 'Email' }
]

// 儀表板狀態數據 - 模擬真實車輛監控系統
const gaugeStates = ref<GaugeState[]>([
  { 
    key: 'oil', 
    icon: 'fas fa-oil-can', 
    label: '機油', 
    ringClass: 'ring-amber-500/50 text-amber-400', 
    aria: '機油狀態按鈕',
    status: 'normal',
    statusText: '油量充足',
    value: 85,
    displayValue: '85%',
    unit: '%',
    normalRange: '50-100%',
    recommendation: '機油狀態良好，下次保養里程：5,000 km'
  },
  { 
    key: 'engine', 
    icon: 'fas fa-gauge-high', 
    label: '引擎', 
    ringClass: 'ring-red-500/50 text-red-400', 
    aria: '引擎狀態按鈕',
    status: 'normal',
    statusText: '運轉正常',
    value: 2400,
    displayValue: '2.4k',
    unit: ' RPM',
    normalRange: '800-6000',
    recommendation: '引擎運轉平穩，各項指標正常'
  },
  { 
    key: 'battery', 
    icon: 'fas fa-car-battery', 
    label: '電池', 
    ringClass: 'ring-emerald-500/50 text-emerald-400', 
    aria: '電池狀態按鈕',
    status: 'normal',
    statusText: '電壓正常',
    value: 12.6,
    displayValue: '12.6V',
    unit: 'V',
    normalRange: '12.4-14.7V',
    recommendation: '電池健康度 92%，預估壽命還有 18 個月'
  },
  { 
    key: 'temp', 
    icon: 'fas fa-temperature-half', 
    label: '溫度', 
    ringClass: 'ring-blue-500/50 text-blue-400', 
    aria: '溫度狀態按鈕',
    status: 'normal',
    statusText: '溫度適中',
    value: 92,
    displayValue: '92°C',
    unit: '°C',
    normalRange: '85-105°C',
    recommendation: '引擎溫度在最佳工作範圍內'
  },
  { 
    key: 'brake', 
    icon: 'fas fa-compact-disc', 
    label: '煞車', 
    ringClass: 'ring-orange-500/50 text-orange-400', 
    aria: '煞車狀態按鈕',
    status: 'normal',
    statusText: '煞車正常',
    value: 78,
    displayValue: '78%',
    unit: '%',
    normalRange: '30-100%',
    recommendation: '煞車片厚度足夠，預估可行駛 15,000 km'
  },
  { 
    key: 'tire', 
    icon: 'fas fa-circle-dot', 
    label: '胎壓', 
    ringClass: 'ring-yellow-500/50 text-yellow-400', 
    aria: '胎壓狀態按鈕',
    status: 'normal',
    statusText: '壓力正常',
    value: 32,
    displayValue: '32psi',
    unit: ' psi',
    normalRange: '30-35 psi',
    recommendation: '四輪胎壓均衡，建議每月檢查一次'
  },
  { 
    key: 'abs', 
    icon: 'fas fa-car', 
    label: 'ABS', 
    ringClass: 'ring-purple-500/50 text-purple-400', 
    aria: 'ABS狀態按鈕',
    status: 'normal',
    statusText: '系統就緒',
    value: 1,
    displayValue: 'ON',
    unit: '',
    normalRange: '啟用中',
    recommendation: 'ABS 防鎖死煞車系統運作正常'
  },
  { 
    key: 'airbag', 
    icon: 'fas fa-shield-halved', 
    label: '氣囊', 
    ringClass: 'ring-pink-500/50 text-pink-400', 
    aria: '氣囊狀態按鈕',
    status: 'normal',
    statusText: '待命中',
    value: 1,
    displayValue: 'OK',
    unit: '',
    normalRange: '正常待命',
    recommendation: '所有氣囊感測器正常，安全系統就緒'
  },
  { 
    key: 'seatbelt', 
    icon: 'fas fa-user-shield', 
    label: '安全帶', 
    ringClass: 'ring-cyan-500/50 text-cyan-400', 
    aria: '安全帶狀態按鈕',
    status: 'normal',
    statusText: '已扣上',
    value: 1,
    displayValue: '✓',
    unit: '',
    normalRange: '已繫好',
    recommendation: '駕駛座安全帶已正確繫好'
  },
  { 
    key: 'light', 
    icon: 'fas fa-lightbulb', 
    label: '燈光', 
    ringClass: 'ring-lime-500/50 text-lime-400', 
    aria: '燈光狀態按鈕',
    status: 'normal',
    statusText: '自動模式',
    value: 1,
    displayValue: 'AUTO',
    unit: '',
    normalRange: '自動/手動',
    recommendation: '燈光系統自動模式，會根據環境光線調整'
  }
])

// 顯示儀表詳細資訊
const showGaugeDetail = (gauge: GaugeState) => {
  // 點擊動畫
  const btn = dashboardRef.value?.querySelector(`[aria-label="${gauge.aria}"]`)
  if (btn) {
    const circle = btn.querySelector('.gauge-circle')
    if (circle) {
      gsap.to(circle, {
        rotation: '+=360',
        duration: 0.6,
        ease: 'power2.out'
      })
    }
  }
  
  selectedGauge.value = gauge
}

// 模擬即時數據更新
const updateGaugeData = () => {
  gaugeStates.value = gaugeStates.value.map(gauge => {
    let newValue = gauge.value
    let newStatus: 'normal' | 'warning' | 'critical' = 'normal'
    let newStatusText = gauge.statusText
    let newDisplayValue = gauge.displayValue
    let newRecommendation = gauge.recommendation
    
    // 根據不同儀表類型模擬數據變化
    switch (gauge.key) {
      case 'oil':
        newValue = Math.max(50, Math.min(100, gauge.value + (Math.random() - 0.5) * 2))
        newDisplayValue = `${Math.round(newValue)}%`
        break
      case 'engine':
        newValue = Math.max(800, Math.min(3500, gauge.value + (Math.random() - 0.5) * 200))
        newDisplayValue = newValue >= 1000 ? `${(newValue / 1000).toFixed(1)}k` : `${Math.round(newValue)}`
        break
      case 'battery':
        newValue = Math.max(12.0, Math.min(14.5, gauge.value + (Math.random() - 0.5) * 0.2))
        newDisplayValue = `${newValue.toFixed(1)}V`
        if (newValue < 12.2) {
          newStatus = 'warning'
          newStatusText = '電壓偏低'
          newRecommendation = '⚠️ 建議檢查電池，可能需要充電或更換'
        }
        break
      case 'temp':
        newValue = Math.max(85, Math.min(110, gauge.value + (Math.random() - 0.5) * 3))
        newDisplayValue = `${Math.round(newValue)}°C`
        if (newValue > 105) {
          newStatus = 'warning'
          newStatusText = '溫度偏高'
          newRecommendation = '⚠️ 引擎溫度升高，建議檢查冷卻液'
        }
        break
      case 'tire':
        newValue = Math.max(28, Math.min(36, gauge.value + (Math.random() - 0.5) * 0.5))
        newDisplayValue = `${Math.round(newValue)}psi`
        if (newValue < 30) {
          newStatus = 'warning'
          newStatusText = '壓力偏低'
          newRecommendation = '⚠️ 胎壓不足，建議盡快補氣'
        }
        break
    }
    
    return {
      ...gauge,
      value: newValue,
      displayValue: newDisplayValue,
      status: newStatus,
      statusText: newStatusText,
      recommendation: newRecommendation
    }
  })
  
  // 同步更新選中的儀表
  if (selectedGauge.value) {
    const updated = gaugeStates.value.find(g => g.key === selectedGauge.value?.key)
    if (updated) {
      selectedGauge.value = updated
    }
  }
}

onMounted(() => {
  if (!dashboardRef.value) return
  
  const buttons = dashboardRef.value.querySelectorAll('.gauge-btn')
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  if (prefersReducedMotion) {
    gsap.set(buttons, { scale: 1, opacity: 1 })
  } else {
    gsap.from(buttons, {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'back.out(1.7)',
    })
  }
  
  // 啟動即時數據更新（每 3 秒）
  updateInterval = setInterval(updateGaugeData, 3000)
})

onUnmounted(() => {
  if (updateInterval) {
    clearInterval(updateInterval)
  }
})
</script>

<style scoped>
.shadow-neon-green {
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
}

.bg-steel-950 {
  background-color: #0f1419;
}

.gauge-btn:focus-visible {
  outline: 2px solid #00ff88;
  outline-offset: 4px;
  border-radius: 0.5rem;
}
</style>
