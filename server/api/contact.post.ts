// @ts-nocheck
import nodemailer from 'nodemailer'
import type { H3Event } from 'h3'

/**
 * Contact API - 聯絡表單處理
 * 
 * 功能：
 * 1. Cloudflare Turnstile 驗證
 * 2. 簡易 Rate Limiting（記憶體快取）
 * 3. Nodemailer 郵件發送
 * 
 * TODO: 生產環境應使用 Redis 進行 Rate Limiting
 */

interface ContactBody {
  name: string
  email: string
  message: string
  token: string // Turnstile token
}

// 簡易記憶體快取（Rate Limiting）
const rateLimitCache = new Map<string, number>()
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 小時
const MAX_REQUESTS_PER_WINDOW = 3 // 每小時最多 3 次

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody<ContactBody>(event)
  const config = useRuntimeConfig(event)
  
  // 1. 基礎驗證
  if (!body.name || !body.email || !body.message || !body.token) {
    throw createError({
      statusCode: 400,
      message: '請填寫所有必填欄位'
    })
  }
  
  // 2. Email 格式驗證
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    throw createError({
      statusCode: 400,
      message: 'Email 格式不正確'
    })
  }
  
  // 3. Cloudflare Turnstile 驗證
  try {
    const turnstileResponse = await $fetch<{ success: boolean; 'error-codes'?: string[] }>(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: {
          secret: config.turnstileSecretKey,
          response: body.token
        }
      }
    )
    
    if (!turnstileResponse.success) {
      throw createError({
        statusCode: 400,
        message: 'CAPTCHA 驗證失敗，請重新整理頁面再試'
      })
    }
  } catch (error) {
    console.error('Turnstile verification error:', error)
    throw createError({
      statusCode: 500,
      message: 'CAPTCHA 驗證服務異常'
    })
  }
  
  // 4. Rate Limiting（簡易版）
  const clientIP = getHeader(event, 'x-forwarded-for') || 
                   getHeader(event, 'x-real-ip') || 
                   'unknown'
  
  const now = Date.now()
  const lastRequestTime = rateLimitCache.get(clientIP) || 0
  
  if (now - lastRequestTime < RATE_LIMIT_WINDOW) {
    throw createError({
      statusCode: 429,
      message: '請求過於頻繁，請稍後再試'
    })
  }
  
  rateLimitCache.set(clientIP, now)
  
  // 清理過期快取（每 100 次請求清理一次）
  if (rateLimitCache.size > 100) {
    for (const [ip, time] of rateLimitCache.entries()) {
      if (now - time > RATE_LIMIT_WINDOW) {
        rateLimitCache.delete(ip)
      }
    }
  }
  
  // 5. 發送郵件
  try {
    const transporter = nodemailer.createTransport({
      host: config.smtpHost,
      port: Number(config.smtpPort) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: config.smtpUser,
        pass: config.smtpPass
      }
    })
    
    // 郵件內容
    const mailOptions = {
      from: `"Portfolio Contact" <${config.smtpUser}>`,
      to: config.smtpUser,
      subject: `🔔 Portfolio 聯絡表單：${body.name}`,
      text: `
姓名：${body.name}
Email：${body.email}

訊息內容：
${body.message}

---
發送時間：${new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}
來源 IP：${clientIP}
      `,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00ff88; border-bottom: 2px solid #00ff88; padding-bottom: 10px;">
            📨 Portfolio 聯絡表單
          </h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>姓名：</strong> ${body.name}</p>
            <p><strong>Email：</strong> <a href="mailto:${body.email}">${body.email}</a></p>
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="margin-top: 0;">訊息內容：</h3>
            <p style="white-space: pre-wrap;">${body.message}</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 12px; color: #666;">
            <p>發送時間：${new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}</p>
            <p>來源 IP：${clientIP}</p>
          </div>
        </div>
      `
    }
    
    await transporter.sendMail(mailOptions)
    
    return {
      success: true,
      message: '訊息已成功送出！我會盡快回覆您。'
    }
  } catch (error) {
    console.error('Mail sending error:', error)
    throw createError({
      statusCode: 500,
      message: '郵件發送失敗，請稍後再試或直接發送 Email 至 bochengsu@gmail.com'
    })
  }
})
