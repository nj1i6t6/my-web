import { defineEventHandler, setCookie } from 'h3'
import { randomBytes } from 'crypto'

export default defineEventHandler((event) => {
  const token = randomBytes(32).toString('hex')
  const isProd = process.env.NODE_ENV === 'production'

  setCookie(event, 'csrf-token', token, {
    httpOnly: false,
    secure: isProd,
    sameSite: 'strict',
    path: '/',
  })

  return { token }
})