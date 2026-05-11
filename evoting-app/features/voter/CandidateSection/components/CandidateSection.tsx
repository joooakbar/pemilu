export type Candidate = {
  id: string

  number: number

  nama: string

  photo?: string

  bannerClass: string

  visi: unknown[]

  misi: unknown[]

  program: unknown[]

  votes: number

  videoUrl?: string
}

export type TabType =
  | 'visi'
  | 'misi'
  | 'program'

export type CandidateCardProps = {
  kandidat: Candidate
}