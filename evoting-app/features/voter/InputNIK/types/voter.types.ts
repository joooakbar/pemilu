export interface VerifyNIKPayload {
  nik: string;
  idPemilihan?: string;
}

export interface VerifyNIKResponse {
  nama: string;
  kodeWilayah: string;
  hasVoted: boolean;
  dptId: string;
  idPemilihan: string;
}
