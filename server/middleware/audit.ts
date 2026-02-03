import { defineEventHandler, getHeader, setHeader } from 'h3'
import { getClientIp, getRequestId } from '../utils/security'

export default defineEventHandler((event) => {
  const requestId = getRequestId(event)
  event.context.requestId = requestId
  setHeader(event, 'x-request-id', requestId)

  const start = Date.now()
  const method = event.node.req.method || 'GET'
  const path = event.node.req.url || '/'

  event.node.res.on('finish', () => {
    const durationMs = Date.now() - start
    const statusCode = event.node.res.statusCode
    const userAgent = getHeader(event, 'user-agent') || ''
    const ip = getClientIp(event)

    console.info(
      JSON.stringify({
        level: 'info',
        requestId,
        method,
        path,
        statusCode,
        durationMs,
        ip,
        userAgent,
      })
    )
  })
})