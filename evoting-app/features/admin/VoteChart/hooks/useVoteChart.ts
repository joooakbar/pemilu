import { useElectionStats } from "@/hooks/useSSE";
import { StatsLocal } from "@/types";

export const useVoteChart = (electionId: string) => {
  const { stats } = useElectionStats(electionId);
  const kandidat = (stats as StatsLocal | null)?.suaraPerKandidat ?? [];

  const labels = kandidat.map((s) => s.nama) ?? [];

  const data = kandidat.map((s) => s.jumlah) ?? [];

  return {
    stats,
    labels,
    data,
  };
};
