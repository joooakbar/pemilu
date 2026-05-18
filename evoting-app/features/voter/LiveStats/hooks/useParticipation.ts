import { useElectionStats } from "@/hooks/useSSE";

export const useParticipation = (idPemilihan?: string) => {
  const { stats } = useElectionStats(idPemilihan);

  if (!stats) {
    return {
      stats: null,
      persen: "0,0",
      width: "0%",
    };
  }

  return {
    stats,
    persen: stats.partisipasi.toFixed(1).replace(".", ","),
    width: `${stats.partisipasi}%`,
  };
};
