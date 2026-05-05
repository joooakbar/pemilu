export type StatusPemilihan = "DRAFT" | "ACTIVE" | "ENDED";

export interface HeroProps {
    namaPemilihan: string;
    startTime?: string;
    endTime?: string;
    status?: StatusPemilihan;
    idPemilihan?: string;
}

export interface CountdownCardProps {
    startTime?: string;
    endTime?: string;
    namaPemilihan?: string;
    status?: StatusPemilihan;
    idPemilihan?: string;
}