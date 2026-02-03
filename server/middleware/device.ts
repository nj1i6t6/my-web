/**
 * Device Detection Middleware
 * 偵測使用者裝置類型（Mobile/Desktop）
 */

import { defineEventHandler, getHeader, type H3Event } from 'h3'

export default defineEventHandler((event: H3Event) => {
  const ua = getHeader(event, 'user-agent') || ''
  
  // 偵測 Mobile 裝置
  event.context.isMobile = /mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)
  
  // 偵測特定裝置類型
  event.context.isTablet = /ipad|android(?!.*mobile)|tablet/i.test(ua)
  event.context.isDesktop = !event.context.isMobile && !event.context.isTablet
  
  // 偵測瀏覽器
  event.context.browser = {
    isChrome: /chrome/i.test(ua) && !/edge/i.test(ua),
    isFirefox: /firefox/i.test(ua),
    isSafari: /safari/i.test(ua) && !/chrome/i.test(ua),
    isEdge: /edge/i.test(ua),
  }
})
