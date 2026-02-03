// RESTful API: PUT /api/projects/:id - 更新專案（未來後端用）
// 預留接口，純前端專案暫不啟用

import { createError, readRawBody } from 'h3'
import { assertWriteEnabled, requireApiKey } from '../../utils/security'

const MAX_BODY_BYTES = 32 * 1024 // 32KB

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  assertWriteEnabled(config.enableProjectWrite)
  requireApiKey(event, config.projectWriteKey, 'Project write key required')

  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Project id is required',
    })
  }

  const rawBody = await readRawBody(event, false)
  if (!rawBody) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Body is required',
    })
  }
  if (rawBody.length > MAX_BODY_BYTES) {
    throw createError({
      statusCode: 413,
      statusMessage: 'Body too large',
    })
  }

  let body: Record<string, unknown>
  try {
    body = JSON.parse(rawBody)
  } catch {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid JSON body',
    })
  }

  // 未來可接 FastAPI: $fetch(runtimeConfig.apiBaseUrl + '/projects/' + id, { method: 'PUT', body })

  return {
    success: true,
    message: 'Project updated (mock)',
    data: {
      id,
      ...body,
      updatedAt: new Date().toISOString(),
    },
  }
})
