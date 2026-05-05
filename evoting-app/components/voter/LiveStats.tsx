"use client";

import { useParticipation } from "@/features/voter/hooks/useParticipation"
import { formatNumber } from "@/features/voter/utils/numberFormat"

export default function PartisipasiProgress({
    idPemilihan,
}: {
    idPemilihan: string;
}) {
    const { stats, persen } = useParticipation(idPemilihan);

    if (!stats) return null;

    const { totalDPT, sudahMemilih } = stats;

    return (
        <div className="cd-progress">
            <div className="cd-prog-la">
                <span>Partisipasi Pemilih</span>
                <strong>{persen}%</strong>
            </div>

            <div className="cd-prog-bar">
                <div 
                    className="cd-prog-fill
                    style={{ width }}
                "></div>
            </div>

            <div className="cd-progress-text">
                <span>{formatNumber(sudahMemilih)}</span> dari {" "}{formatNumber(totalDPT)} pemilih telah memilih. 
            </div>
        </div>
    );
}