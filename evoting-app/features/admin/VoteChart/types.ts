export interface KandidatVote {
  nama: string;
  jumlah: number;
}

export interface ElectionStats {
  suaraPerKandidat: KandidatVote[];
}

export interface VoteChartProps {
  electionId: string;
}
