export type Role = 'ADMIN' | 'PANITIA' | 'SAKSI'
export type ElectionStatus = 'DRAFT' | 'ACTIVE' | 'SUSPENDED' | 'ENDED'

export interface UserSession {
  sub:  string
  role: Role
  name: string
}

export interface ElectionStats {
  totalDPT:      number
  sudahMemilih:  number
  belumMemilih:  number
  partisipasi:   number  // persen 0–100
  suaraPerKandidat: { kandidatRefId: string; nama: string; jumlah: number }[]
  suaraPerWilayah:  { kodeWilayah: string; jumlah: number }[]
}

export interface DPTRow {
  id:          string
  nik:         string
  nama:        string
  kodeWilayah: string
  phone?:      string | null
  email?:      string | null
  hasVoted:    boolean
  votedAt?:    Date | null
}

export interface TokenStatus {
  dptId:       string
  nikMasked:   string
  nama:        string
  sentViaWa:   boolean
  sentViaEmail:boolean
  isUsed:      boolean
}

export interface KandidatSanity {
  _id:          string
  nomorUrut:    number
  namaPaslon:   string
  foto?:        { asset: { url: string }; alt?: string }
  visi?:        unknown[]
  misi?:        unknown[]
  programKerja?: unknown[]
  videoUrl?:    string
}

export interface PengumumanSanity {
  _id:       string
  judul:     string
  kategori:  string
  konten:    unknown[]
  tanggal:   string
  published: boolean
}

export interface TataCaraSanity {
  _id:        string
  judul:      string
  langkah:    { nomor: number; judul: string; deskripsi: string; gambar?: unknown }[]
  videoEmbed?: string
}

export interface ElectionInfoSanity {
  _id: string;
  namaPemilihan: string;
  logo?: {
    asset?: {
      url: string;
    };
  } | null;
  startTime: string;
  endTime: string;
  tanggalTampil?: string | null;  // <──── WAJIB ADA
  tempatVoting?: string | null;
  deskripsi?: string | null;
}

export interface SyncSectionResult {
  created: number
  updated: number
  skipped: number
  errors:  string[]
}

export interface SyncResult {
  election:  SyncSectionResult & { electionId?: string }
  kandidat:  SyncSectionResult
  timestamp: string
}
