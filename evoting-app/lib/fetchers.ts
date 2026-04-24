import { client } from './client'
import type { KandidatSanity, PengumumanSanity, TataCaraSanity, ElectionInfoSanity } from '@/types'

const OPT = { next: { revalidate: 30 } }

export async function getKandidatList(): Promise<KandidatSanity[]> {
  return client.fetch(
    `*[_type == "kandidat"] | order(nomorUrut asc) {
      _id, nomorUrut, namaPaslon,
      foto { asset->{ url }, alt },
      visi, misi, programKerja, videoUrl
    }`, {}, OPT
  )
}

export async function getPengumumanList(): Promise<PengumumanSanity[]> {
  return client.fetch(
    `*[_type == "pengumuman" && published == true] | order(tanggal desc) [0..9] {
      _id, judul, kategori, konten, tanggal
    }`, {}, OPT
  )
}

export async function getTataCara(): Promise<TataCaraSanity | null> {
  const result = await client.fetch<TataCaraSanity>(
    `*[_type == "tataCara"][0] { _id, judul, langkah, videoEmbed }`, {}, OPT
  )
  return result ?? null
}

export async function getElectionInfo(): Promise<ElectionInfoSanity | null> {
  const result = await client.fetch<ElectionInfoSanity>(
    `*[_type == "electionInfo"][0] {
      _id,
      namaPemilihan,
      logo,
      startTime,
      endTime,
      tanggalTampil,
      tempatVoting,
      deskripsi
    }`,
    {},
    OPT
  )
  return result ?? null
}
