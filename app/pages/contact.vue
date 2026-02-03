<template>
  <div class="min-h-screen blueprint-bg">
    <!-- 導航列（待拆分為 TheHeader 組件） -->
    <nav class="border-b border-white/10 bg-slate-900/80 backdrop-blur-sm">
      <div class="mx-auto max-w-6xl px-4 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-xl font-bold text-neon-green">
            Simon Su
          </NuxtLink>
          <div class="flex gap-6">
            <NuxtLink to="/" class="text-white/70 transition hover:text-neon-green">
              首頁
            </NuxtLink>
            <NuxtLink to="/projects" class="text-white/70 transition hover:text-neon-green">
              作品集
            </NuxtLink>
            <NuxtLink to="/contact" class="text-neon-green font-semibold">
              聯絡我
            </NuxtLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- 主要內容 -->
    <section class="mx-auto max-w-4xl px-4 py-16">
      <!-- 動態模式切換 -->
      <div class="text-center">
        <!-- HR 模式 -->
        <div v-if="displayMode === 'hiring'" class="space-y-8">
          <div class="space-y-4">
            <h1 class="text-4xl font-bold text-white md:text-5xl">
              歡迎 HR！👋
            </h1>
            <p class="text-lg text-white/70 md:text-xl">
              感謝您對我的關注，這裡有完整的履歷資訊
            </p>
          </div>
          
          <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a 
              href="/resume.pdf" 
              download
              class="inline-flex items-center gap-2 rounded-full bg-neon-green/20 px-8 py-4 text-lg font-semibold text-neon-green shadow-lg shadow-neon-green/20 transition hover:bg-neon-green/30 hover:shadow-neon-green/30"
            >
              <i class="fas fa-file-pdf"></i>
              下載完整履歷
            </a>
            
            <a 
              href="https://linkedin.com/in/bochengsu" 
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-lg font-semibold text-white transition hover:border-neon-green hover:text-neon-green"
            >
              <i class="fab fa-linkedin"></i>
              LinkedIn 檔案
            </a>
          </div>
          
          <!-- 快速資訊卡片 -->
          <div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div class="metal-border rounded-2xl p-6 text-left">
              <div class="text-3xl mb-2">🎓</div>
              <h3 class="font-semibold text-white">學歷</h3>
              <p class="mt-2 text-sm text-white/60">國立台灣大學 機械工程學系</p>
            </div>
            <div class="metal-border rounded-2xl p-6 text-left">
              <div class="text-3xl mb-2">💼</div>
              <h3 class="font-semibold text-white">經驗</h3>
              <p class="mt-2 text-sm text-white/60">3+ 年全端開發 + AI 應用</p>
            </div>
            <div class="metal-border rounded-2xl p-6 text-left">
              <div class="text-3xl mb-2">🚀</div>
              <h3 class="font-semibold text-white">專長</h3>
              <p class="mt-2 text-sm text-white/60">Vue 3 + Flask + Gemini AI</p>
            </div>
          </div>
        </div>
        
        <!-- 開發者模式 -->
        <div v-else class="space-y-8">
          <div class="space-y-4">
            <h1 class="text-4xl font-bold text-white md:text-5xl">
              討論技術合作 🤝
            </h1>
            <p class="text-lg text-white/70 md:text-xl">
              歡迎技術交流、專案合作或開源貢獻討論
            </p>
          </div>
          
          <div class="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a 
              href="#form" 
              class="inline-flex items-center gap-2 rounded-full bg-neon-green/20 px-8 py-4 text-lg font-semibold text-neon-green shadow-lg shadow-neon-green/20 transition hover:bg-neon-green/30 hover:shadow-neon-green/30"
            >
              <i class="fas fa-paper-plane"></i>
              立即聯繫
            </a>
            
            <a 
              href="https://github.com/nj1i6t6" 
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-lg font-semibold text-white transition hover:border-neon-green hover:text-neon-green"
            >
              <i class="fab fa-github"></i>
              GitHub 專案
            </a>
          </div>
          
          <!-- 技術標籤 -->
          <div class="mt-12">
            <p class="mb-4 text-sm text-white/50">我的技術棧</p>
            <div class="flex flex-wrap justify-center gap-3">
              <span 
                v-for="tech in techStack" 
                :key="tech"
                class="rounded-full bg-neon-green/20 px-4 py-2 text-sm text-neon-green"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- 模式切換提示 -->
        <p class="mt-8 text-center text-sm text-white/50">
          或是... 
          <button 
            @click="toggleMode" 
            class="text-neon-green underline-offset-4 transition hover:underline"
          >
            切換至{{ displayMode === 'hiring' ? '開發者' : 'HR' }}模式
          </button>
        </p>
      </div>
      
      <!-- 聯絡表單 -->
      <form 
        id="form" 
        @submit.prevent="handleSubmit"
        class="mt-16 rounded-3xl border border-white/10 bg-slate-900/60 p-8 md:p-12"
      >
        <h2 class="mb-8 text-2xl font-bold text-white">
          發送訊息
        </h2>
        
        <!-- 表單欄位 -->
        <div class="space-y-6">
          <!-- 姓名 -->
          <div>
            <label for="name" class="mb-2 block text-sm font-medium text-white/80">
              姓名 <span class="text-red-400">*</span>
            </label>
            <input
              id="name"
              v-model="formData.name"
              type="text"
              required
              placeholder="請輸入您的姓名"
              class="w-full rounded-xl border border-white/20 bg-slate-800/50 px-4 py-3 text-white placeholder-white/40 transition focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/50"
            />
          </div>
          
          <!-- Email -->
          <div>
            <label for="email" class="mb-2 block text-sm font-medium text-white/80">
              Email <span class="text-red-400">*</span>
            </label>
            <input
              id="email"
              v-model="formData.email"
              type="email"
              required
              placeholder="your.email@example.com"
              class="w-full rounded-xl border border-white/20 bg-slate-800/50 px-4 py-3 text-white placeholder-white/40 transition focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/50"
            />
          </div>
          
          <!-- 訊息 -->
          <div>
            <label for="message" class="mb-2 block text-sm font-medium text-white/80">
              訊息內容 <span class="text-red-400">*</span>
            </label>
            <textarea
              id="message"
              v-model="formData.message"
              required
              rows="6"
              placeholder="請輸入您的訊息..."
              class="w-full rounded-xl border border-white/20 bg-slate-800/50 px-4 py-3 text-white placeholder-white/40 transition focus:border-neon-green focus:outline-none focus:ring-2 focus:ring-neon-green/50"
            ></textarea>
          </div>
          
          <!-- Cloudflare Turnstile -->
          <div 
            ref="turnstileContainer" 
            class="cf-turnstile flex justify-center"
          ></div>
          
          <!-- 錯誤訊息 -->
          <div 
            v-if="errorMessage" 
            class="rounded-xl border border-red-500/50 bg-red-500/10 p-4 text-red-400"
          >
            <i class="fas fa-exclamation-circle mr-2"></i>
            {{ errorMessage }}
          </div>
          
          <!-- 成功訊息 -->
          <div 
            v-if="successMessage" 
            class="rounded-xl border border-neon-green/50 bg-neon-green/10 p-4 text-neon-green"
          >
            <i class="fas fa-check-circle mr-2"></i>
            {{ successMessage }}
          </div>
          
          <!-- 送出按鈕 -->
          <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full rounded-xl bg-neon-green px-6 py-4 text-lg font-semibold text-slate-900 transition hover:bg-neon-green/90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <span v-if="!isSubmitting">
              <i class="fas fa-paper-plane mr-2"></i>
              送出訊息
            </span>
            <span v-else>
              <i class="fas fa-spinner fa-spin mr-2"></i>
              發送中...
            </span>
          </button>
        </div>
      </form>
      
      <!-- 其他聯絡方式 -->
      <div class="mt-12 text-center">
        <p class="mb-4 text-sm text-white/50">其他聯絡方式</p>
        <div class="flex justify-center gap-6">
          <a 
            href="mailto:bochengsu@gmail.com"
            class="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-neon-green hover:text-neon-green"
            aria-label="Email"
          >
            <i class="fas fa-envelope text-lg"></i>
          </a>
          <a 
            href="https://github.com/nj1i6t6"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-neon-green hover:text-neon-green"
            aria-label="GitHub"
          >
            <i class="fab fa-github text-lg"></i>
          </a>
          <a 
            href="https://linkedin.com/in/bochengsu"
            target="_blank"
            rel="noopener noreferrer"
            class="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white/70 transition hover:border-neon-green hover:text-neon-green"
            aria-label="LinkedIn"
          >
            <i class="fab fa-linkedin text-lg"></i>
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const event = useRequestEvent()

// 取得 Edge Middleware 判定的意圖模式
const intentMode = ref<'hiring' | 'dev'>(event?.context?.intentMode || 'dev')
const displayMode = ref<'hiring' | 'dev'>(intentMode.value)

// 技術棧
const techStack = ['Vue 3', 'Nuxt 4', 'Flask', 'FastAPI', 'PostgreSQL', 'Gemini AI', 'Docker', 'Tailwind CSS']

// 表單數據
const formData = ref({
  name: '',
  email: '',
  message: ''
})

const isSubmitting = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const turnstileContainer = ref<HTMLElement | null>(null)
const turnstileToken = ref('')
const csrfToken = useCookie('csrf-token')

// 模式切換
const toggleMode = () => {
  displayMode.value = displayMode.value === 'hiring' ? 'dev' : 'hiring'
}

// Turnstile 初始化
onMounted(() => {
  if (process.client && window.turnstile && turnstileContainer.value) {
    window.turnstile.render(turnstileContainer.value, {
      sitekey: config.public.turnstileSiteKey,
      callback: (token: string) => {
        turnstileToken.value = token
      },
      theme: 'dark'
    })
  }

  if (!csrfToken.value) {
    $fetch('/api/csrf').then((response) => {
      csrfToken.value = response.token
    }).catch(() => {
      // ignore
    })
  }
})

// 表單送出
const handleSubmit = async () => {
  errorMessage.value = ''
  successMessage.value = ''
  
  // 驗證 Turnstile
  if (!turnstileToken.value) {
    errorMessage.value = '請完成 CAPTCHA 驗證'
    return
  }
  
  isSubmitting.value = true
  
  try {
    if (!csrfToken.value) {
      const csrfResponse = await $fetch('/api/csrf')
      csrfToken.value = csrfResponse.token
    }

    const response = await $fetch('/api/contact', {
      method: 'POST',
      headers: {
        'x-csrf-token': csrfToken.value || ''
      },
      body: {
        name: formData.value.name,
        email: formData.value.email,
        message: formData.value.message,
        token: turnstileToken.value
      }
    })
    
    successMessage.value = response.message || '訊息已成功送出！'
    
    // 重置表單
    formData.value = {
      name: '',
      email: '',
      message: ''
    }
    
    // 重置 Turnstile
    if (window.turnstile) {
      window.turnstile.reset()
    }
  } catch (error: any) {
    errorMessage.value = error.data?.message || '發送失敗，請稍後再試'
  } finally {
    isSubmitting.value = false
  }
}

// SEO
useSeoMeta({
  title: '聯絡我 | 蘇柏誠 Simon Su',
  description: '歡迎聯絡我討論技術合作、專案開發或技術交流。提供履歷下載與多種聯絡方式。',
  ogTitle: '聯絡我 | 蘇柏誠 Simon Su',
  ogDescription: '歡迎聯絡我討論技術合作、專案開發或技術交流',
  ogUrl: 'https://bochengsu.com/contact',
  twitterCard: 'summary'
})
</script>

<style scoped>
/* 引入 Blueprint 樣式 */
@import '@/assets/css/blueprint-grid.css';
</style>
