export interface VerifyNIKPayload {
  nik: string;
  idPemilihan?: string;
}

export type VerifyNIKResponse =
  | {
      found: true;
      nama: string;
      kodeWilayah: string;
      hasVoted: boolean;
      dptId?: string;
      idPemilihan?: string;
    }
  | {
      found: false;
      message: string;
    };
