<template>
  <section id="projects" class="mx-auto max-w-6xl px-4 py-16">
    <div class="mb-8 flex items-center justify-between">
      <div>
        <p class="text-sm uppercase tracking-[0.35em] text-white/60">Projects</p>
        <h2 class="mt-4 text-2xl font-semibold text-white">作品集</h2>
      </div>
      <NuxtLink
        to="/projects"
        class="hidden items-center gap-2 text-sm text-neon-green transition hover:text-white md:flex"
      >
        查看全部
        <i class="fas fa-arrow-right"></i>
      </NuxtLink>
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
            <h3 class="text-xl font-semibold text-white">{{ project.title }}</h3>
            <a
              :href="project.github"
              target="_blank"
              rel="noopener noreferrer"
              class="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-neon-green hover:text-neon-green"
              aria-label="GitHub - 領頭羊博士專案原始碼"
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
  </section>
</template>

<script setup lang="ts">
const { data: projects } = await useAsyncData('projects', () => $fetch('/api/projects'))
const projectsList = computed(() => projects.value ?? [])
</script>
