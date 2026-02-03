<template>
  <div class="min-h-screen blueprint-bg">
    <TheHeader />
    
    <article class="mx-auto max-w-4xl px-4 py-16">
      <!-- 載入中 -->
      <BlueprintSkeleton v-if="pending" height="600px" show-label />
      
      <!-- 專案詳情 -->
      <div v-else-if="project">
        <!-- 專案標題 -->
        <header class="text-center">
          <NuxtLink 
            to="/projects"
            class="inline-flex items-center gap-2 text-sm text-white/60 transition hover:text-neon-green"
          >
            <i class="fas fa-arrow-left"></i>
            返回作品集
          </NuxtLink>
          <h1 class="mt-6 text-4xl font-bold text-white">{{ project.title }}</h1>
          <p class="mt-4 text-lg text-white/70">{{ project.subtitle }}</p>
          
          <!-- 標籤 -->
          <div class="mt-6 flex flex-wrap justify-center gap-2">
            <span 
              v-for="tag in project.tags" 
              :key="tag"
              class="rounded-full bg-neon-green/20 px-4 py-2 text-sm font-medium text-neon-green"
            >
              {{ tag }}
            </span>
          </div>
        </header>
        
        <!-- STAR 框架 -->
        <div class="mt-16 space-y-12">
          <!-- Situation -->
          <section class="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
            <h2 class="flex items-center gap-3 text-2xl font-semibold text-white">
              <span class="text-3xl">📍</span>
              <span>Situation (情境背景)</span>
            </h2>
            <p class="mt-4 leading-relaxed text-white/80">{{ project.situation }}</p>
          </section>
          
          <!-- Task -->
          <section class="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
            <h2 class="flex items-center gap-3 text-2xl font-semibold text-white">
              <span class="text-3xl">🎯</span>
              <span>Task (技術挑戰)</span>
            </h2>
            <p class="mt-4 leading-relaxed text-white/80">{{ project.task }}</p>
          </section>
          
          <!-- Action -->
          <section class="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
            <h2 class="flex items-center gap-3 text-2xl font-semibold text-white">
              <span class="text-3xl">⚙️</span>
              <span>Action (解決方案)</span>
            </h2>
            <ul class="mt-4 space-y-3">
              <li 
                v-for="(action, index) in project.actions" 
                :key="index"
                class="flex gap-3 leading-relaxed text-white/80"
              >
                <span class="mt-1 text-neon-green">▸</span>
                <span>{{ action }}</span>
              </li>
            </ul>
          </section>
          
          <!-- Result -->
          <section class="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
            <h2 class="flex items-center gap-3 text-2xl font-semibold text-white">
              <span class="text-3xl">📊</span>
              <span>Result (量化成果)</span>
            </h2>
            <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div 
                v-for="metric in project.results" 
                :key="metric.label"
                class="rounded-2xl border border-neon-green/30 bg-neon-green/10 p-6 text-center transition hover:border-neon-green/50 hover:bg-neon-green/15"
              >
                <div class="tech-data text-3xl font-bold text-neon-green">
                  {{ metric.value }}
                </div>
                <div class="mt-2 text-sm text-white/70">
                  {{ metric.label }}
                </div>
              </div>
            </div>
          </section>
          
          <!-- GitHub 連結 -->
          <div v-if="project.github" class="text-center">
            <a 
              :href="project.github"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-white/80 transition hover:border-neon-green hover:text-neon-green"
            >
              <i class="fab fa-github"></i>
              查看 GitHub 原始碼
            </a>
          </div>
        </div>
        
        <!-- 返回按鈕 -->
        <div class="mt-12 text-center">
          <NuxtLink 
            to="/projects"
            class="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-white/80 transition hover:border-neon-green hover:text-neon-green"
          >
            <i class="fas fa-arrow-left"></i>
            返回作品集
          </NuxtLink>
        </div>
      </div>
      
      <!-- 錯誤訊息 -->
      <div v-else class="rounded-3xl border border-red-500/50 bg-red-500/10 p-12 text-center">
        <p class="text-lg text-red-400">專案不存在</p>
        <NuxtLink 
          to="/projects"
          class="mt-6 inline-flex items-center gap-2 text-white/60 transition hover:text-neon-green"
        >
          <i class="fas fa-arrow-left"></i>
          返回作品集
        </NuxtLink>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()

// 取得專案詳情
const { data: project, pending } = await useAsyncData(
  `project-${route.params.id}`,
  () => $fetch(`/api/projects/${route.params.id}`)
)

// SEO
useSeoMeta({
  title: project.value?.title ? `${project.value.title} | 蘇柏誠 Simon Su` : '專案詳情',
  description: project.value?.subtitle || '專案詳細資訊',
  ogTitle: project.value?.title || '專案詳情',
  ogDescription: project.value?.subtitle || '',
  ogUrl: `https://bochengsu.com/projects/${route.params.id}`,
  twitterCard: 'summary'
})
</script>

<style scoped>
@import '@/assets/css/blueprint-grid.css';
</style>
