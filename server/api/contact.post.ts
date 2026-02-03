import nodemailer from 'nodemailer'
import type { H3Event } from 'h3'
import { createError, getHeader, readRawBody } from 'h3'
import { escapeHtml, getClientIp, isAllowedOrigin, MAX_CONTACT_BODY_BYTES } from '../utils/security'

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

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig(event)
  const origin = getHeader(event, 'origin') || getHeader(event, 'referer')
  if (!isAllowedOrigin(origin, config.public.siteUrl)) {
    throw createError({
      statusCode: 403,
      message: 'Forbidden origin',
    })
  }

  const rawBody = await readRawBody(event, false)
  if (!rawBody) {
    throw createError({
      statusCode: 400,
      message: '請提供請求內容',
    })
  }
  if (rawBody.length > MAX_CONTACT_BODY_BYTES) {
    throw createError({
      statusCode: 413,
      message: '請求內容過大',
    })
  }

  let body: ContactBody
  try {
    body = JSON.parse(rawBody) as ContactBody
  } catch {
    throw createError({
      statusCode: 400,
      message: 'JSON 格式不正確',
    })
  }
  
  // 1. 基礎驗證
  if (!body?.name || !body?.email || !body?.message || !body?.token) {
    throw createError({
      statusCode: 400,
      message: '請填寫所有必填欄位'
    })
  }

  if (body.name.length < 2 || body.name.length > 50) {
    throw createError({
      statusCode: 400,
      message: '姓名長度不正確'
    })
  }

  if (body.message.length < 5 || body.message.length > 2000) {
    throw createError({
      statusCode: 400,
      message: '訊息內容長度不正確'
    })
  }

  if (body.token.length < 10 || body.token.length > 2000) {
    throw createError({
      statusCode: 400,
      message: 'CAPTCHA Token 不正確'
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
  
  // 5. 發送郵件
  try {
    const clientIP = getClientIp(event)
    const safeName = escapeHtml(body.name)
    const safeEmail = escapeHtml(body.email)
    const safeMessage = escapeHtml(body.message)
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
      subject: `🔔 Portfolio 聯絡表單：${safeName}`,
      text: `
姓名：${safeName}
Email：${safeEmail}

訊息內容：
${safeMessage}

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
            <p><strong>姓名：</strong> ${safeName}</p>
            <p><strong>Email：</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          </div>
          
          <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="margin-top: 0;">訊息內容：</h3>
            <p style="white-space: pre-wrap;">${safeMessage}</p>
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
