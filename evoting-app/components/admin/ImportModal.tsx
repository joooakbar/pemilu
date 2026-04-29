'use client'
import { useState, useRef } from 'react'
import { toast } from 'sonner'
import { Button }   from '@/components/ui/button'
import { Loader2, Upload } from 'lucide-react'

export default function ImportModal({ electionId }: { electionId?: string }) {
  const [open,    setOpen]    = useState(false)
  const [loading, setLoading] = useState(false)
  const [result,  setResult]  = useState<{ inserted: number; updated: number; total: number } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    setResult(null)
    const fd = new FormData()
    fd.append('file', file)
    if (electionId) fd.append('electionId', electionId)
    try {
      const res  = await fetch('/api/admin/dpt/import', { method: 'POST', body: fd })
      const json = await res.json()
      if (!res.ok) { toast.error(json.error); return }
      setResult(json.data)
      toast.success(`Import berhasil: ${json.data.inserted} baru, ${json.data.updated} diperbarui`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} className="gap-2">
        <Upload className="w-4 h-4" /> Import Excel/CSV
      </Button>

      {open && (
        <div className="fixed inset-0 z-50 flex-center bg-black/50" onClick={() => setOpen(false)}>
          <div className="bg-card rounded-xl p-6 w-full max-w-md shadow-xl space-y-4" onClick={e => e.stopPropagation()}>
            <h2 className="font-bold text-lg">Import DPT</h2>
            <div className="text-sm text-muted-foreground space-y-1">
              <p>Format kolom:</p>
              <code className="block bg-secondary p-2 rounded text-xs">
                Kolom A: NIK (16 digit) · B: Nama · C: No HP · D: Email
              </code>
            </div>
            <input ref={inputRef} type="file" accept=".xlsx,.csv" className="hidden" onChange={handleUpload} />
            <Button className="w-full gap-2" disabled={loading} onClick={() => inputRef.current?.click()}>
              {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Mengupload...</> : <><Upload className="w-4 h-4" /> Pilih File</>}
            </Button>
            {result && (
              <div className="bg-green-50 rounded-lg p-3 text-sm text-green-700">
                ✅ {result.inserted} baru · {result.updated} diperbarui · Total {result.total} baris
              </div>
            )}
            <Button variant="outline" className="w-full" onClick={() => setOpen(false)}>Tutup</Button>
          </div>
        </div>
      )}
    </>
  )
}
