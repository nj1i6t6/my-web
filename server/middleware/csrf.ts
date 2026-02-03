import { createError, defineEventHandler, getCookie, getHeader } from 'h3'

export default defineEventHandler((event) => {
  const method = event.node.req.method || 'GET'
  const path = event.node.req.url || ''

  if (!['POST', 'PUT', 'DELETE'].includes(method)) return
  if (!path.startsWith('/api/contact')) return

  const token = getCookie(event, 'csrf-token')
  const headerToken = getHeader(event, 'x-csrf-token')

  if (!token || !headerToken || token !== headerToken) {
    throw createError({
      statusCode: 403,
      message: 'Invalid CSRF token',
    })
  }
})