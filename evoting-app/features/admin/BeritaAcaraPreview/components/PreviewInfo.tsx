import { formatDateTime } from '@/lib/utils'

interface Props {
  startTime: string
  endTime: string
  totalDPT: number
  totalSuara: number
  partisipasi: string
}

export default function PreviewInfo({
  startTime,
  endTime,
  totalDPT,
  totalSuara,
  partisipasi,
}: Props) {

  return (
    <div className="grid grid-cols-2 gap-4 text-sm">

      <div>
        <p className="text-muted-foreground">
          Tanggal Mulai
        </p>

        <p className="font-medium">
          {formatDateTime(startTime)}
        </p>
      </div>

      <div>
        <p className="text-muted-foreground">
          Tanggal Selesai
        </p>

        <p className="font-medium">
          {formatDateTime(endTime)}
        </p>
      </div>

      <div>
        <p className="text-muted-foreground">
          Total DPT
        </p>

        <p className="font-medium">
          {totalDPT} pemilih
        </p>
      </div>

      <div>
        <p className="text-muted-foreground">
          Partisipasi
        </p>

        <p className="font-medium">
          {totalSuara} suara ({partisipasi}%)
        </p>
      </div>

    </div>
  )
}