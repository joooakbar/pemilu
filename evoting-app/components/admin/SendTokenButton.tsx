'use client'
import { useState } from 'react'
import { toast }    from 'sonner'
import { Button }   from '@/components/ui/button'
import { Loader2, Send, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react'

interface Props {
  electionId:    string
  electionStatus: string
}

export default function SendTokenButton({ electionId, electionStatus }: Props) {
  const [open,    setOpen]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [result,  setResult]  = useState<{
    generated?: number; waSent?: number; emailSent?: number; failed?: number; total?: number
  } | null>(null)

  const [opts, setOpts] = useState({
    generate:    true,
    via:         ['wa', 'email'] as string[],
    expiredJam:  24,
  })

  const toggleVia = (v: string) => setOpts(o => ({
    ...o, via: o.via.includes(v) ? o.via.filter(x => x !== v) : [...o.via, v],
  }))

  const run = async () => {
    if (opts.via.length === 0) { toast.error('Pilih minimal 1 metode pengiriman'); return }
    setLoading(true)
    setResult(null)

    try {
      // Step 1: generate tokens jika dipilih
      if (opts.generate) {
        const r1  = await fetch('/api/admin/tokens/generate', {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ electionId, expiredJam: opts.expiredJam }),
        })
        const j1 = await r1.json()
        if (!r1.ok) { toast.error(j1.error ?? 'Gagal generate token'); return }
        toast.success(`${j1.data.generated} token baru digenerate`)
      }

      // Step 2: broadcast
      const r2  = await fetch('/api/admin/tokens/broadcast', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ electionId, via: opts.via, expiredJam: opts.expiredJam }),
      })
      const j2 = await r2.json()
      if (!r2.ok) { toast.error(j2.error ?? 'Gagal kirim token'); return }

      setResult(j2.data)
      toast.success(`Token berhasil dikirim ke ${j2.data.waSent + j2.data.emailSent} pemilih`)
    } finally {
      setLoading(false)
    }
  }

  const isDisabled = !['ACTIVE', 'DRAFT'].includes(electionStatus)

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      {/* Header */}
      <button onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-secondary/30 transition-colors">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex-center shrink-0">
            <Send className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm">Kirim Token ke Pemilih</p>
            <p className="text-xs text-muted-foreground">Generate & broadcast token OTP via WhatsApp / Email</p>
          </div>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
      </button>

      {/* Panel */}
      {open && (
        <div className="border-t px-5 py-4 space-y-5">
          {isDisabled && (
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-sm text-amber-700">
              ⚠️ Status election harus <strong>DRAFT</strong> atau <strong>ACTIVE</strong> untuk mengirim token.
            </div>
          )}

          {/* Opsi generate */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" checked={opts.generate} onChange={e => setOpts(o => ({ ...o, generate: e.target.checked }))}
              className="mt-0.5 w-4 h-4 accent-primary" />
            <div>
              <p className="text-sm font-medium">Generate token baru terlebih dahulu</p>
              <p className="text-xs text-muted-foreground">Hapus token lama & buat token baru untuk semua pemilih yang belum memilih</p>
            </div>
          </label>

          {/* Kirim via */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Kirim melalui:</p>
            <div className="flex gap-3">
              {[
                { val: 'wa',    label: '📱 WhatsApp (Fonnte)',  desc: 'Pemilih yang punya nomor HP' },
                { val: 'email', label: '📧 Email',              desc: 'Pemilih yang punya alamat email' },
              ].map(({ val, label, desc }) => (
                <label key={val} className={`flex-1 cursor-pointer rounded-lg border p-3 transition-all ${
                  opts.via.includes(val) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'
                }`}>
                  <input type="checkbox" className="hidden" checked={opts.via.includes(val)}
                    onChange={() => toggleVia(val)} />
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </label>
              ))}
            </div>
          </div>

          {/* Masa berlaku */}
          <div className="flex items-center gap-3">
            <p className="text-sm font-medium shrink-0">Token berlaku:</p>
            <select value={opts.expiredJam}
              onChange={e => setOpts(o => ({ ...o, expiredJam: +e.target.value }))}
              className="h-9 rounded-md border border-input bg-background px-3 text-sm">
              {[6, 12, 24, 48, 72].map(h => <option key={h} value={h}>{h} jam</option>)}
            </select>
          </div>

          {/* Tombol kirim */}
          <Button onClick={run} disabled={loading || isDisabled} className="w-full gap-2" size="lg">
            {loading
              ? <><Loader2 className="w-4 h-4 animate-spin" />Mengirim...</>
              : <><Send className="w-4 h-4" />Kirim Token Sekarang</>
            }
          </Button>

          {/* Hasil */}
          {result && (
            <div className="rounded-lg bg-green-50 border border-green-200 p-4 space-y-2">
              <div className="flex items-center gap-2 text-green-700 font-semibold text-sm">
                <CheckCircle2 className="w-4 h-4" /> Pengiriman selesai
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                {[
                  { label: 'Total DPT', val: result.total },
                  { label: 'WA Terkirim', val: result.waSent },
                  { label: 'Email Terkirim', val: result.emailSent },
                  { label: 'Gagal', val: result.failed },
                ].map(({ label, val }) => (
                  <div key={label} className="bg-white rounded-md p-2 text-center border border-green-200">
                    <p className="font-bold text-base text-green-800">{val ?? 0}</p>
                    <p className="text-green-600">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
