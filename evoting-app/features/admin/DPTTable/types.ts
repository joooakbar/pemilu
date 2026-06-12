export interface DPTRow {
  id: string;
  nik: string;
  nama: string;
  kodeWilayah: string;
  phone?: string;
  hasVoted: boolean;
  votedAt?: string;
}

export interface DPTTableProps {
  electionId?: string;
}
