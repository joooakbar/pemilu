import { Card, CardContent }
from '@/components/ui/card'

import { StatsCardItem }
from '../types'

interface Props {
  item: StatsCardItem
}

export default function StatsCard({
  item,
}: Props) {

  const {
    label,
    value,
    icon: Icon,
    color,
    bg,
  } = item

  return (
    <Card className="overflow-hidden">

      <CardContent
        className="
          p-5
          flex items-center
          gap-4
        "
      >

        <div
          className={`
            w-12 h-12
            rounded-xl
            ${bg}
            flex-center
            shrink-0
          `}
        >

          <Icon
            className={`
              w-6 h-6
              ${color}
            `}
          />

        </div>

        <div>

          <p className="text-2xl font-bold">
            {value}
          </p>

          <p
            className="
              text-xs
              text-muted-foreground
            "
          >
            {label}
          </p>

        </div>

      </CardContent>

    </Card>
  )
}