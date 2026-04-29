'use client'
import { formatDateTime } from '@/lib/utils'
import { Button }         from '@/components/ui/button'
import { Download }       from 'lucide-react'

interface Props {
  election:      { id: string; nama: string; status: string; startTime: string; endTime: string }
  totalDPT:      number
  totalSuara:    number
  rekapitulasi:  { nomor: number; nama: string; jumlah: number }[]
}

export default function BeritaAcaraPreview({ election, totalDPT, totalSuara, rekapitulasi }: Props) {
  const partisipasi = totalDPT > 0 ? ((totalSuara / totalDPT) * 100).toFixed(1) : '0'
  const pemenang    = rekapitulasi.reduce((a, b) => b.jumlah > a.jumlah ? b : a, rekapitulasi[0])

  return (
    <div className="space-y-6">
      {/* Preview card */}
      <div className="rounded-xl border bg-card p-8 max-w-2xl space-y-6">
        <div className="text-center space-y-1 border-b pb-4">
          <h2 className="text-xl font-bold">BERITA ACARA PEMILIHAN</h2>
          <p className="text-muted-foreground">{election.nama}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><p className="text-muted-foreground">Tanggal Mulai</p><p className="font-medium">{formatDateTime(election.startTime)}</p></div>
          <div><p className="text-muted-foreground">Tanggal Selesai</p><p className="font-medium">{formatDateTime(election.endTime)}</p></div>
          <div><p className="text-muted-foreground">Total DPT</p><p className="font-medium">{totalDPT} pemilih</p></div>
          <div><p className="text-muted-foreground">Partisipasi</p><p className="font-medium">{totalSuara} suara ({partisipasi}%)</p></div>
        </div>

        <div className="space-y-2">
          <p className="font-medium text-sm">Rekapitulasi Suara:</p>
          {rekapitulasi.map(r => (
            <div key={r.nomor} className="flex items-center justify-between p-3 rounded-lg bg-secondary/30">
              <span className="font-medium">No. {r.nomor} — {r.nama}</span>
              <span className="font-bold text-primary">{r.jumlah} suara</span>
            </div>
          ))}
        </div>

        {pemenang && (
          <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-center">
            <p className="text-sm text-green-700">🏆 Pemenang</p>
            <p className="font-bold text-green-800 text-lg">{pemenang.nama}</p>
            <p className="text-sm text-green-600">{pemenang.jumlah} suara</p>
          </div>
        )}
      </div>

      {/* Download button */}
      <Button asChild className="gap-2">
        <a href={`/api/admin/berita-acara/generate?electionId=${election.id}`} download>
          <Download className="w-4 h-4" /> Unduh PDF Berita Acara
        </a>
      </Button>
    </div>
  )
}
