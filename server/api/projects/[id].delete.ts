// RESTful API: DELETE /api/projects/:id - 刪除專案（未來後端用）
// 預留接口，純前端專案暫不啟用

import { createError } from 'h3'
import { assertWriteEnabled, requireApiKey } from '../../utils/security'

export default defineEventHandler((event) => {
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

  // 未來可接 FastAPI: $fetch(runtimeConfig.apiBaseUrl + '/projects/' + id, { method: 'DELETE' })

  return {
    success: true,
    message: `Project ${id} deleted (mock)`,
  }
})
