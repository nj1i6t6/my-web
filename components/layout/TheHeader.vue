<template>
  <header class="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
      <NuxtLink to="/" class="text-lg font-semibold text-white">
        Simon Su
      </NuxtLink>
      
      <!-- 手機選單按鈕 -->
      <button
        class="inline-flex items-center justify-center rounded-full border border-white/20 p-2 text-white lg:hidden"
        type="button"
        aria-label="Toggle navigation"
        @click="isMenuOpen = !isMenuOpen"
      >
        <i :class="isMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
      </button>
      
      <!-- 桌面導航 -->
      <nav class="hidden items-center gap-6 text-sm text-white/70 lg:flex">
        <a 
          v-for="link in navLinks" 
          :key="link.href"
          :href="link.href" 
          class="transition hover:text-neon-green"
        >
          {{ link.label }}
        </a>
      </nav>
    </div>
    
    <!-- 手機選單 -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="isMenuOpen" class="border-t border-white/10 bg-slate-950/95 lg:hidden">
        <div class="mx-auto grid max-w-6xl gap-4 px-4 py-4 text-sm text-white/70">
          <a 
            v-for="link in navLinks" 
            :key="link.href"
            :href="link.href" 
            class="transition hover:text-neon-green" 
            @click="isMenuOpen = false"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false)

const navLinks = [
  { href: '#home', label: '首頁' },
  { href: '#about', label: '關於我' },
  { href: '#skills', label: '專業技能' },
  { href: '#projects', label: '作品集' },
  { href: '#experience', label: '經歷' },
  { href: '#contact', label: '聯繫我' }
]

// 監聽路由變化時關閉選單
onMounted(() => {
  if (process.client) {
    window.addEventListener('hashchange', () => {
      isMenuOpen.value = false
    })
  }
})
</script>

<style scoped>
/* TheHeader 特定樣式 */
</style>
