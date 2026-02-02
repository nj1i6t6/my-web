<template>
  <div class="min-h-screen">
    <header class="sticky top-0 z-40 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <NuxtLink to="/" class="text-lg font-semibold text-white">Simon Su</NuxtLink>
        <div class="flex items-center gap-4 text-sm text-white/70">
          <NuxtLink to="/" class="transition hover:text-neon-green">首頁</NuxtLink>
          <NuxtLink to="/projects" class="text-neon-green">作品集</NuxtLink>
        </div>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-12">
      <div class="mb-10">
        <p class="text-sm uppercase tracking-[0.25em] text-white/50">Projects</p>
        <h1 class="mt-3 text-3xl font-semibold text-white">作品集</h1>
        <p class="mt-3 max-w-2xl text-white/70">
          聚焦智慧農業、AI 應用與全端系統整合，展示跨域開發的實作成果。
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-2">
        <article
          v-for="project in projectsList"
          :key="project.id"
          class="group overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 shadow-xl shadow-black/30"
        >
          <div class="relative">
            <img
              :src="project.image"
              :srcset="`${project.imageSmall} 560w, ${project.image} 1280w`"
              sizes="(max-width: 768px) 100vw, 560px"
              :alt="project.title"
              class="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent" />
          </div>
          <div class="space-y-4 p-6">
            <div class="flex items-start justify-between gap-4">
              <h2 class="text-xl font-semibold text-white">{{ project.title }}</h2>
              <a
                :href="project.github"
                target="_blank"
                rel="noopener noreferrer"
                class="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-neon-green hover:text-neon-green"
                aria-label="GitHub 專案連結"
              >
                <i class="fab fa-github"></i>
              </a>
            </div>
            <p class="text-sm leading-6 text-white/70">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 text-xs text-white/70">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="rounded-full border border-white/15 px-3 py-1"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </main>
  </div>
</template>

<script setup>
useSeoMeta({
  title: '作品集｜蘇柏誠 Simon Su',
  description: '展示智慧農業與 AI 應用開發的作品集與專案成果。',
  ogTitle: '作品集｜蘇柏誠 Simon Su',
  ogDescription: '展示智慧農業與 AI 應用開發的作品集與專案成果。',
  ogType: 'website',
  twitterCard: 'summary_large_image',
})

const { data: projects } = await useAsyncData('projects', () => $fetch('/api/projects'))
const projectsList = computed(() => projects.value ?? [])
</script>
