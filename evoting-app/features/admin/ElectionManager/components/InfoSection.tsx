export default function InfoSection() {

  return (
    <div
      className="
        rounded-lg
        bg-secondary/40
        border
        p-4
        text-xs
        text-muted-foreground
        space-y-1.5
      "
    >

      <p
        className="
          font-semibold
          text-foreground
          text-sm
        "
      >
        ℹ️ Penjelasan Sinkronisasi
      </p>

      <p>
        ① Edit nama, jadwal,
        tempat di
        <strong>
          {' '}Sanity Studio
        </strong>
      </p>

      <p>
        ② Klik
        <strong>
          {' '}Sinkronisasi
        </strong>
      </p>

      <p>
        ③ Status election
        hanya diubah via
        Emergency Stop
      </p>

      <p>
        ④ Setelah sync,
        election otomatis
        dipakai dashboard
      </p>

    </div>
  )
}