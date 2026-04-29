import { useEffect, useState } from "react";
import PartisipasiProgress from "./LiveStats";

interface CountdownCardProps {
    startTime?: string;
    endTime?: string;
    namaPemilihan?: string;
    status?: "DRAFT" | "ACTIVE" | "ENDED";
    electionId?:string;
}

const CountdownCard = ({ 
    startTime,
    endTime,
    namaPemilihan,
    status,
    electionId
}
    : CountdownCardProps) => {
    const [timeLeft, setTimeLeft] = useState({
        h: "00",
        m: "00",
        s: "00"
    });

    const [isEnded, setIsEnded] = useState(false);

    useEffect(() => {
        const target =
            status === "DRAFT"
                ? new Date(startTime as string).getTime()
                : new Date(endTime as string).getTime();

        const tick = () => {
            const now = Date.now();
            const diff = target - now;

            if (diff <= 0) {
                setTimeLeft({ h: "00", m: "00", s: "00" });
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            setTimeLeft({
                h: String(hours).padStart(2, "0"),
                m: String(minutes).padStart(2, "0"),
                s: String(seconds).padStart(2, "0"),
            });
        };

        tick();
        const interval = setInterval(tick, 1000);
        return () => clearInterval(interval);
    }, [startTime, endTime, status]);

    return (
        <div className="countdown-card reveal" style={{ animationDelay: "0.15s" }}>
            <div className="cd-label">
                {(() => {
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
                })()}
            </div>

                {status !== "ENDED" && (
                <div className="cd-grid">
                    <div className="cd-unit">
                        <span className="cd-num" id="cd-h">
                            {timeLeft.h}
                        </span>
                        <div className="cd-unit-label">
                            Jam
                        </div>
                    </div>
                    <div className="cd-sep">:</div>
                    <div className="cd-unit">
                        <span className="cd-num" id="cd-m">
                            {timeLeft.m}
                        </span>
                        <div className="cd-unit-label">
                            Menit
                        </div>
                    </div>
                    <div className="cd-sep">:</div>
                    <div className="cd-unit">
                        <span className="cd-num" id="cd-s">
                            {timeLeft.s}
                        </span>
                        <div className="cd-unit-label">
                            Detik
                        </div>
                    </div>
                    <div className="cd-gap"></div>
                    <div className="cd-unit"></div>
                </div>
            )}

            <div className="cd-info">
                <strong>{formatDate(startTime)}</strong>
                <br />
                {formatTimeRange(startTime, endTime)} WIB . {namaPemilihan}
            </div>

            {electionId && <PartisipasiProgress electionId={electionId}/>}
        </div>
    );
};
function formatDate(dateString: string) {
  const d = new Date(dateString);
  return d.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatTimeRange(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);

  return `${s.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })} - ${e.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`;
}

export default CountdownCard;