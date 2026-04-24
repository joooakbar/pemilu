"use client";
import { useElectionStats } from "@/hooks/useSSE";

export default function PartisipasiProgress({ electionId }: { electionId: string }) {
    const { stats } = useElectionStats(electionId);

    if (!stats) return null;

    const { totalDPT, sudahMemilih } = stats;

    const persen = totalDPT > 0 ? ((sudahMemilih / totalDPT) * 100).toFixed(1).replace(".", ",") : "0,0";

    const width = totalDPT > 0 ? `${(sudahMemilih / totalDPT) * 100}%` : "0%";

    return (
        <div className="cd-progress">
            <div className="cd-prog-label">
                <span>Partisipasi Pemilih</span>
                <strong id="part-pc">{persen}%</strong>
            </div>

            <div className="cd-prog-bar">
                <div
                    className="cd-prog-fill"
                    id="part-fill"
                    style={{ width }}
                ></div>
            </div>

            <div className="cd-progress-text">
                <span id="voted-num">
                    {sudahMemilih.toLocaleString("id-ID")}
                </span> dari {" "}
                {totalDPT.toLocaleString("id-ID")} pemilih telah Memilih.
            </div>
        </div>
    );
}