'use client'

import { useState } from "react"
import type { Candidate } from "@/lib/mapKandidat";

type TabKey = "visi" | "misi" | "program";

type CandidateCardProps = {
    candidate: Candidate;
};

const CandidateCard = ({ candidate }: CandidateCardProps) => {
    const [activeTab, setActiveTab] = useState<TabKey>("visi");

    const renderContent = () => {
        switch (activeTab) {
            case "visi":
                return <div className="k-panel active">
                    {candidate.vision || "Belum ada visi"}
                </div>;
            case "misi":
                return (
                    <div className="k-panel active">
                        {candidate.mission.length > 0 ? (
                            candidate.mission.map((item, index) => (
                                <div key={index}>
                                    {index + 1}. {item}
                                </div>
                            ))
                        ) : (
                            <div>Belum ada misi</div>
                        )}
                    </div>
                )
            case "program":
                return (
                    <div className="k-panel active">
                        {candidate.programs.length > 0 ? (
                            candidate.programs.map((item, index) => (
                                <div key={index}>
                                    {index + 1}. {item}
                                </div>
                            )) 
                        ) : (
                            <div>Belum ada program kerja</div>
                        )}
                    </div>
                )
            default:
                return null;
        }
    };

    return (
        <div className="k-card">
            <div className={`k-banner ${candidate.bannerClass}`}>
                <div className="k-num">
                    {candidate.number}
                </div>
                <div className="k-photo">
                    {candidate.photo ? (
                        <img 
                            src={candidate.photo} 
                            alt={candidate.nama}
                            className="k-photo-img"
                        />
                    ) : (
                        "👤"
                    )}
                </div>
            </div>

            <div className="k-body">
                <div className="k-nama">
                    {candidate.nama}
                </div>

                <div className="k-tabs">
                    <button
                        type="button"
                        className={`k-tab ${activeTab === "visi" ? "active" : ""}`}
                        onClick={() => setActiveTab("visi")}
                    >
                        Visi
                    </button>

                    <button
                        type="button"
                        className={`k-tab ${activeTab === "misi" ? "active" : ""}`}
                        onClick={() => setActiveTab("misi")}
                    >
                        Misi
                    </button>
                    <button
                        type="button"
                        className={`k-tab ${activeTab === "program" ? "active" : ""}`}
                        onClick={() => setActiveTab("program")}
                    >
                        Program
                    </button>
                </div>

                <div className="k-content">
                    {renderContent()}
                </div>
            </div>

            <div className="k-footer">
                <div className="k-votes">
                    Perolehan Saat ini:<br />
                    <strong>
                        {candidate.votes} suara
                    </strong>
                </div>
                
                {candidate.videoUrl ? (
                    <a 
                        href={candidate.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="k-video-btn"
                    >
                        ▶ Video Kampanye
                    </a>
                ) : (
                    <button 
                        type="button"
                        className="k-video-btn"
                        disabled
                    >
                        ▶ Video Kampanye
                    </button>
                )}

            </div>
        </div>
    );
};

export default CandidateCard;