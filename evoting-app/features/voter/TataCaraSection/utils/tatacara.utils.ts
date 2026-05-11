import type {
  StepIcon,
  StepItem,
} from '../types/tatacara.types'

import type {
  TataCaraSanity,
} from '@/types'

export const defaultIcons:
  StepIcon[] = [
  '🔍',
  '📲',
  '🔐',
  '🗳️',
  '✅',
]

export const mapSteps = (
  data?: TataCaraSanity
): StepItem[] => {

  return (
    data?.langkah?.map(
      (step, index) => ({
        icon:
          defaultIcons[index]
          ?? '👉',

        title:
          step.judul,

        description:
          step.deskripsi,

        nomor:
          step.nomor,
      })
    ) ?? []
  )
}