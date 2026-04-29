'use client'
import { useElectionStats } from '@/hooks/useSSE'
import { Doughnut } from 'react-chartjs-2'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

Chart.register(ArcElement, Tooltip, Legend)

const COLORS = ['#1d4ed8','#0f766e','#d97706','#dc2626','#7c3aed','#0369a1','#15803d']

export default function VoteChart({ electionId }: { electionId: string }) {
  const { stats } = useElectionStats(electionId)
  if (!stats) return <Skeleton className="h-64 rounded-xl" />

  const labels = stats.suaraPerKandidat.map(s => s.nama)
  const data   = stats.suaraPerKandidat.map(s => s.jumlah)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Perolehan Suara</CardTitle>
      </CardHeader>
      <CardContent className="flex-center h-64">
        {data.length === 0
          ? <p className="text-muted-foreground text-sm">Belum ada suara masuk</p>
          : <Doughnut
              data={{ labels, datasets: [{ data, backgroundColor: COLORS, borderWidth: 2 }] }}
              options={{ plugins: { legend: { position: 'bottom' } }, maintainAspectRatio: false }}
              style={{ maxHeight: '220px' }}
            />
        }
      </CardContent>
    </Card>
  )
}
