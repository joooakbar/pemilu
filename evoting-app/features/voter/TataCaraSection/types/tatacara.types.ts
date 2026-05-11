import type {
  TataCaraSanity,
} from '@/types'

export type StepIcon =
  | '🔍'
  | '📲'
  | '🔐'
  | '🗳️'
  | '✅'

export type StepItem = {
  icon: string

  title: string

  description: string

  nomor?: number
}

export type TataCaraSectionProps = {
  data: TataCaraSanity
}