import { cn }
from '@/lib/utils'

import {
  STATUS_COLOR,
} from '../constants/emergency.constants'

interface Props {
  status: string
}

export default function StatusBadge({
  status,
}: Props) {

  return (
    <span
      className={cn(
        'ml-2 font-bold uppercase',

        STATUS_COLOR[
          status as keyof
          typeof STATUS_COLOR
        ]
      )}
    >

      {status}

    </span>
  )
}