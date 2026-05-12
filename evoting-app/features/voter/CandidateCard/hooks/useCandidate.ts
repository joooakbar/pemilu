import { useState } from "react";
import type { Candidate } from "../../CandidateSection/utils/mapKandidat";

export type TabKey = "visi" | "misi" | "program";

export const useCandidate = (kandidat: Candidate) => {
    const [ activeTab, setActiveTab ] = useState<TabKey>("visi");

    const getContent = () => {
        switch (activeTab) {
            case "visi":
                return kandidat.vision || "Belum ada visi";

            case "misi":
                return kandidat.mission.length > 0 
                ? kandidat.mission
                : ["Belum ada misi"];

            case "program":
                return kandidat.programs.length
                ? kandidat.programs
                : ["Belum ada program kerja"];

            default:
                return [];
        }
    };

    return {
        activeTab,
        setActiveTab,
        content: getContent(),
    };
};