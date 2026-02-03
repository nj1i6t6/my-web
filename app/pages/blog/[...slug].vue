<template>
  <div class="min-h-screen blueprint-bg">
    <TheHeader />
    
    <main class="mx-auto max-w-4xl px-4 py-16">
      <article class="prose prose-invert max-w-none">
        <ContentDoc />
      </article>
    </main>
    
    <footer class="border-t border-white/10 bg-slate-950/80 py-10">
      <div class="mx-auto max-w-6xl px-4 text-center">
        <p class="text-xs text-white/50">© 2026 蘇柏誠 Simon Su. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: '技術部落格 | 蘇柏誠 Simon Su',
  description: '分享機械工程到 AI 開發的跨域學習歷程與技術實戰經驗',
})
</script>
