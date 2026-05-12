import StatusBadge
from './StatusBadge'

interface Props {
  election: {
    nama: string
    status: string
  }
}

export default function EmergencyStatusCard({
  election,
}: Props) {

  return (
    <div
      className="
        rounded-lg
        border
        p-4
        space-y-2
      "
    >

      <p
        className="
          text-sm
          font-medium
        "
      >

        Pemilihan:

        <strong>
          {' '}
          {election.nama}
        </strong>

      </p>

      <p className="text-sm">

        Status saat ini:

        <StatusBadge
          status={election.status}
        />

      </p>

    </div>
  )
}