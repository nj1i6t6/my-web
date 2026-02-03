import { defineEventHandler, getRequestURL, setHeader } from 'h3'

export default defineEventHandler((event) => {
  const isProd = process.env.NODE_ENV === 'production'
  const url = getRequestURL(event)

  setHeader(event, 'X-Content-Type-Options', 'nosniff')
  setHeader(event, 'X-Frame-Options', 'DENY')
  setHeader(event, 'Referrer-Policy', 'strict-origin-when-cross-origin')
  setHeader(event, 'Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
  setHeader(event, 'X-DNS-Prefetch-Control', 'off')
  setHeader(event, 'Cross-Origin-Opener-Policy', 'same-origin')
  setHeader(event, 'Cross-Origin-Resource-Policy', 'same-site')

  if (isProd && url.protocol === 'https:') {
    setHeader(event, 'Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload')
  }

  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'none'",
    "form-action 'self' https://formspree.io",
    "script-src 'self' https://challenges.cloudflare.com https://static.cloudflareinsights.com",
    "style-src 'self' https://fonts.googleapis.com https://cdnjs.cloudflare.com",
    "font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com",
    "img-src 'self' data: https:",
    "connect-src 'self' https://formspree.io https://cloudflareinsights.com https://challenges.cloudflare.com https://*.cloudflare.com",
    "frame-src https://challenges.cloudflare.com https://*.cloudflare.com",
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    ...(isProd ? ['upgrade-insecure-requests'] : []),
  ].join('; ')

  setHeader(event, 'Content-Security-Policy', csp)
})