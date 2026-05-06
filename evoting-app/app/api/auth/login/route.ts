import { NextRequest } from 'next/server'
import { handleLogin } from './handler'

export async function POST(req: NextRequest) {
  return handleLogin(req)
}