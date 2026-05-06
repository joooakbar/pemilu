import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import crypto from 'crypto'

const JWT_SECRET  = process.env.JWT_SECRET ?? 'dev-secret-GANTI-DI-PRODUCTION'
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN ?? '8h'
const COOKIE_NAME = process.env.COOKIE_NAME ?? 'evotis_token'

export interface JWTPayload {
  sub:  string
  role: string  // ADMIN | PANITIA | SAKSI | PENDING (temp token step 1)
  name: string
  iat?: number
  exp?: number
}

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, 12)
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash)
}

/** Sign JWT — expiry opsional, default dari .env */
export function signJWT(
  payload: Omit<JWTPayload, 'iat' | 'exp'>,
  expiresIn?: string
): string {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: expiresIn ?? JWT_EXPIRES,
  } as jwt.SignOptions)
}

export function verifyJWT(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge:   8 * 60 * 60,
    path:     '/',
  })
}

export async function clearAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}

export async function getAuthPayload(): Promise<JWTPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  const payload = verifyJWT(token)
  // Jangan return PENDING token sebagai session yang valid
  if (payload?.role === 'PENDING') return null
  return payload
}

export function generateOTP(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let result  = ''
  const bytes = crypto.randomBytes(6)
  for (let i = 0; i < 6; i++) result += chars[bytes[i] % chars.length]
  return result
}

export async function hashOTP(otp: string): Promise<string> {
  return bcrypt.hash(otp, 10)
}

export async function verifyOTP(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash)
}

export function compareOTP(plain : string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash)
}