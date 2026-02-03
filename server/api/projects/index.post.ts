// RESTful API: POST /api/projects - 新增專案（未來後端用）
// 預留接口，純前端專案暫不啟用

import { createError, readRawBody } from 'h3'
import { assertWriteEnabled, requireApiKey } from '../../utils/security'

const MAX_BODY_BYTES = 32 * 1024 // 32KB

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  assertWriteEnabled(config.enableProjectWrite)
  requireApiKey(event, config.projectWriteKey, 'Project write key required')

  // 未來可接 FastAPI: $fetch(runtimeConfig.apiBaseUrl + '/projects', { method: 'POST', body })
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

  // 驗證必填欄位
  if (!body.title || !body.description) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Title and description are required',
    })
  }

  // Mock 回應（未來替換為真實 API）
  return {
    success: true,
    message: 'Project created (mock)',
    data: {
      id: `project-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
    },
  }
})
