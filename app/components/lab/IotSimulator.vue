<template>
  <div class="rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-2xl">
    <div class="mb-6">
      <h3 class="text-2xl font-semibold text-white">智慧農業決策模擬器</h3>
      <p class="mt-2 text-sm text-white/60">即時環境監測與 AI 建議系統</p>
    </div>
    
    <!-- 環境參數控制 -->
    <div class="space-y-6">
      <!-- 溫度控制 -->
      <div>
        <label class="flex items-center justify-between text-white/80">
          <span class="flex items-center gap-2">
            <span>🌡️</span>
            <span>溫度</span>
          </span>
          <span class="tech-data text-2xl font-bold text-neon-green">{{ temperature }}°C</span>
        </label>
        <input 
          v-model.number="temperature" 
          type="range" 
          min="0" 
          max="50" 
          step="1"
          class="range-accent mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700"
        />
        <div class="mt-1 flex justify-between text-xs text-white/40">
          <span>0°C</span>
          <span>50°C</span>
        </div>
      </div>
      
      <!-- 濕度控制 -->
      <div>
        <label class="flex items-center justify-between text-white/80">
          <span class="flex items-center gap-2">
            <span>💧</span>
            <span>濕度</span>
          </span>
          <span class="tech-data text-2xl font-bold text-neon-green">{{ humidity }}%</span>
        </label>
        <input 
          v-model.number="humidity" 
          type="range" 
          min="0" 
          max="100" 
          step="1"
          class="range-accent mt-3 h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-700"
        />
        <div class="mt-1 flex justify-between text-xs text-white/40">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
    
    <!-- AI 建議輸出 -->
    <div 
      class="mt-8 rounded-2xl border-2 p-6 transition-all duration-300"
      :class="suggestionClass"
    >
      <h4 class="flex items-center gap-2 text-lg font-semibold text-white">
        <span class="text-2xl">{{ suggestionIcon }}</span>
        <span>AI 系統建議</span>
      </h4>
      <p class="mt-3 leading-relaxed text-white/90">{{ aiSuggestion }}</p>
    </div>
    
    <!-- 技術說明 -->
    <div class="mt-6 rounded-2xl border border-white/5 bg-slate-950/60 p-4">
      <p class="text-xs leading-relaxed text-white/50">
        💡 <strong>技術實現：</strong>Vue 3 Composition API + Computed Properties<br>
        🔮 <strong>未來擴展：</strong>整合 Gemini AI API 提供真實機器學習建議
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const temperature = ref(25)
const humidity = ref(60)

interface Suggestion {
  text: string
  icon: string
  class: string
}

// AI 建議邏輯
const aiSuggestion = computed(() => {
  const temp = temperature.value
  const hum = humidity.value
  
  if (temp > 30 && hum > 70) {
    return '⚠️ 高溫高濕環境：建議立即啟動降溫除濕系統，避免作物病害。預計耗能增加 15%，但可降低 40% 病害風險。'
  } else if (temp < 15) {
    return '❄️ 低溫警告：建議開啟加熱設備，維持作物生長溫度。夜間可搭配保溫被覆蓋，節省能源 25%。'
  } else if (hum < 40) {
    return '💦 濕度過低：建議啟動灑水或霧化系統增濕。建議灑水時間：早晨 6-8 點，避免水分快速蒸發。'
  } else if (temp > 35) {
    return '🚨 極高溫警告：建議啟動遮陽網與強制通風，並增加灑水頻率至每 2 小時一次。立即執行！'
  } else if (temp >= 20 && temp <= 28 && hum >= 50 && hum <= 70) {
    return '✅ 環境參數完美！當前條件最適合作物生長。系統處於節能模式，預計日耗能 < 5 kWh。'
  }
  return '✅ 環境參數正常，當前條件適合作物生長。系統處於節能模式，預計日耗能 < 5 kWh。'
})

// 建議圖標
const suggestionIcon = computed(() => {
  const temp = temperature.value
  const hum = humidity.value
  
  if (temp > 30 && hum > 70) return '⚠️'
  if (temp < 15) return '❄️'
  if (hum < 40) return '💦'
  if (temp > 35) return '🚨'
  if (temp >= 20 && temp <= 28 && hum >= 50 && hum <= 70) return '✅'
  return '✅'
})

// 建議樣式類別
const suggestionClass = computed(() => {
  const temp = temperature.value
  const hum = humidity.value
  
  if (temp > 35 || (temp < 10)) {
    return 'border-red-500/50 bg-red-500/10 shadow-lg shadow-red-500/20'
  }
  if (temp > 30 && hum > 70) {
    return 'border-yellow-500/50 bg-yellow-500/10 shadow-lg shadow-yellow-500/20'
  }
  if (temp < 15) {
    return 'border-orange-500/50 bg-orange-500/10 shadow-lg shadow-orange-500/20'
  }
  if (hum < 40) {
    return 'border-blue-500/50 bg-blue-500/10 shadow-lg shadow-blue-500/20'
  }
  if (temp >= 20 && temp <= 28 && hum >= 50 && hum <= 70) {
    return 'border-neon-green/50 bg-neon-green/10 shadow-lg shadow-neon-green/20'
  }
  return 'border-neon-green/30 bg-neon-green/5'
})

// 未來可擴展：呼叫 API 取得真實 AI 建議
// const fetchAiSuggestion = async () => {
//   const { data } = await useFetch('/api/simulator/iot', {
//     method: 'POST',
//     body: { temperature: temperature.value, humidity: humidity.value }
//   })
//   return data.value
// }
</script>

<style scoped>
/* 自定義滑桿樣式 */
.range-accent {
  accent-color: #00ff88;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #00ff88;
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #00ff88;
  cursor: pointer;
  border: none;
  box-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
}
</style>
