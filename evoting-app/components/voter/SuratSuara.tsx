'use client'
import { useState }    from 'react'
import { useRouter }   from 'next/navigation'
import Image           from 'next/image'
import { toast }       from 'sonner'
import { Button }      from '@/components/ui/button'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { cn }          from '@/lib/utils'
import type { KandidatSanity } from '@/types'

interface Kandidat {
  id:        string
  nomorUrut: number
  nama:      string
  sanityData?: KandidatSanity
}

export default function SuratSuara({ kandidat, electionId }: { kandidat: Kandidat[]; electionId: string }) {
  const router   = useRouter()
  const [pilihan, setPilihan] = useState<string | null>(null)
  const [confirm, setConfirm] = useState(false)
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    const nik        = sessionStorage.getItem('voter_nik')    ?? ''
    const tokenId    = sessionStorage.getItem('voter_tokenId') ?? ''
    if (!nik || !tokenId || !pilihan) { toast.error('Session tidak valid'); return }

    setLoading(true)
    const res  = await fetch('/api/vote/submit', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nik, tokenId, kandidatRefId: pilihan, electionId }),
    })
    const json = await res.json()
    if (!res.ok) { toast.error(json.error); setLoading(false); return }

    sessionStorage.setItem('vote_reference', json.data.voteReference)
    router.push('/vote/sukses')
  }

  const namaPilihan = kandidat.find(k => k.id === pilihan)?.nama

  return (
    <div className="space-y-6">
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700">
        ⚠️ Pilih <strong>satu</strong> kandidat. Pilihan tidak dapat diubah setelah dikonfirmasi.
      </div>

      {/* Grid kandidat */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {kandidat.map(k => (
          <button key={k.id} onClick={() => !confirm && setPilihan(k.id)}
            className={cn(
              'relative p-5 rounded-xl border-2 text-left transition-all hover:shadow-md',
              pilihan === k.id
                ? 'border-primary bg-primary/5 shadow-md'
                : 'border-border bg-card hover:border-primary/40'
            )}>
            {pilihan === k.id && (
              <CheckCircle2 className="absolute top-3 right-3 w-6 h-6 text-primary" />
            )}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-secondary overflow-hidden shrink-0 relative">
                {k.sanityData?.foto?.asset?.url
                  ? <Image src={k.sanityData.foto.asset.url} alt={k.nama} fill className="object-cover" />
                  : <div className="w-full h-full flex-center text-2xl">👤</div>
                }
              </div>
              <div>
                <div className="font-black text-2xl text-primary">{k.nomorUrut}</div>
                <div className="font-semibold">{k.nama}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      <Button className="w-full" size="lg" disabled={!pilihan || loading}
        onClick={() => pilihan && setConfirm(true)}>
        Konfirmasi Pilihan
      </Button>

      {/* Modal konfirmasi */}
      {confirm && pilihan && (
        <div className="fixed inset-0 z-50 flex-center bg-black/60 px-4" onClick={() => setConfirm(false)}>
          <div className="bg-card rounded-xl p-6 w-full max-w-sm space-y-4 shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="font-bold text-lg text-center">Konfirmasi Pilihan</h3>
            <div className="rounded-lg bg-primary/10 border border-primary/20 p-4 text-center">
              <p className="text-sm text-muted-foreground">Anda memilih:</p>
              <p className="font-bold text-lg text-primary">{namaPilihan}</p>
            </div>
            <p className="text-sm text-center text-muted-foreground">
              Pilihan <strong>tidak dapat diubah</strong> setelah dikirim.
            </p>
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setConfirm(false)} disabled={loading}>
                ← Kembali
              </Button>
              <Button className="flex-1" onClick={submit} disabled={loading}>
                {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Mengirim...</> : 'Kirim Suara 🗳️'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
