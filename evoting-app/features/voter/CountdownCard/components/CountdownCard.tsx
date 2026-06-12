"use client";

import PartisipasiProgress from "@/features/voter/LiveStats/components/LiveStats";
import { CountdownCardProps } from "@/features/voter/Hero/types/pemilihan.types";
import { useCountdown } from "@/features/voter/CountdownCard/hooks/useCountdown";
import {
  formatDate,
  formatTimeRange,
} from "../../BeritaSection/utils/dateFormat";
import { useCountdownTime } from "../hooks/useCoundownTime";

const CountdownCard = ({
  startTime,
  endTime,
  namaPemilihan,
  status,
  idPemilihan,
}: CountdownCardProps) => {
  const { timeLeft } = useCountdown(startTime, endTime);

  const { isBeforeStart, isActive, isEnded } = useCountdownTime(
    startTime,
    endTime,
  );

  const getLabel = () => {
    if (isBeforeStart) {
      return "🕐 Pemilihan Akan Dimulai Dalam";
    }
    if (isActive) {
      return "⏱ Pemilihan Berakhir Dalam";
    }
    if (isEnded) {
      return "⛔ Pemilihan Telah Berakhir";
    }

    return "Tidak Ada Pemilihan";
  };

  return (
    <div className="countdown-card reveal" style={{ animationDelay: "0.15s" }}>
      <div className="cd-label">{getLabel()}</div>

      {!isEnded && (
        <div className="cd-grid">
          <div className="cd-unit">
            <span className="cd-num">{timeLeft.h}</span>
            <div className="cd-unit-label">Jam</div>
          </div>

          <div className="cd-sep">:</div>

          <div className="cd-unit">
            <span className="cd-num">{timeLeft.m}</span>
            <div className="cd-unit-label">Menit</div>
          </div>

          <div className="cd-sep">:</div>

          <div className="cd-unit">
            <span className="cd-num">{timeLeft.s}</span>
            <div className="cd-unit-label">Detik</div>
          </div>
        </div>
      )}

      <div className="cd-info">
        <strong>{formatDate(startTime)}</strong>
        <br />
        {formatTimeRange(startTime, endTime)} WIB . {namaPemilihan}
      </div>

      {idPemilihan && <PartisipasiProgress idPemilihan={idPemilihan} />}
    </div>
  );
};

export default CountdownCard;
