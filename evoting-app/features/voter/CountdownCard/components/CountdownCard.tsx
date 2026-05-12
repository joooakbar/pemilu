"use client";

import PartisipasiProgress from "@/features/voter/LiveStats/components/LiveStats";
import { CountdownCardProps } from "@/features/voter/Hero/types/pemilihan.types";
import { useCountdown } from "@/features/voter/CountdownCard/hooks/useCountdown"
import { formatDate,formatTimeRange } from "../../BeritaSection/utils/dateFormat";

const CountdownCard = ({
    startTime,
    endTime,
    namaPemilihan,
    status,
    idPemilihan,
}: CountdownCardProps) => {
    const { timeLeft } = useCountdown(startTime, endTime, status);

    const getLabel = () => {
        switch (status) {
            case "DRAFT":
                return "🕐 Pemilihan Akan Dimulai Dalam";
            case "ACTIVE":
                return "⏱ Pemilihan Berakhir Dalam";
            case "ENDED":
                return "⛔ Pemilihan Telah Berakhir";
            default:
                return "";
        }
    };
    
    return (
        <div className="countdown-card reveal" style={{ animationDelay: "0.15s" }}>
            <div className="cd-label">{getLabel()}</div>

            {status !== "ENDED" && (
                <div className="cd-grid">
                    <div className="cd-unit">
                        <span className="cd-num">
                            {timeLeft.h}
                        </span>
                        <div className="cd-unit-label">
                            Jam
                        </div>
                    </div>

                    <div className="cd-sep">:</div>
                    
                    <div className="cd-unit">
                        <span className="cd-num">
                            {timeLeft.m}
                        </span>
                        <div className="cd-unit-label">
                            Menit
                        </div>
                    </div>

                    <div className="cd-sep">:</div>
                    
                    <div className="cd-unit">
                        <span className="cd-num">
                            {timeLeft.s}
                        </span>
                        <div className="cd-unit-label">
                            Detik
                        </div>
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