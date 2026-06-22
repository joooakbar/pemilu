"use client";

import PartisipasiProgress from "@/features/voter/LiveStats/components/LiveStats";
import { useElectionEngine } from "@/hooks/useElectionEngine";
import { StatusPemilihan } from "@prisma/client";
import {
  formatDate,
  formatTimeRange,
} from "../../BeritaSection/utils/dateFormat";

interface CountdownCardProps {
  startTime?: string;
  endTime?: string;
  namaPemilihan?: string;
  idPemilihan?: string;
  status?: StatusPemilihan;
}

const CountdownCard = ({
  startTime,
  endTime,
  namaPemilihan,
  idPemilihan,
  status,
}: CountdownCardProps) => {
  const isManuallyEnded = status === "ENDED";

  const { timeLeft, isStarted, isEnded } = useElectionEngine(
    idPemilihan,
    startTime,
    endTime,
    isManuallyEnded,
  );

  const isBeforeStart = !isStarted && !isEnded;
  const isActive = isStarted && !isEnded;

  const displayTime = isEnded ? { h: "00", m: "00", s: "00" } : timeLeft;

  const getLabel = () => {
    if (isBeforeStart) return "🕐 Pemilihan Belum Dimulai";
    if (isActive) return "⏱ Pemilihan Sedang Berlangsung";
    if (isEnded) return "⛔ Pemilihan Telah Berakhir";
    return "Tidak Ada Pemilihan";
  };

  return (
    <div className="countdown-card reveal">
      <div className="cd-label">{getLabel()}</div>

      <div className="cd-grid">
        <div className="cd-unit">
          <span className="cd-num">{displayTime.h}</span>
          <div className="cd-unit-label">Jam</div>
        </div>

        <div className="cd-sep">:</div>

        <div className="cd-unit">
          <span className="cd-num">{displayTime.m}</span>
          <div className="cd-unit-label">Menit</div>
        </div>

        <div className="cd-sep">:</div>

        <div className="cd-unit">
          <span className="cd-num">{displayTime.s}</span>
          <div className="cd-unit-label">Detik</div>
        </div>
      </div>

      <div className="cd-info">
        <strong>{formatDate(startTime)}</strong>
        <br />
        {formatTimeRange(startTime, endTime)} WIB . {namaPemilihan}
      </div>

      {idPemilihan && isActive && (
        <PartisipasiProgress idPemilihan={idPemilihan} />
      )}
    </div>
  );
};

export default CountdownCard;
