// @ts-nocheck
export default defineNuxtConfig({
  compatibilityDate: '2026-02-02',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  
  dir: {
    pages: 'app',
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-TW',
      },
      title: '蘇柏誠 Simon Su | 跨域創新開發者作品集 Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          'http-equiv': 'Content-Security-Policy',
          content:
            "default-src 'self'; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com https://*.cloudflare.com https://cdnjs.cloudflare.com https://static.cloudflareinsights.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdnjs.cloudflare.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; connect-src 'self' https://formspree.io https://cloudflareinsights.com https://challenges.cloudflare.com https://*.cloudflare.com; img-src 'self' data: https:; frame-src https://challenges.cloudflare.com https://*.cloudflare.com; worker-src 'self' blob:; form-action 'self' https://formspree.io;",
        },
        {
          name: 'description',
          content:
            '蘇柏誠 Simon Su (subocheng / bochengsu) - 從機械工程跨域至 AI 開發的軟體工程師。專精於 Vue 3、Flask、Gemini AI 與智慧農業應用。歡迎瀏覽我的作品集。',
        },
        {
          name: 'keywords',
          content:
            '蘇柏誠, Simon Su, simonsu, bochengsu, subocheng, pocheng, bocheng, 全端開發, Vue 3, Flask, Python, AI, 智慧農業, 機械工程, 跨域創新, 作品集, Portfolio',
        },
        { name: 'author', content: 'Simon Su (蘇柏誠)' },
        {
          name: 'robots',
          content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://bochengsu.com/' },
        { property: 'og:title', content: '蘇柏誠 Simon Su | 跨域創新開發者作品集' },
        {
          property: 'og:description',
          content: '從機械工程到 AI 開發的跨域創新者。專精於 Vue 3、Flask、Google Gemini AI、智慧農業應用。歡迎查看我的專案與經歷。',
        },
        { property: 'og:image', content: 'https://bochengsu.com/assets/og-image.avif' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        { property: 'og:image:type', content: 'image/avif' },
        { property: 'og:image:alt', content: '蘇柏誠 Simon Su 跨域創新開發者作品集預覽圖' },
        { property: 'og:site_name', content: 'Simon Su Portfolio' },
        { property: 'og:locale', content: 'zh_TW' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: 'https://bochengsu.com/' },
        { name: 'twitter:title', content: '蘇柏誠 Simon Su | 跨域創新開發者作品集' },
        {
          name: 'twitter:description',
          content: '從機械工程到 AI 開發的跨域創新者。專精於 Vue 3、Flask、Google Gemini AI、智慧農業應用。',
        },
        { name: 'twitter:image', content: 'https://bochengsu.com/assets/og-image.avif' },
        { name: 'twitter:image:alt', content: '蘇柏誠 Simon Su 跨域創新開發者作品集預覽圖' },
        { name: 'twitter:creator', content: '@Sucheng0913' },
        { name: 'theme-color', content: '#0b0f19' },
        { name: 'apple-mobile-web-app-title', content: 'Simon Su' },
        { name: 'application-name', content: 'Simon Su' },
      ],
      link: [
        { rel: 'canonical', href: 'https://bochengsu.com/' },
        { rel: 'alternate', hreflang: 'zh-TW', href: 'https://bochengsu.com/' },
        { rel: 'alternate', hreflang: 'x-default', href: 'https://bochengsu.com/' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Noto+Sans+TC:wght@400;700&display=swap',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
      script: [
        {
          src: 'https://challenges.cloudflare.com/turnstile/v0/api.js',
          async: true,
          defer: true,
        },
      ],
    },
  },
  nitro: {
    publicAssets: [
      { dir: 'Image', baseURL: '/assets' },
    ],
    prerender: {
      crawlLinks: true,
      routes: ['/', '/projects'],
    },
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://bochengsu.com',
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || '/api',
      formspreeEndpoint: process.env.NUXT_PUBLIC_FORMSPREE_ENDPOINT || '',
    },
  },
  routeRules: {
    '/': { prerender: true },
    '/projects': { prerender: true },
  },
})
