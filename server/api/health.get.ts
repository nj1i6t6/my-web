// Health Check API: GET /api/health
// 檢查 API 狀態，未來可檢查後端連線

export default defineEventHandler(() => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
  }
})
