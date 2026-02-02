# 🚀 Simon Su Portfolio - Nuxt 4 + Tailwind + GSAP

> 機械工程師跨域 AI 開發的作品集網站 | 純前端 + SEO 優化 + Cloudflare Ready

歡迎訪問我的個人作品集網站：
- 官方域名：[https://bochengsu.com/](https://bochengsu.com/)
- 中文域名：[https://蘇柏誠.tw/](https://蘇柏誠.tw/) (301 重定向至 bochengsu.com)

## ✨ 專案特色

- **Nuxt 4** - 最新 Vue 全端框架
- **Tailwind CSS** - 響應式設計系統
- **GSAP ScrollTrigger** - 高效能滾動動畫
- **SEO 完整** - useSeoMeta + JSON-LD + sitemap
- **Cloudflare Ready** - CSP + prerender + 安全標頭
- **RESTful API 預留** - 完整 CRUD mock，未來可接後端

## 📁 專案結構

```
├── app/                    # 頁面目錄 (Nuxt 4 pages)
│   ├── dashboard.vue      # 首頁 + 儀表板
│   ├── projects.vue       # 作品集頁面
│   └── index.vue          # 路由入口
├── server/api/            # Nitro API (RESTful 預留)
│   ├── projects.get.ts    # GET /api/projects
│   ├── projects/
│   │   ├── [id].get.ts    # GET /api/projects/:id
│   │   ├── [id].put.ts    # PUT /api/projects/:id (預留)
│   │   ├── [id].delete.ts # DELETE /api/projects/:id (預留)
│   │   └── index.post.ts  # POST /api/projects (預留)
│   └── health.get.ts      # GET /api/health
├── assets/css/            # 全域樣式
├── Image/                 # 圖片資源 (映射到 /assets)
├── public/                # 靜態資源
│   ├── sitemap.xml        # SEO sitemap
│   └── robots.txt         # 搜尋引擎規則
├── .env.example           # 環境變數範本
├── nuxt.config.ts         # Nuxt 配置
├── tailwind.config.js     # Tailwind 配置
└── AGENTS.md              # MCP Agent 配置
```

## 🛠️ 安裝與運行

```bash
# 安裝依賴
npm install

# 開發模式（熱重載）
npm run dev

# 生產建置
npm run build

# 預覽生產版本
npm run preview

# 靜態生成（Cloudflare Pages）
npm run generate
```

## 🌐 部署到 Cloudflare Pages

### 環境變數

在 Cloudflare Pages 儀表板設定：

```env
NUXT_PUBLIC_SITE_URL=https://bochengsu.com
NUXT_PUBLIC_API_BASE_URL=/api
NUXT_PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your_form_id
```

## 🔐 安全特性

- **CSP (Content Security Policy)** - 防止 XSS 攻擊
- **HSTS** - 強制 HTTPS
- **Cloudflare Turnstile** - 表單驗證（已預留）
- **Rate Limiting** - API 速率限制（後端預留）

## 📊 SEO 優化

- ✅ useSeoMeta（每頁自訂）
- ✅ JSON-LD 結構化資料（Person + WebSite）
- ✅ Open Graph + Twitter Card
- ✅ Sitemap.xml + Robots.txt
- ✅ Canonical URLs
- ✅ 圖片 srcset（AVIF 優化）

## 🎨 動畫系統 (GSAP ScrollTrigger)

- Section 淡入動畫（進入視窗時觸發）
- 技能卡片交錯動畫
- 儀表板 hover 旋轉效果

## 🔗 API 架構（未來擴展）

### 目前：純前端 Mock API

```typescript
// server/api/projects.get.ts
export default defineEventHandler(() => [
  { id: 'dr-goat', title: '...', tags: [...] }
])
```

### 未來：接後端 FastAPI

```bash
# 只需修改 .env
NUXT_PUBLIC_API_BASE_URL=https://api.yourdomain.com
```

## 📦 技術棧

- **Frontend**: Vue 3 Composition API, Nuxt 4, Tailwind CSS, GSAP
- **Backend (預留)**: Nitro API, FastAPI 整合
- **部署**: Cloudflare Pages, Nitro Prerendering
- **SEO**: JSON-LD, Open Graph, sitemap
- **安全**: CSP, HSTS, Turnstile (可選)

## 🔗 連結

- GitHub: [https://github.com/nj1i6t6](https://github.com/nj1i6t6)
- LinkedIn: [柏誠-蘇](https://www.linkedin.com/in/柏誠-蘇-066816375)

---

**Built with** ❤️ **by Simon Su | 機械跨域 AI 的創新實踐者**