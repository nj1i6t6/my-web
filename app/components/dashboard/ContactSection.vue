<template>
  <section id="contact" class="mx-auto max-w-6xl px-4 py-16">
    <div class="mb-8">
      <p class="text-sm uppercase tracking-[0.35em] text-white/60">Contact</p>
      <h2 class="mt-4 text-2xl font-semibold text-white">聯繫我</h2>
    </div>
    <div class="grid gap-8 lg:grid-cols-[0.45fr_0.55fr]">
      <div class="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
        <h3 class="text-lg font-semibold text-white">讓我們聊聊</h3>
        <p class="mt-4 text-white/70">
          無論您是想討論專案合作、工作機會，或只是想打個招呼，
          我都很樂意收到您的來信！
        </p>
        <div class="mt-6 space-y-4 text-sm text-white/70">
          <div class="flex items-center gap-3">
            <i class="fas fa-envelope text-neon-green"></i>
            <div>
              <p class="text-xs uppercase tracking-[0.3em] text-white/50">Email</p>
              <a href="#" class="text-white/80">&nbsp;</a>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <i class="fas fa-map-marker-alt text-neon-green"></i>
            <div>
              <p class="text-xs uppercase tracking-[0.3em] text-white/50">位置</p>
              <span>台灣</span>
            </div>
          </div>
          <div class="flex items-center gap-3">
            <i class="fas fa-globe text-neon-green"></i>
            <div>
              <p class="text-xs uppercase tracking-[0.3em] text-white/50">網站</p>
              <a href="https://bochengsu.com" class="text-white/80">bochengsu.com</a>
            </div>
          </div>
        </div>
        <div class="mt-6 flex gap-3 text-white/70">
          <a href="https://github.com/nj1i6t6" target="_blank" rel="noopener noreferrer" class="transition hover:text-neon-green" aria-label="GitHub - 社群連結">
            <i class="fab fa-github text-lg"></i>
          </a>
          <a href="https://www.linkedin.com/in/柏誠-蘇-066816375" target="_blank" rel="noopener noreferrer" class="transition hover:text-neon-green" aria-label="LinkedIn">
            <i class="fab fa-linkedin-in text-lg"></i>
          </a>
          <a href="https://x.com/Sucheng0913" target="_blank" rel="noopener noreferrer" class="transition hover:text-neon-green" aria-label="X">
            <i class="fab fa-x-twitter text-lg"></i>
          </a>
          <a href="https://www.instagram.com/nj_1i6t_6" target="_blank" rel="noopener noreferrer" class="transition hover:text-neon-green" aria-label="Instagram">
            <i class="fab fa-instagram text-lg"></i>
          </a>
        </div>
      </div>
      <form
        class="rounded-3xl border border-white/10 bg-slate-900/60 p-6"
        id="contact-form"
        :action="formspreeAction"
        method="POST"
      >
        <div class="grid gap-4">
          <label class="text-xs uppercase tracking-[0.3em] text-white/50" for="name">姓名</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="您的姓名"
            class="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-white/40"
          />
          <label class="text-xs uppercase tracking-[0.3em] text-white/50" for="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="your@email.com"
            class="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-white/40"
          />
          <label class="text-xs uppercase tracking-[0.3em] text-white/50" for="subject">主旨</label>
          <input
            id="subject"
            name="subject"
            type="text"
            placeholder="想討論什麼？"
            class="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-white/40"
          />
          <label class="text-xs uppercase tracking-[0.3em] text-white/50" for="message">訊息</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            required
            placeholder="您的訊息..."
            class="rounded-2xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white placeholder:text-white/40"
          ></textarea>
          <input type="text" name="_gotcha" class="hidden" tabindex="-1" autocomplete="off" />
          <div class="cf-turnstile" :data-sitekey="turnstileSiteKey" data-theme="auto"></div>
          <button
            type="submit"
            class="inline-flex items-center justify-center gap-2 rounded-full bg-neon-green/20 px-6 py-3 text-sm font-semibold text-neon-green shadow-neon-green transition hover:bg-neon-green/30"
          >
            <i class="fas fa-paper-plane"></i>
            發送訊息
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
// Contact Section - 聯絡表單區塊
const config = useRuntimeConfig()
const formspreeAction = computed(() => config.public.formspreeEndpoint || 'https://formspree.io/f/mojwjkvp')
const turnstileSiteKey = computed(() => config.public.turnstileSiteKey || '')
</script>
