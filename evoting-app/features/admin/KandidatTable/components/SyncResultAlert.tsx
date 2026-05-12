import {

  CheckCircle2,

  AlertCircle,

} from 'lucide-react'

import type {

  SyncResult,

} from '../types/kandidat.types'

export default function SyncResultAlert({

  result,

}: {

  result: SyncResult

}) {

  const hasError =
    result.errors.length > 0

  return (

    <div
      className={`
        rounded-lg
        border
        p-4
        space-y-2

        ${
          hasError
          ? 'bg-amber-50 border-amber-200'
          : 'bg-green-50 border-green-200'
        }
      `}
    >

      <div
        className={`
          flex
          items-center
          gap-2
          text-sm
          font-semibold

          ${
            hasError
            ? 'text-amber-700'
            : 'text-green-700'
          }
        `}
      >

        {hasError
          ? (
            <AlertCircle
              className="
                w-4 h-4
              "
            />
          )
          : (
            <CheckCircle2
              className="
                w-4 h-4
              "
            />
          )
        }

        {result.message}

      </div>

    </div>
  )
}