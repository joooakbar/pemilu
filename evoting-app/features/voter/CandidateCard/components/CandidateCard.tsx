"use client"

import { useCandidate } from "../hooks/useCandidate";
import Image from "next/image";
import type { CandidateCardProps } from "@/features/voter/CandidateCard/types/candidate.types";
const CandidateCard = ({ kandidat }: CandidateCardProps ) => {
    const { activeTab, setActiveTab, content } = useCandidate(kandidat);

    return (
        <div className="k-card">
            <div className={`k-banner ${kandidat.bannerClass}`}>
                <div className="k-num">
                    {kandidat.number}
                </div>

                <div className="k-photo">
                    {kandidat.photo ? (
                        <Image 
                            src={kandidat.photo}
                            alt={kandidat.nama}
                            width={180}
                            height={180}
                            className="k-photo-img"
                            unoptimized
                        />
                    ) : (
                        "👤"
                    )}
                </div>
            </div>

            <div className="k-body">
                <div className="k-nama">
                    {kandidat.nama}
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
                        Program Kerja
                    </button>
                </div>

                <div className="k-content">
                    {Array.isArray(content) ? (
                        content.map((item, index) => (
                            <div key={index}>
                                {index + 1}. {item}
                            </div>
                        ))
                    ) : (
                        <div>{content}</div>
                    )}
                </div>
            </div>

            <div className="k-footer">
                <div className="k-votes">
                    Perolehan saat ini:<br />
                    <strong>{kandidat.votes}</strong>
                </div>

                {kandidat.videoUrl ? (
                    <a 
                    href={kandidat.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="k-video-btn"
                    >
                        ▶ Video Kampanye
                    </a>
                ) : (
                    <button 
                        type="button" className="k-video-btn disabled"
                    >
                        ▶ Video Kampanye
                    </button>
                )}
            </div>
        </div>
    );
};

export default CandidateCard;