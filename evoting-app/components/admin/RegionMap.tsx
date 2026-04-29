'use client'
import { useElectionStats } from '@/hooks/useSSE'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Bar } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js'

Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

export default function RegionMap({ electionId }: { electionId: string }) {
  const { stats } = useElectionStats(electionId)
  if (!stats) return null

  const sorted = [...stats.suaraPerWilayah].sort((a, b) => b.jumlah - a.jumlah).slice(0, 10)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Sebaran Suara per Wilayah</CardTitle>
        <p className="text-xs text-muted-foreground">Berdasarkan 6 digit pertama NIK (kode wilayah)</p>
      </CardHeader>
      <CardContent className="h-64">
        {sorted.length === 0
          ? <div className="h-full flex-center text-muted-foreground text-sm">Belum ada data wilayah</div>
          : <Bar
              data={{
                labels: sorted.map(s => s.kodeWilayah),
                datasets: [{ label: 'Jumlah Suara', data: sorted.map(s => s.jumlah),
                  backgroundColor: '#1d4ed8cc', borderRadius: 6 }],
              }}
              options={{ maintainAspectRatio: false, plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true, ticks: { precision: 0 } } } }}
            />
        }
      </CardContent>
    </Card>
  )
}