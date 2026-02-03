import { createError, defineEventHandler } from 'h3'
import { getClientIp } from '../utils/security'

type RateLimitEntry = {
  count: number
  resetAt: number
}

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000 // 15 minutes
const MAX_REQUESTS = 10
const rateLimitStore = new Map<string, RateLimitEntry>()

export default defineEventHandler((event) => {
  const path = event.node.req.url || ''
  const method = event.node.req.method || 'GET'

  if (!path.startsWith('/api/contact')) return
  if (method !== 'POST') return

  const ip = getClientIp(event)
  const key = `${ip}:contact`
  const now = Date.now()

  const entry = rateLimitStore.get(key)
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return
  }

  if (entry.count >= MAX_REQUESTS) {
    throw createError({
      statusCode: 429,
      message: 'Too many requests',
    })
  }

  entry.count += 1
  rateLimitStore.set(key, entry)

  if (rateLimitStore.size > 1000) {
    for (const [storeKey, value] of rateLimitStore.entries()) {
      if (now > value.resetAt) rateLimitStore.delete(storeKey)
    }
  }
})