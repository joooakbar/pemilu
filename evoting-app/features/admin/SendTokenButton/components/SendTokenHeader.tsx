'use client'

import { ChevronDown, ChevronUp, Send } from 'lucide-react'

interface Props {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SendTokenHeader({ open, setOpen }: Props) {
  return (
    <button
      onClick={() => setOpen(v => !v)}
      className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/30 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-100 flex-center shrink-0">
          <Send className="w-5 h-5 text-blue-600" />
        </div>

        <div className="text-left">
          <p className="font-semibold text-sm">
            Kirim Token ke Pemilih
          </p>

          <p className="text-xs text-muted-foreground">
            Generate & broadcast token OTP
          </p>
        </div>
      </div>

      {open
        ? <ChevronUp className="w-4 h-4 text-muted-foreground" />
        : <ChevronDown className="w-4 h-4 text-muted-foreground" />
      }
    </button>
  )
}