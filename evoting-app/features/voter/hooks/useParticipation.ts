import { useElectionStats } from "@/hooks/useSSE";

export const useParticipation = (idPemilihan: string) => {
    const { stats } = useElectionStats(idPemilihan);

    if (!stats) {
        return {
            stats: null,
            persen: "0,0",
            width: "0%",
        };
    }

    const { totalDPT, sudahMemilih } = stats;

    const percentage = totalDPT > 0 ? (sudahMemilih / totalDPT) * 100 : 0;

    return {
        stats,
        persen: percentage.toFixed(1).replace(".",","),
        width: `${percentage}%`,
    };
};