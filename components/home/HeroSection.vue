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
      
      <!-- 右側：儀表板 -->
      <div class="rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-2xl shadow-black/50">
        <p class="text-sm uppercase tracking-[0.35em] text-white/60">儀表板互動</p>
        <h2 class="mt-4 text-2xl font-semibold text-white">汽車儀表板按鈕組</h2>
        <p class="mt-4 text-sm text-white/70">即時狀態與互動動畫展示</p>
        
        <!-- GaugeButton 組件會在此載入 -->
        <div
          ref="dashboardRef"
          class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-5"
          aria-label="汽車儀表板狀態按鈕區塊"
        >
          <button
            v-for="item in gauges"
            :key="item.key"
            class="gauge-btn group flex flex-col items-center gap-3"
            type="button"
            :aria-label="item.aria"
          >
            <span
              :class="[
                'gauge-circle flex h-20 w-20 items-center justify-center rounded-full bg-steel-950 ring-2 shadow-lg shadow-black/40 transition duration-300 ease-out',
                item.ringClass,
                'group-hover:brightness-125',
              ]"
            >
              <i :class="item.icon" class="text-3xl"></i>
            </span>
            <span class="text-xs text-white/60 transition group-hover:text-white">{{ item.label }}</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'

const dashboardRef = ref<HTMLElement | null>(null)

const socialLinks = [
  { url: 'https://github.com/nj1i6t6', icon: 'fab fa-github', label: 'GitHub - 個人首頁' },
  { url: 'https://www.linkedin.com/in/柏誠-蘇-066816375', icon: 'fab fa-linkedin-in', label: 'LinkedIn' },
  { url: 'https://x.com/Sucheng0913', icon: 'fab fa-x-twitter', label: 'X' },
  { url: 'https://www.instagram.com/nj_1i6t_6', icon: 'fab fa-instagram', label: 'Instagram' },
  { url: 'mailto:bochengsu@gmail.com', icon: 'fas fa-envelope', label: 'Email' }
]

const gauges = [
  { key: 'oil', icon: 'fas fa-oil-can', label: '機油', ringClass: 'ring-amber-500/50 text-amber-400', aria: '機油狀態按鈕' },
  { key: 'engine', icon: 'fas fa-engine-warning', label: '引擎', ringClass: 'ring-red-500/50 text-red-400', aria: '引擎狀態按鈕' },
  { key: 'battery', icon: 'fas fa-car-battery', label: '電池', ringClass: 'ring-emerald-500/50 text-emerald-400', aria: '電池狀態按鈕' },
  { key: 'temp', icon: 'fas fa-temperature-high', label: '溫度', ringClass: 'ring-blue-500/50 text-blue-400', aria: '溫度狀態按鈕' },
  { key: 'brake', icon: 'fas fa-brake-warning', label: '煞車', ringClass: 'ring-orange-500/50 text-orange-400', aria: '煞車狀態按鈕' },
  { key: 'tire', icon: 'fas fa-tire-pressure-warning', label: '胎壓', ringClass: 'ring-yellow-500/50 text-yellow-400', aria: '胎壓狀態按鈕' },
  { key: 'abs', icon: 'fas fa-car-tilt', label: 'ABS', ringClass: 'ring-purple-500/50 text-purple-400', aria: 'ABS狀態按鈕' },
  { key: 'airbag', icon: 'fas fa-shield', label: '氣囊', ringClass: 'ring-pink-500/50 text-pink-400', aria: '氣囊狀態按鈕' },
  { key: 'seatbelt', icon: 'fas fa-user-lock', label: '安全帶', ringClass: 'ring-cyan-500/50 text-cyan-400', aria: '安全帶狀態按鈕' },
  { key: 'light', icon: 'fas fa-lightbulb', label: '燈光', ringClass: 'ring-lime-500/50 text-lime-400', aria: '燈光狀態按鈕' }
]

onMounted(() => {
  if (!dashboardRef.value) return
  
  const buttons = dashboardRef.value.querySelectorAll('.gauge-btn')
  
  // 檢查用戶是否偏好減少動畫
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  
  if (prefersReducedMotion) {
    // 如果用戶偏好減少動畫，直接顯示元素
    gsap.set(buttons, { scale: 1, opacity: 1 })
  } else {
    // GSAP 動畫：按鈕進場
    gsap.from(buttons, {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: dashboardRef.value,
        start: 'top 80%'
      }
    })
  }
  
  // GSAP 動畫：按鈕點擊旋轉（始終啟用，因為這是用戶主動觸發的）
  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const circle = btn.querySelector('.gauge-circle')
      if (circle && !prefersReducedMotion) {
        gsap.to(circle, {
          rotation: '+=360',
          duration: 0.6,
          ease: 'power2.out'
        })
      }
    })
  })
})
</script>

<style scoped>
/* HeroSection 特定樣式 */
.shadow-neon-green {
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.3);
}
</style>
