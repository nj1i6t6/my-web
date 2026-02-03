// RESTful API: GET /api/projects/:id - 取得單一專案詳情
// 未來可接 FastAPI: runtimeConfig.apiBaseUrl + '/projects/' + id

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')

  // Mock 資料（未來替換為真實 API call）
  const projects = [
    {
      id: 'dr-goat',
      title: '領頭羊博士 (Dr.Goat AI Agent)',
      description:
        '整合 AI 決策、IoT 自動化與產銷履歷的智慧畜牧管理平台。結合機械工程背景設計 IoT 感測器整合（溫濕度、重量監測），從硬體數據採集到 AI 決策的全栈整合。提供精準營養建議、生長預測、自動化餵食系統及可驗證帳本。',
      image: '/assets/Dashboard.avif',
      imageSmall: '/assets/Dashboard-560.avif',
      github: 'https://github.com/nj1i6t6/Dr.Goat-AI-Agent-BETA.git',
      tags: ['Vue 3', 'Flask 3', 'Google Gemini AI', 'PostgreSQL', 'Redis', 'Docker', 'LightGBM', 'FAISS'],
      features: [
        'AI 決策系統 (Google Gemini 1.5 Flash)',
        'IoT 感測器整合（溫濕度、重量）',
        '自動化餵食系統',
        '產銷履歷可驗證帳本 (HMAC Hash Chain)',
        '數據視覺化儀表板',
      ],
      techStack: {
        frontend: 'Vue 3 + Vite + Pinia + Element Plus',
        backend: 'Flask 3 + SQLAlchemy 2 + Pydantic v2',
        ai: 'Google Gemini SDK + FAISS + LightGBM',
        database: 'PostgreSQL + Redis',
        deployment: 'Docker + Nginx',
      },
    },
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
