"use client";

import { useParticipation } from "@/features/voter/LiveStats/hooks/useParticipation";
import { formatNumber } from "@/features/voter/InputNIK/utils/numberFormat";
import { PartisipasiProgressProps } from "../types/participation.types";

export default function PartisipasiProgress({
  idPemilihan,
}: PartisipasiProgressProps) {
  const { stats, persen, width } = useParticipation(idPemilihan);

  if (!stats) return null;

  const { totalDPT, sudahMemilih } = stats;

  return (
    <div className="cd-progress">
      <div className="cd-prog-la">
        <span>Partisipasi Pemilih:</span> <strong>{persen}%</strong>
      </div>

      <div className="cd-prog-bar">
        <div className="cd-prog-fill" style={{ width }}></div>
      </div>

      <div className="cd-progress-text">
        <span>{formatNumber(sudahMemilih)}</span> dari {formatNumber(totalDPT)}{" "}
        pemilih telah memilih.
      </div>
    </div>
  );
}
