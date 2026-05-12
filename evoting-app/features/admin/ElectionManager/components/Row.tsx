import { RowProps }
from '../types'

export default function Row({
  label,
  value,
  highlight,
  warn,
  mono,
}: RowProps) {

  return (
    <div className="flex gap-2 text-sm">

      <span
        className="
          text-muted-foreground
          shrink-0
          w-32
        "
      >
        {label}
      </span>

      <span
        className={`
          font-medium truncate

          ${
            highlight
              ? 'text-primary'
              : warn
              ? 'text-amber-600'
              : 'text-foreground'
          }

          ${
            mono
              ? 'font-mono text-xs'
              : ''
          }
        `}
      >

        {value}

      </span>

    </div>
  )
}