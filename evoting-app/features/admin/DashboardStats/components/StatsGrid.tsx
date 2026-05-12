import StatsCard from './StatsCard'

import { StatsCardItem }
from '../types'

interface Props {
  cards: StatsCardItem[]
}

export default function StatsGrid({
  cards,
}: Props) {

  return (
    <div
      className="
        grid
        grid-cols-2
        lg:grid-cols-4
        gap-4
      "
    >

      {cards.map((card) => (
        <StatsCard
          key={card.label}
          item={card}
        />
      ))}

    </div>
  )
}