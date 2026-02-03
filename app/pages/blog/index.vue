<template>
  <div class="min-h-screen blueprint-bg">
    <TheHeader />
    
    <main class="mx-auto max-w-6xl px-4 py-16">
      <header class="mb-12 text-center">
        <p class="text-sm uppercase tracking-[0.35em] text-white/60">Blog</p>
        <h1 class="mt-4 text-4xl font-bold text-white">技術部落格</h1>
        <p class="mt-4 text-lg text-white/70">
          分享機械工程到 AI 開發的跨域學習歷程
        </p>
      </header>
      
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <ContentList path="/blog" v-slot="{ list }">
          <NuxtLink
            v-for="article in list"
            :key="article._path"
            :to="article._path"
            class="group block rounded-3xl border border-white/10 bg-slate-900/60 p-6 transition hover:border-neon-green/50"
          >
            <p class="text-xs text-white/50">{{ formatDate(article.date) }}</p>
            <h2 class="mt-3 text-xl font-semibold text-white group-hover:text-neon-green">
              {{ article.title }}
            </h2>
            <p class="mt-2 text-sm text-white/70">{{ article.description }}</p>
            <div class="mt-4 flex flex-wrap gap-2">
              <span
                v-for="tag in article.tags"
                :key="tag"
                class="rounded-full bg-neon-green/20 px-3 py-1 text-xs text-neon-green"
              >
                {{ tag }}
              </span>
            </div>
          </NuxtLink>
        </ContentList>
      </div>
    </main>
    
    <footer class="border-t border-white/10 bg-slate-950/80 py-10">
      <div class="mx-auto max-w-6xl px-4 text-center">
        <p class="text-xs text-white/50">© 2026 蘇柏誠 Simon Su. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

useSeoMeta({
  title: '技術部落格 | 蘇柏誠 Simon Su',
  description: '分享機械工程到 AI 開發的跨域學習歷程與技術實戰經驗',
})
</script>
