export interface Election {
  nama: string;
  startTime: Date;
  endTime: Date;
}

export interface Rekapitulasi {
  nomor: number;
  nama: string;
  jumlah: number;
}

export interface BeritaAcaraData {
  election: Election;
  totalDPT: number;
  totalSuara: number;
  rekapitulasi: Rekapitulasi[];
  generatedAt: Date;
}
