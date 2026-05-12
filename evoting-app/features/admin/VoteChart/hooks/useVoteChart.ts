import { useElectionStats } from '@/hooks/useSSE'

export const useVoteChart = (electionId: string) => {
  const { stats } = useElectionStats(electionId)

  const labels = stats?.suaraPerKandidat.map(s => s.nama) ?? []

  const data = stats?.suaraPerKandidat.map(s => s.jumlah) ?? []

  return {
    stats,
    labels,
    data,
  }
}