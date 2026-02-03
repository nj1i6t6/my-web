<template>
  <div class="min-h-screen blueprint-bg">
    <LayoutTheHeader />

    <main>
      <!-- Hero Section -->
      <HomeHeroSection />

      <!-- About Section -->
      <DashboardAboutSection />

      <!-- Skills Section -->
      <DashboardSkillsSection />

      <!-- Projects Section -->
      <DashboardProjectsSection />

      <!-- Experience Section -->
      <DashboardExperienceSection />

      <!-- Contact Section -->
      <DashboardContactSection />
    </main>

    <footer class="border-t border-white/10 bg-slate-950/80">
      <div class="mx-auto max-w-6xl px-4 py-10">
        <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p class="text-lg font-semibold text-white">蘇柏誠 Simon Su</p>
            <p class="text-sm text-white/60">打造優質的數位體驗</p>
          </div>
          <div class="flex flex-wrap gap-4 text-sm text-white/60">
            <a href="#home" class="transition hover:text-neon-green">首頁</a>
            <a href="#about" class="transition hover:text-neon-green">關於我</a>
            <a href="#projects" class="transition hover:text-neon-green">作品集</a>
            <a href="#contact" class="transition hover:text-neon-green">聯繫我</a>
          </div>
          <div class="flex gap-3 text-white/70">
            <a href="https://github.com/nj1i6t6" target="_blank" rel="noopener noreferrer" aria-label="GitHub - 頁尾連結" class="transition hover:text-neon-green">
              <i class="fab fa-github"></i>
            </a>
            <a href="https://www.linkedin.com/in/柏誠-蘇-066816375" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="transition hover:text-neon-green">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="https://x.com/Sucheng0913" target="_blank" rel="noopener noreferrer" aria-label="X" class="transition hover:text-neon-green">
              <i class="fab fa-x-twitter"></i>
            </a>
            <a href="https://www.instagram.com/nj_1i6t_6" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="transition hover:text-neon-green">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="mailto:bochengsu@gmail.com" class="transition hover:text-neon-green" aria-label="Email">
              <i class="fas fa-envelope"></i>
            </a>
          </div>
        </div>
        <p class="mt-6 text-xs text-white/50">© 2026 蘇柏誠 Simon Su. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

useSeoMeta({
  title: '蘇柏誠 Simon Su | 跨域創新開發者作品集',
  description:
    '從機械工程跨域至 AI 開發的軟體工程師。專精於 Vue 3、Flask、Gemini AI 與智慧農業應用。',
  ogTitle: '蘇柏誠 Simon Su | 跨域創新開發者作品集',
  ogDescription:
    '從機械工程到 AI 開發的跨域創新者。專精於 Vue 3、Flask、Google Gemini AI、智慧農業應用。歡迎查看我的專案與經歷。',
  ogType: 'website',
  ogImage: 'https://bochengsu.com/assets/og-image.avif',
  twitterCard: 'summary_large_image',
  twitterImage: 'https://bochengsu.com/assets/og-image.avif',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: '蘇柏誠',
        alternateName: ['Simon Su', 'bochengsu', 'simonsu', 'subocheng', 'pocheng', 'bocheng'],
        url: 'https://bochengsu.com/',
        mainEntityOfPage: 'https://bochengsu.com/',
        image: 'https://bochengsu.com/assets/og-image.avif',
        jobTitle: '全端開發者 & AI 應用開發者',
        description: '從機械工程跨足到 AI 開發的創新者，專精於 Vue 3、Flask、Google Gemini AI、智慧農業應用',
        sameAs: [
          'https://github.com/nj1i6t6',
          'https://www.linkedin.com/in/柏誠-蘇-066816375',
          'https://x.com/Sucheng0913',
          'https://www.instagram.com/nj_1i6t_6',
        ],
        knowsAbout: [
          'Vue.js',
          'Python',
          'Flask',
          'AI 應用開發',
          'Google Gemini',
          '智慧農業',
          '全端開發',
          '機械工程',
        ],
      }),
    },
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: '蘇柏誠 Simon Su | 跨域創新開發者作品集',
        url: 'https://bochengsu.com/',
        inLanguage: 'zh-TW',
        publisher: {
          '@type': 'Person',
          name: '蘇柏誠',
          url: 'https://bochengsu.com/',
        },
      }),
    },
  ],
})

// GSAP 無障礙動畫
const { gsapFrom, prefersReducedMotion } = useGsapMotion()

onMounted(() => {
  // GSAP ScrollTrigger 動畫
  if (process.client && ScrollTrigger) {
    // Section 淡入動畫
    gsap.utils.toArray('section').forEach((section) => {
      gsapFrom(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          end: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      })
    })

    // 技能卡片交錯動畫
    gsap.utils.toArray('.skill-card').forEach((card, i) => {
      gsapFrom(card, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: prefersReducedMotion.value ? 0 : i * 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    })
  }
})

onBeforeUnmount(() => {
  // 清理 ScrollTrigger
  if (process.client && ScrollTrigger) {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }
})
</script>
