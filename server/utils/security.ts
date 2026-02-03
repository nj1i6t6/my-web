import { createError, getHeader, getRequestIP, type H3Event } from 'h3'
import { randomUUID } from 'crypto'

export const MAX_CONTACT_BODY_BYTES = 16 * 1024 // 16KB

export function getClientIp(event: H3Event): string {
  const cfConnectingIp = getHeader(event, 'cf-connecting-ip')
  const xForwardedFor = getHeader(event, 'x-forwarded-for')?.split(',')[0]?.trim()
  const xRealIp = getHeader(event, 'x-real-ip')
  return (
    cfConnectingIp ||
    xForwardedFor ||
    xRealIp ||
    getRequestIP(event) ||
    event.node.req.socket.remoteAddress ||
    'unknown'
  )
}

export function getRequestId(event: H3Event): string {
  const existing = getHeader(event, 'x-request-id')
  if (existing) return existing
  return randomUUID()
}

export function requireApiKey(event: H3Event, expectedKey: string, message?: string) {
  const authHeader = getHeader(event, 'authorization') || ''
  const xApiKey = getHeader(event, 'x-api-key') || ''
  const bearer = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : ''

  const provided = bearer || xApiKey
  if (!expectedKey || !provided || provided !== expectedKey) {
    throw createError({
      statusCode: 401,
      message: message || 'Unauthorized',
    })
  }
}

export function assertWriteEnabled(isEnabled: boolean) {
  if (!isEnabled) {
    throw createError({
      statusCode: 403,
      message: 'Write endpoints are disabled',
    })
  }
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function isAllowedOrigin(origin: string | undefined, siteUrl: string): boolean {
  if (!origin) return true
  try {
    const originHost = new URL(origin).host
    const siteHost = new URL(siteUrl).host
    return originHost === siteHost
  } catch {
    return false
  }
}