export type PengumumanSanity = {
  _id: string
  judul: string
  kategori?: string
  tanggal: string
  konten: unknown
}

export type BeritaSectionProps = {
  data?: PengumumanSanity[]
}