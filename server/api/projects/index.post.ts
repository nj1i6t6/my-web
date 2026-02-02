// RESTful API: POST /api/projects - 新增專案（未來後端用）
// 預留接口，純前端專案暫不啟用

export default defineEventHandler(async (event) => {
  // 未來可接 FastAPI: $fetch(runtimeConfig.apiBaseUrl + '/projects', { method: 'POST', body })
  
  const body = await readBody(event)
  
  // 驗證必填欄位
  if (!body.title || !body.description) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title and description are required',
    })
  }

  // Mock 回應（未來替換為真實 API）
  return {
    success: true,
    message: 'Project created (mock)',
    data: {
      id: `project-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
    },
  }
})
