"use client";

import { useElectionStats } from "@/hooks/useSSE";
import { useActiveElection } from "../hooks/useLive";
const LiveTicker = ({ idPemilihan }: { idPemilihan?: string }) => {
  const { stats } = useElectionStats(idPemilihan);
  const pemilihan = useActiveElection(idPemilihan);

  if (!stats || !pemilihan) return null;

  const persen = stats.partisipasi;

  const formatTime = (d: string) =>
    new Date(d).toLocaleString("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const tickerText = `
    ${pemilihan.nama} sedang berlangsung · 
    ${stats.sudahMemilih.toLocaleString("id-ID")} pemilih telah menggunakan hak suara (${persen}%) · 
    Total DPT ${stats.totalDPT.toLocaleString("id-ID")} · 
    Periode: ${formatTime(pemilihan.startTime)} - ${formatTime(pemilihan.endTime)} · 
    Gunakan hak suara Anda sekarang
  `;

  return (
    <div className="live-ticker">
      <span className="ticker-badge">Live</span>

      <div className="ticker-wrapper">
        <div className="ticker-text">{tickerText}</div>
      </div>
    </div>
  );
};

export default LiveTicker;
