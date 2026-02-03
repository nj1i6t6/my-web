<template>
  <NuxtLink 
    :to="`/projects/${project.id}`"
    class="group block rounded-3xl border border-white/10 bg-slate-900/60 p-6 transition-all duration-300 hover:border-neon-green/50 hover:shadow-lg hover:shadow-neon-green/10"
  >
    <!-- 專案標題 -->
    <h3 class="text-xl font-semibold text-white transition-colors group-hover:text-neon-green">
      {{ project.title }}
    </h3>
    
    <!-- 專案副標題 -->
    <p class="mt-2 text-sm text-white/60 line-clamp-2">
      {{ project.subtitle }}
    </p>
    
    <!-- 技術標籤 -->
    <div class="mt-4 flex flex-wrap gap-2">
      <span 
        v-for="tag in project.tags" 
        :key="tag"
        class="rounded-full bg-neon-green/20 px-3 py-1 text-xs font-medium text-neon-green"
      >
        {{ tag }}
      </span>
    </div>
    
    <!-- 查看更多提示 -->
    <div class="mt-4 flex items-center gap-2 text-sm text-white/50 transition-all group-hover:text-neon-green">
      <span>查看詳情</span>
      <i class="fas fa-arrow-right transition-transform group-hover:translate-x-1"></i>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Project {
  id: string
  title: string
  subtitle: string
  tags: string[]
}

defineProps<{
  project: Project
}>()
</script>

<style scoped>
/* 限制文字行數 */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
