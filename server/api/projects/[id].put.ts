// RESTful API: PUT /api/projects/:id - 更新專案（未來後端用）
// 預留接口，純前端專案暫不啟用

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const body = await readBody(event)

  // 未來可接 FastAPI: $fetch(runtimeConfig.apiBaseUrl + '/projects/' + id, { method: 'PUT', body })

  return {
    success: true,
    message: 'Project updated (mock)',
    data: {
      id,
      ...body,
      updatedAt: new Date().toISOString(),
    },
  }
})
