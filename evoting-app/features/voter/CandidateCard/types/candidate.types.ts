export type Candidate = {
  number: number
  nama: string

  photo?: string

  bannerClass: string

  visi: string

  misi: string[]

  program: string[]

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