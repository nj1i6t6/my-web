// RESTful API: GET /api/projects/:id - 取得單一專案詳情
// 未來可接 FastAPI: runtimeConfig.apiBaseUrl + '/projects/' + id

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')

  // Mock 資料（與 projects.get.ts 同步）
  const projects = [
    {
      id: 'dr-goat',
      title: '領頭羊博士 (Dr.Goat AI Agent)',
      subtitle: '整合 AI 決策、IoT 自動化與產銷履歷的智慧畜牧管理平台',
      description:
        '整合 AI 決策、IoT 自動化與產銷履歷的智慧畜牧管理平台。結合機械工程背景設計 IoT 感測器整合（溫濕度、重量監測），從硬體數據採集到 AI 決策的全栈整合。',
      image: '/assets/Dashboard.avif',
      imageSmall: '/assets/Dashboard-560.avif.avif',
      github: 'https://github.com/nj1i6t6/Dr.Goat-AI-Agent-BETA.git',
      tags: ['Vue 3', 'Flask 3', 'Google Gemini AI', 'PostgreSQL', 'Redis', 'Docker', 'LightGBM', 'FAISS'],
      situation: '傳統畜牧業面臨人力短缺、疾病預防困難、飼養成本高昂等問題。農民缺乏即時數據分析工具，難以做出最佳決策，導致生產效率低落。',
      task: '開發一套整合 IoT 感測器、AI 決策引擎、自動化控制系統的智慧畜牧平台，實現從數據採集、分析到執行的全自動化流程。',
      actions: [
        '設計並部署 IoT 感測器網路，實時監測環境溫濕度、動物體重、飼料消耗',
        '使用 Google Gemini AI 建立決策引擎，提供精準營養建議與生長預測',
        '整合 LightGBM 機器學習模型進行疾病風險預測',
        '開發自動化餵食系統，根據 AI 建議自動調整飼料配方',
        '建立產銷履歷系統，提供完整可追溯性',
        '使用 Docker 容器化部署，確保系統穩定性與可擴展性'
      ],
      results: [
        { value: '40%', label: '飼料成本降低' },
        { value: '30%', label: '疾病發生率減少' },
        { value: '25%', label: '生長速度提升' },
        { value: '60%', label: '人力成本節省' },
        { value: '95%', label: '決策準確率' },
        { value: '24/7', label: '全天候監控' }
      ]
    },
    {
      id: 'smart-agriculture',
      title: '智慧農業監控系統',
      subtitle: '基於機器學習的作物生長預測與自動化灌溉系統',
      description: '結合環境感測器與機器學習，實現智慧化農業管理。自動調節灌溉、施肥，優化作物生長環境。',
      image: '/assets/Dashboard.avif',
      imageSmall: '/assets/Dashboard-560.avif.avif',
      github: 'https://github.com/nj1i6t6',
      tags: ['Python', 'TensorFlow', 'IoT', 'MQTT', 'Raspberry Pi'],
      situation: '傳統農業依賴人工經驗判斷灌溉時機，容易造成水資源浪費或作物缺水，影響產量與品質。',
      task: '建立智慧化監控系統，透過感測器數據與機器學習預測作物需求，自動執行灌溉與施肥。',
      actions: [
        '部署土壤濕度、溫度、光照強度等多維度感測器',
        '使用 TensorFlow 建立 LSTM 時序預測模型',
        '開發 MQTT 通訊協議實現即時數據傳輸',
        '設計自動化控制系統，根據預測結果調節灌溉',
        '建立 Web 儀表板提供即時監控與歷史數據分析'
      ],
      results: [
        { value: '35%', label: '用水量減少' },
        { value: '20%', label: '產量提升' },
        { value: '50%', label: '人工巡檢減少' }
      ]
    },
    {
      id: 'portfolio-website',
      title: '個人品牌網站',
      subtitle: 'Nuxt 4 + Tailwind + GSAP 打造的高性能作品集',
      description: '採用最新技術棧打造的個人品牌網站，展示跨域開發能力。包含 Edge Middleware、Blueprint 設計系統、IoT 模擬器等創新功能。',
      image: '/assets/og-image.avif',
      imageSmall: '/assets/og-image.avif',
      github: 'https://github.com/nj1i6t6/my-web',
      tags: ['Nuxt 4', 'Vue 3', 'Tailwind CSS', 'GSAP', 'Cloudflare Pages'],
      situation: '需要一個能夠展示技術深度、設計美學與創新思維的個人品牌網站，以吸引潛在合作機會。',
      task: '建立一個高性能、高互動性、具備獨特設計風格的作品集網站，整合 SEO、無障礙與安全性最佳實踐。',
      actions: [
        '採用 Nuxt 4 + Cloudflare Pages 實現極致效能',
        '設計 Blueprint 工程美學風格，展現機械背景',
        '開發 Edge Middleware 實現智慧意圖判定（HR vs 開發者模式）',
        '建立 IoT 模擬器展示系統設計能力',
        '整合 Turnstile + Nodemailer 實現安全聯絡表單',
        '使用 GSAP 打造流暢動畫體驗'
      ],
      results: [
        { value: '95+', label: 'Lighthouse 分數' },
        { value: '< 1s', label: '首屏載入時間' },
        { value: '100%', label: '無障礙合規' }
      ]
    }
  ]

  const project = projects.find((p) => p.id === id)

  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Project Not Found',
    })
  }

  return project
})
