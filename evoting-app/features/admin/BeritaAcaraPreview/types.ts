export interface PreviewElection {
  id: string
  nama: string
  status: string
  startTime: string
  endTime: string
}

export interface PreviewRekapitulasiData {
  nomor: number
  nama: string
  jumlah: number
}

export interface BeritaAcaraPreviewProps {
  election: PreviewElection
  totalDPT: number
  totalSuara: number
  rekapitulasi: PreviewRekapitulasiData[]
}