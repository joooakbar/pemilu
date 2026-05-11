import type {
  KandidatSanity,
} from '@/types'

export interface Kandidat {
  id: string

  nomorUrut: number

  nama: string

  sanityData?: KandidatSanity
}

export type SuratSuaraProps = {
  kandidat: Kandidat[]

  electionId: string
}