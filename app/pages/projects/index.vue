<template>
  <div class="min-h-screen blueprint-bg">
    <TheHeader />

    <main class="mx-auto max-w-6xl px-4 py-16">
      <!-- 頁面標題 -->
      <div class="mb-12 text-center">
        <p class="text-sm uppercase tracking-[0.35em] text-white/60">Projects</p>
        <h1 class="mt-3 text-4xl font-bold text-white">作品集</h1>
        <p class="mx-auto mt-4 max-w-2xl text-lg text-white/70">
          聚焦智慧農業、AI 應用與全端系統整合，展示跨域開發的實作成果。
        </p>
      </div>

      <!-- IoT 模擬器展示 -->
      <section class="mb-16">
        <div class="mb-6">
          <h2 class="text-2xl font-semibold text-white">🔬 互動展示</h2>
          <p class="mt-2 text-sm text-white/60">體驗智慧農業決策系統</p>
        </div>
        <IotSimulator />
      </section>

      <!-- 專案列表 -->
      <section>
        <div class="mb-6">
          <h2 class="text-2xl font-semibold text-white">📂 所有專案</h2>
          <p class="mt-2 text-sm text-white/60">點擊查看詳細 STAR 框架展示</p>
        </div>
        
        <!-- 載入中骨架屏 -->
        <div v-if="pending" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <BlueprintSkeleton v-for="i in 6" :key="i" height="300px" />
        </div>
        
        <!-- 專案卡片 -->
        <div v-else-if="projectsList.length > 0" class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProjectCard 
            v-for="project in projectsList" 
            :key="project.id" 
            :project="project" 
          />
        </div>
        
        <!-- 無專案提示 -->
        <div v-else class="rounded-3xl border border-white/10 bg-slate-900/60 p-12 text-center">
          <p class="text-white/60">目前沒有專案資料</p>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
// SEO
useSeoMeta({
  title: '作品集 | 蘇柏誠 Simon Su',
  description: '展示智慧農業、AI 應用與全端系統整合的專案作品集。包含 IoT 模擬器、機器學習應用等實作成果。',
  ogTitle: '作品集 | 蘇柏誠 Simon Su',
  ogDescription: '展示智慧農業、AI 應用與全端系統整合的專案作品集',
  ogUrl: 'https://bochengsu.com/projects',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

// 取得專案列表
const { data: projects, pending } = await useAsyncData('projects', () => $fetch('/api/projects'))
const projectsList = computed(() => projects.value ?? [])
</script>

<style scoped>
@import '@/assets/css/blueprint-grid.css';
</style>
