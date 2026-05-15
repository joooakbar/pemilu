import { Card, CardContent } from '@/components/ui/card'
import { StatsCardItem } from '../types'

interface Props {
  item: StatsCardItem
}

export default function StatsCard({  item,}: Props) {

  const { label, value, icon: Icon,color, bg,} = item

  return (
    <Card className="overflow-hidden">

      <CardContent className="flex items-center gap-4 p-5">

        <div
          className={`
            flex-center h-12 w-12 shrink-0
            rounded-xl ${bg}
          `}
        >
          <Icon
            className={`h-6 w-6 ${color}`}
          />
        </div>

        <div>
          <p className="text-2xl font-bold">
            {value}
          </p>

          <p className="text-xs text-muted-foreground">
            {label}
          </p>
        </div>

      </CardContent>

    </Card>
  )
}