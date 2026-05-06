import { NextRequest } from 'next/server'
import { handleVerifyOtp } from './handler'

export async function POST(req: NextRequest) {
  return handleVerifyOtp(req)
}