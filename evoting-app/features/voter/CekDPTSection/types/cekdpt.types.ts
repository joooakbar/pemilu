export interface VerifyResult {
    found: boolean;
    nama?: string;
    kodeWilayah?: string;
    hasVoted?: boolean;
}

export type CekDPTStatus = 
    | "idle"
    | "empty"
    | "invalid"
    | "found"
    | "not-found"
    | "error"

export interface CekDPTState {
    nik: string;
    loading: boolean;
    status: CekDPTStatus;
    result: VerifyResult | null;
}