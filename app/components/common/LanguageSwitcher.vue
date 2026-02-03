<template>
  <div class="relative">
    <button
      type="button"
      class="flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-sm text-white/70 transition hover:border-neon-green hover:text-neon-green"
      @click="isOpen = !isOpen"
      aria-label="切換語言"
    >
      <i class="fas fa-globe"></i>
      <span>{{ currentLocaleName }}</span>
      <i class="fas fa-chevron-down text-xs transition" :class="{ 'rotate-180': isOpen }"></i>
    </button>
    
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 top-full mt-2 min-w-[120px] rounded-xl border border-white/10 bg-slate-900/95 py-2 shadow-xl backdrop-blur"
      >
        <button
          v-for="locale in availableLocales"
          :key="locale.code"
          type="button"
          class="flex w-full items-center gap-2 px-4 py-2 text-sm text-white/70 transition hover:bg-white/10 hover:text-neon-green"
          :class="{ 'text-neon-green': locale.code === currentLocale }"
          @click="switchLocale(locale.code)"
        >
          <span>{{ locale.name }}</span>
          <i v-if="locale.code === currentLocale" class="fas fa-check text-xs"></i>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
const isOpen = ref(false)

const currentLocale = computed(() => locale.value)

const availableLocales = computed(() => {
  return locales.value.map((l) => ({
    code: typeof l === 'string' ? l : l.code,
    name: typeof l === 'string' ? l : l.name || l.code
  }))
})

const currentLocaleName = computed(() => {
  const current = availableLocales.value.find((l) => l.code === currentLocale.value)
  return current?.name || currentLocale.value
})

const switchLocale = async (code: string) => {
  await setLocale(code)
  isOpen.value = false
}

// 點擊外部關閉
onMounted(() => {
  if (process.client) {
    document.addEventListener('click', handleClickOutside)
  }
})

onBeforeUnmount(() => {
  if (process.client) {
    document.removeEventListener('click', handleClickOutside)
  }
})

const handleClickOutside = (e: MouseEvent) => {
  const target = e.target as HTMLElement
  if (!target.closest('.relative')) {
    isOpen.value = false
  }
}
</script>
