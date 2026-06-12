"use client";

import { useParticipation } from "../../LiveStats/hooks/useParticipation";
import { StatsBarProps } from "../types/statsbar.types";

export default function StatsBar({ idPemilihan }: StatsBarProps) {
  console.log("ID PEMILIHAN:", idPemilihan);

  const { stats, persen } = useParticipation(idPemilihan);
  if (!stats) {
    return (
      <section className="stats-bar">
        <div className="stats-empty">
          Tidak ada pemilihan berlangsung / Pemilihan berakhir
        </div>
      </section>
    );
  }
  return (
    <section className="stats-bar">
      <div className="stat-item">
        <div className="stat-num">{stats.totalDPT.toLocaleString("id-ID")}</div>
        <div className="stat-lbl">Total DPT</div>
      </div>
      <div className="stat-item">
        <div className="stat-num">
          <span>{stats.sudahMemilih.toLocaleString("id-ID")}</span>
        </div>
        <div className="stat-lbl">Sudah Memilih</div>
      </div>
      <div className="stat-item">
        <div className="stat-num">{stats.kandidat}</div>
        <div className="stat-lbl">Paslon</div>
      </div>
      <div className="stat-item">
        <div className="stat-num">
          <span>{persen}</span>
          <span></span>
        </div>
        <div className="stat-lbl">Partisipasi</div>
      </div>
    </section>
  );
}
