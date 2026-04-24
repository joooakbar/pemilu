import { KandidatSanity } from "@/types"
import { portableTextToArray } from "./portbleTextToArray"
import { portableTextToText } from "./portableTextToText"

export type Candidate = {
  id: string
  number: number
  bannerClass: string
  photo?: string
  nama: string
  votes: number
  vision: string
  mission: string[]
  programs: string[]
  videoUrl?: string
}

export function mapKandidatToCandidate(
  item: KandidatSanity,
  votes: number = 0
): Candidate {
  return {
    id: item._id,
    number: item.nomorUrut,
    bannerClass: item.nomorUrut === 1 ? "k-banner-1" : item.nomorUrut === 2 ? "k-banner-2" : "k-banner-3",
    photo: item.foto?.asset?.url,
    nama: item.namaPaslon,
    votes,
    vision: portableTextToText(item.visi),
    mission: portableTextToArray(item.misi),
    programs: portableTextToArray(item.programKerja),
    videoUrl: item.videoUrl,
  }
}