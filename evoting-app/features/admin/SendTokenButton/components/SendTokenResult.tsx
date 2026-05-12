'use client'

import { CheckCircle2 } from 'lucide-react'
import type { SendTokenResultData } from '../types/send-token.types'

export default function SendTokenResult({
  result,
}: {
  result: SendTokenResultData
}) {
  return (
    <div className="rounded-lg bg-green-50 border border-green-200 p-4 space-y-2">
      <div className="flex items-center gap-2 text-green-700 font-semibold text-sm">
        <CheckCircle2 className="w-4 h-4" />
        Pengiriman selesai
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        {[
          { label: 'Total DPT', val: result.total },
          { label: 'WA', val: result.waSent },
          { label: 'Email', val: result.emailSent },
          { label: 'Gagal', val: result.failed },
        ].map(({ label, val }) => (
          <div
            key={label}
            className="bg-white rounded-md p-2 text-center border border-green-200"
          >
            <p className="font-bold text-base text-green-800">
              {val ?? 0}
            </p>

            <p className="text-green-600">
              {label}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}