interface Props {
  electionStatus: string
}

export default function StatsFooter({
  electionStatus,
}: Props) {

  return (
    <div
      className="
        col-span-2
        lg:col-span-4
        text-xs
        text-muted-foreground
        text-right
      "
    >

      Status election:

      <strong className="uppercase">
        {' '}
        {electionStatus}
      </strong>

      {' '}· Update otomatis tiap 3 detik

    </div>
  )
}