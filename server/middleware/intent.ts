// Edge Middleware: 智慧判定用戶意圖（HR vs 開發者）
export default defineEventHandler((event) => {
  const referrer = getHeader(event, 'referer') || ''
  const userAgent = getHeader(event, 'user-agent') || ''
  
  // 判定邏輯：來自 LinkedIn/招募平台 = hiring 模式
  // 其他來源 = dev（開發者/技術交流）模式
  const isFromLinkedIn = /linkedin\.com/i.test(referrer)
  const isFromJobSite = /indeed|glassdoor|yourator|104|1111/i.test(referrer)
  
  event.context.intentMode = (isFromLinkedIn || isFromJobSite) ? 'hiring' : 'dev'
  
  // 記錄裝置類型（可用於響應式優化）
  event.context.isMobile = /mobile|android|iphone/i.test(userAgent)
})
