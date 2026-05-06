import { NextRequest } from 'next/server'
import { handleResendOtp } from './handler'

export async function POST(req: NextRequest) {
  return handleResendOtp(req)
}