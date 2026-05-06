import prisma from '@/lib/db'
import DPTTable   from '@/components/admin/DPTTable'
import ImportModal from '@/components/admin/ImportModal'

export const metadata = { title: 'Manajemen DPT' }

export default async function DPTPage() {
  const [totalDPT, sudahVote, election] = await Promise.all([
    prisma.dPT.count(),
    prisma.dPT.count({ where: { hasVoted: true } }),
    prisma.election.findFirst({ orderBy: { createdAt: 'desc' } }),
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold">Manajemen DPT</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Total: <strong>{totalDPT}</strong> pemilih · Sudah memilih: <strong>{sudahVote}</strong>
          </p>
        </div>
        <div className="flex gap-2">
          <a href="/api/admin/dpt/export"
            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-secondary transition">
            ⬇ Export Excel
          </a>
          <ImportModal electionId={election?.id} />
        </div>
      </div>
      <DPTTable electionId={election?.id} />
    </div>
  )
}
