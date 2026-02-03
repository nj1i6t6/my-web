// RESTful API: DELETE /api/projects/:id - 刪除專案（未來後端用）
// 預留接口，純前端專案暫不啟用

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')

  // 未來可接 FastAPI: $fetch(runtimeConfig.apiBaseUrl + '/projects/' + id, { method: 'DELETE' })

  return {
    success: true,
    message: `Project ${id} deleted (mock)`,
  }
})
