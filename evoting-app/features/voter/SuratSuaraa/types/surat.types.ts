import { KandidatSanity } from "@/types";

export interface VotingPageProps {
  pemilih: {
    id: string;
    nama: string;
  };

  pemilihan: {
    id: string;
    nama: string;
  };

  kandidat: KandidatSanity[];
}

export interface ServerProps {
  params: Promise<{
    id: string;
  }>;
}
