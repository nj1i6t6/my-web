<template>
  <div class="min-h-screen">
    <header class="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <a href="#home" class="text-lg font-semibold text-white">Simon Su</a>
        <button
          class="inline-flex items-center justify-center rounded-full border border-white/20 p-2 text-white lg:hidden"
          type="button"
          aria-label="Toggle navigation"
          @click="isMenuOpen = !isMenuOpen"
        >
          <i class="fas fa-bars"></i>
        </button>
        <nav class="hidden items-center gap-6 text-sm text-white/70 lg:flex">
          <a href="#home" class="transition hover:text-neon-green">首頁</a>
          <a href="#about" class="transition hover:text-neon-green">關於我</a>
          <a href="#skills" class="transition hover:text-neon-green">專業技能</a>
          <a href="#projects" class="transition hover:text-neon-green">作品集</a>
          <a href="#experience" class="transition hover:text-neon-green">經歷</a>
          <a href="#contact" class="transition hover:text-neon-green">聯繫我</a>
        </nav>
      </div>
      <div v-if="isMenuOpen" class="border-t border-white/10 bg-slate-950/95 lg:hidden">
        <div class="mx-auto grid max-w-6xl gap-4 px-4 py-4 text-sm text-white/70">
          <a href="#home" class="transition hover:text-neon-green" @click="isMenuOpen = false">首頁</a>
          <a href="#about" class="transition hover:text-neon-green" @click="isMenuOpen = false">關於我</a>
          <a href="#skills" class="transition hover:text-neon-green" @click="isMenuOpen = false">專業技能</a>
          <a href="#projects" class="transition hover:text-neon-green" @click="isMenuOpen = false">作品集</a>
          <a href="#experience" class="transition hover:text-neon-green" @click="isMenuOpen = false">經歷</a>
          <a href="#contact" class="transition hover:text-neon-green" @click="isMenuOpen = false">聯繫我</a>
        </div>
      </div>
    </header>

    <main>
      <section id="home" class="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-16">
        <div class="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p class="text-sm uppercase tracking-[0.35em] text-white/60">你好，我是</p>
            <h1 class="mt-4 text-4xl font-semibold text-white md:text-5xl">
              Simon Su <span class="block text-2xl text-white/70">蘇柏誠</span>
            </h1>
            <p class="mt-6 text-lg text-white/70">
              從機械工程到 AI 開發，用技術為傳統產業注入創新能量。
            </p>
            <div class="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                class="inline-flex items-center gap-2 rounded-full bg-neon-green/20 px-6 py-3 text-sm font-semibold text-neon-green shadow-neon-green transition hover:bg-neon-green/30"
              >
                <i class="fas fa-paper-plane"></i>
                聯繫我
              </a>
              <a
                href="#projects"
                class="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white/80 transition hover:border-neon-green hover:text-neon-green"
              >
                <i class="fas fa-folder-open"></i>
                查看作品
              </a>
            </div>
            <div class="mt-10 flex flex-wrap items-center gap-4 text-white/70">
              <a href="https://github.com/nj1i6t6" target="_blank" rel="noopener noreferrer" class="transition hover:text-neon-green" aria-label="GitHub - 個人首頁">
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
              <a href="#" class="transition hover:text-neon-green" aria-label="Email">
                <i class="fas fa-envelope text-lg"></i>
              </a>
            </div>
          </div>
          <div class="rounded-3xl border border-white/10 bg-slate-900/60 p-8 shadow-2xl shadow-black/50">
            <p class="text-sm uppercase tracking-[0.35em] text-white/60">儀表板互動</p>
            <h2 class="mt-4 text-2xl font-semibold text-white">汽車儀表板按鈕組</h2>
            <p class="mt-4 text-sm text-white/70">即時狀態與互動動畫展示</p>
            <div
              ref="dashboardRef"
              class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-5"
              aria-label="汽車儀表板狀態按鈕區塊"
            >
              <button
                v-for="item in gauges"
                :key="item.key"
                class="gauge-btn group flex flex-col items-center gap-3"
                type="button"
                :aria-label="item.aria"
              >
                <span
                  :class="[
                    'gauge-circle flex h-20 w-20 items-center justify-center rounded-full bg-steel-950 ring-2 shadow-lg shadow-black/40 transition duration-300 ease-out',
                    item.ringClass,
                    'group-hover:brightness-125',
                  ]"
                >
                  <span :class="['text-xs font-semibold tracking-wide', item.textClass]">{{ item.short }}</span>
                </span>
                <span class="text-xs font-medium text-white/80">{{ item.label }}</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" class="mx-auto max-w-6xl px-4 py-16">
        <div class="grid gap-10 lg:grid-cols-[0.45fr_0.55fr]">
          <div class="rounded-3xl border border-white/10 bg-slate-900/60 p-8">
            <p class="text-sm uppercase tracking-[0.35em] text-white/60">About Me</p>
            <h2 class="mt-4 text-2xl font-semibold text-white">關於我</h2>
            <div class="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-6">
              <div class="flex items-center gap-4">
                <div class="flex h-14 w-14 items-center justify-center rounded-full border border-white/15">
                  <i class="fas fa-code text-neon-green"></i>
                </div>
                <div>
                  <p class="text-lg font-semibold text-white">3+ 年經驗</p>
                  <p class="text-sm text-white/60">跨域實務累積</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 class="text-2xl font-semibold text-white">從機械到 AI，跨域創新的實踐者</h3>
            <p class="mt-4 text-white/70">
              嗨！我是蘇柏誠 Simon，目前就讀屏東科技大學，一位從汽車機械跨足到 AI 與智慧農業的開發者。從高職汽修科到大學機械系，再到獨立開發 AI 智慧畜牧管理平台，我深信技術能為傳統產業帶來革命性改變。
            </p>
            <p class="mt-4 text-white/70">
              我獨立開發的「領頭羊博士」整合了 Google Gemini AI、IoT 自動化與可驗證帳本技術，並於 2025 年入圍全國大專校院智慧創新暨跨域整合創作競賽決賽。從機械維修到全端開發，從車輛工程到 AI 決策系統，我享受挑戰與學習的過程。
            </p>
            <div class="mt-6 grid gap-4 sm:grid-cols-3">
              <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-center">
                <p class="text-2xl font-semibold text-white">7+</p>
                <p class="text-xs text-white/60">專業證照</p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-center">
                <p class="text-2xl font-semibold text-white">3</p>
                <p class="text-xs text-white/60">技術領域</p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-center">
                <p class="text-2xl font-semibold text-white">1</p>
                <p class="text-xs text-white/60">完整專案</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="skills" class="mx-auto max-w-6xl px-4 py-16">
        <div class="mb-8">
          <p class="text-sm uppercase tracking-[0.35em] text-white/60">Skills</p>
          <h2 class="mt-4 text-2xl font-semibold text-white">專業技能</h2>
        </div>
        <div class="grid gap-6 md:grid-cols-2">
          <div class="skill-card rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <div class="flex items-center gap-3">
              <i class="fas fa-laptop-code text-neon-green"></i>
              <h3 class="text-lg font-semibold text-white">Frontend Development</h3>
            </div>
            <div class="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
              <span class="rounded-full border border-white/15 px-3 py-1">Vue 3 (Composition API)</span>
              <span class="rounded-full border border-white/15 px-3 py-1">Vite</span>
              <span class="rounded-full border border-white/15 px-3 py-1">Pinia</span>
              <span class="rounded-full border border-white/15 px-3 py-1">Element Plus</span>
              <span class="rounded-full border border-white/15 px-3 py-1">ECharts</span>
              <span class="rounded-full border border-white/15 px-3 py-1">Chart.js</span>
              <span class="rounded-full border border-white/15 px-3 py-1">Axios</span>
              <span class="rounded-full border border-white/15 px-3 py-1">Vitest</span>
            </div>
          </div>
          <div class="skill-card rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <div class="flex items-center gap-3">
              <i class="fas fa-brain text-neon-green"></i>
              <h3 class="text-lg font-semibold text-white">Backend & AI Integration</h3>
            </div>
            <div class="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
              <span class="rounded-full border border-white/15 px-3 py-1">Python 3.11</span>
              <span class="rounded-full border border-white/15 px-3 py-1">Flask 3</span>
              <span class="rounded-full border border-white/15 px-3 py-1">Pydantic v2</span>
              <span class="rounded-full border border-white/15 px-3 py-1">SQLAlchemy 2</span>
              <span class="rounded-full border border-white/15 px-3 py-1">PostgreSQL</span>
              <span class="rounded-full border border-white/15 px-3 py-1">Redis</span>
              <span class="rounded-full border border-white/15 px-3 py-1">Parquet</span>
              <span class="rounded-full border border-white/15 px-3 py-1">Google Gemini SDK</span>
              <span class="rounded-full border border-white/15 px-3 py-1">FAISS</span>
              <span class="rounded-full border border-white/15 px-3 py-1">Scikit-learn</span>
              <span class="rounded-full border border-white/15 px-3 py-1">LightGBM</span>
              <span class="rounded-full border border-white/15 px-3 py-1">Pandas</span>
            </div>
          </div>
          <div class="skill-card rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <div class="flex items-center gap-3">
              <i class="fas fa-server text-neon-green"></i>
              <h3 class="text-lg font-semibold text-white">DevOps & Infrastructure</h3>
            </div>
            <div class="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
              <span class="rounded-full border border-white/15 px-3 py-1">Docker</span>
              <span class="rounded-full border border-white/15 px-3 py-1">Docker Compose</span>
              <span class="rounded-full border border-white/15 px-3 py-1">Nginx</span>
              <span class="rounded-full border border-white/15 px-3 py-1">Cloudflare</span>
              <span class="rounded-full border border-white/15 px-3 py-1">Pytest</span>
              <span class="rounded-full border border-white/15 px-3 py-1">Linux</span>
              <span class="rounded-full border border-white/15 px-3 py-1">Git</span>
            </div>
          </div>
          <div class="skill-card rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <div class="flex items-center gap-3">
              <i class="fas fa-shield-alt text-neon-green"></i>
              <h3 class="text-lg font-semibold text-white">Security & Specialized Tech</h3>
            </div>
            <div class="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
              <span class="rounded-full border border-white/15 px-3 py-1">HMAC</span>
              <span class="rounded-full border border-white/15 px-3 py-1">Hash Chain (Verifiable Ledger)</span>
              <span class="rounded-full border border-white/15 px-3 py-1">Mermaid</span>
            </div>
          </div>
        </div>
      </section>

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

      <section id="experience" class="mx-auto max-w-6xl px-4 py-16">
        <div class="mb-8">
          <p class="text-sm uppercase tracking-[0.35em] text-white/60">Experience</p>
          <h2 class="mt-4 text-2xl font-semibold text-white">經歷</h2>
        </div>
        <div class="space-y-6">
          <div class="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p class="text-xs uppercase tracking-[0.3em] text-white/50">2025</p>
            <h3 class="mt-2 text-lg font-semibold text-white">領頭羊博士 全端獨立開發</h3>
            <p class="text-sm text-white/60">專案經歷</p>
            <p class="mt-3 text-sm text-white/70">整合 AI 決策、IoT 自動化與產銷履歷的智慧畜牧管理平台。</p>
            <div class="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
              <span class="rounded-full border border-white/15 px-3 py-1">Vue 3</span>
              <span class="rounded-full border border-white/15 px-3 py-1">Flask 3</span>
              <span class="rounded-full border border-white/15 px-3 py-1">Google Gemini AI</span>
            </div>
          </div>
          <div class="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p class="text-xs uppercase tracking-[0.3em] text-white/50">2025</p>
            <h3 class="mt-2 text-lg font-semibold text-white">全國大專校院智慧創新暨跨域整合創作競賽</h3>
            <p class="text-sm text-white/60">競賽成就</p>
            <p class="mt-3 text-sm text-white/70">入圍晉級決賽</p>
            <div class="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
              <span class="rounded-full border border-white/15 px-3 py-1">智慧創新</span>
              <span class="rounded-full border border-white/15 px-3 py-1">跨域整合</span>
            </div>
          </div>
          <div class="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p class="text-xs uppercase tracking-[0.3em] text-white/50">2024/2 - 現在</p>
            <h3 class="mt-2 text-lg font-semibold text-white">屏東科技大學</h3>
            <p class="text-sm text-white/60">在學中</p>
            <p class="mt-3 text-sm text-white/70">持續精進技術能力，專注於智慧農業與 AI 應用開發。</p>
            <div class="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
              <span class="rounded-full border border-white/15 px-3 py-1">TQC 物聯網智慧應用及技術 實用級</span>
              <span class="rounded-full border border-white/15 px-3 py-1">ITS 網路安全管理核心能力</span>
              <span class="rounded-full border border-white/15 px-3 py-1">大型重型機車駕照</span>
            </div>
          </div>
          <div class="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p class="text-xs uppercase tracking-[0.3em] text-white/50">2022/9 - 2024/1</p>
            <h3 class="mt-2 text-lg font-semibold text-white">明志科技大學</h3>
            <p class="text-sm text-white/60">機械工程系 車輛組</p>
            <p class="mt-3 text-sm text-white/70">學習車輛工程與電動車技術。</p>
            <div class="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
              <span class="rounded-full border border-white/15 px-3 py-1">初級電動車機電整合工程師（經濟部）</span>
            </div>
          </div>
          <div class="rounded-3xl border border-white/10 bg-slate-900/60 p-6">
            <p class="text-xs uppercase tracking-[0.3em] text-white/50">2019/9 - 2022/6</p>
            <h3 class="mt-2 text-lg font-semibold text-white">中山工商</h3>
            <p class="text-sm text-white/60">汽車科</p>
            <p class="mt-3 text-sm text-white/70">奠定汽機車修護技術基礎。</p>
            <div class="mt-4 flex flex-wrap gap-2 text-xs text-white/70">
              <span class="rounded-full border border-white/15 px-3 py-1">乙級汽車修護技術士</span>
              <span class="rounded-full border border-white/15 px-3 py-1">丙級機器腳踏車修護技術士</span>
              <span class="rounded-full border border-white/15 px-3 py-1">普通小型車駕照（手排）</span>
            </div>
          </div>
        </div>
      </section>

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
            action="https://formspree.io/f/mojwjkvp"
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
              <div class="cf-turnstile" data-sitekey="0x4AAAAAACVKfkMQ9HT-AJPq" data-theme="auto"></div>
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
            <a href="#" class="transition hover:text-neon-green" aria-label="Email">
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
import { onMounted, onBeforeUnmount, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (process.client) {
  gsap.registerPlugin(ScrollTrigger)
}

definePageMeta({
  title: '蘇柏誠 Simon Su | 跨域創新開發者作品集 Portfolio',
})

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

const isMenuOpen = ref(false)
const dashboardRef = ref(null)

const gauges = [
  {
    key: 'oil',
    label: '油壓',
    short: 'OIL',
    aria: '油壓狀態按鈕',
    ringClass: 'ring-neon-green/70',
    textClass: 'text-neon-green',
  },
  {
    key: 'rpm',
    label: '轉速',
    short: 'RPM',
    aria: '轉速狀態按鈕',
    ringClass: 'ring-amber-400/70',
    textClass: 'text-amber-300',
  },
  {
    key: 'temp',
    label: '水溫',
    short: 'TEMP',
    aria: '水溫狀態按鈕',
    ringClass: 'ring-rose-400/70',
    textClass: 'text-rose-300',
  },
  {
    key: 'battery',
    label: '電池',
    short: 'BAT',
    aria: '電池狀態按鈕',
    ringClass: 'ring-emerald-400/70',
    textClass: 'text-emerald-300',
  },
  {
    key: 'brake',
    label: '煞車燈',
    short: 'BRAKE',
    aria: '煞車燈狀態按鈕',
    ringClass: 'ring-rose-400/70',
    textClass: 'text-rose-300',
  },
]

const { data: projects } = await useAsyncData('projects', () => $fetch('/api/projects'))
const projectsList = computed(() => projects.value ?? [])

let hoverListeners = []

onMounted(() => {
  // Gauge 按鈕 hover 動畫
  const buttons = dashboardRef.value?.querySelectorAll('.gauge-btn') || []

  hoverListeners = Array.from(buttons).map((button) => {
    const circle = button.querySelector('.gauge-circle')
    const onEnter = () => {
      gsap.to(circle, { rotate: 18, scale: 1.06, duration: 0.35, ease: 'power2.out' })
    }
    const onLeave = () => {
      gsap.to(circle, { rotate: 0, scale: 1, duration: 0.35, ease: 'power2.inOut' })
    }
    button.addEventListener('mouseenter', onEnter)
    button.addEventListener('mouseleave', onLeave)
    return { button, onEnter, onLeave }
  })

  // GSAP ScrollTrigger 動畫
  if (process.client && ScrollTrigger) {
    // Section 淡入動畫
    gsap.utils.toArray('section').forEach((section) => {
      gsap.from(section, {
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
      gsap.from(card, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        delay: i * 0.1,
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
  hoverListeners.forEach(({ button, onEnter, onLeave }) => {
    button.removeEventListener('mouseenter', onEnter)
    button.removeEventListener('mouseleave', onLeave)
  })
  hoverListeners = []
  
  // 清理 ScrollTrigger
  if (process.client && ScrollTrigger) {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }
})
</script>
