import {
  ElectionDB,
} from '../types'

import ElectionCard
from './ElectionCard'

interface Props {
  elections: ElectionDB[]
  onEdit: (
    election: ElectionDB
  ) => void
}

export default function ElectionList({
  elections,
  onEdit,
}: Props) {

  return (
    <div className="space-y-3">

      {elections.map((el) => (

        <ElectionCard
          key={el.id}
          election={el}
          onEdit={() =>
            onEdit(el)
          }
        />

      ))}

    </div>
  )
}