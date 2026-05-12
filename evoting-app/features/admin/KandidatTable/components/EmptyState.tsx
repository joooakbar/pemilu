export default function EmptyState() {

  return (

    <div
      className="
        rounded-xl
        border
        border-dashed
        p-12
        text-center
        space-y-3
      "
    >

      <p
        className="
          text-3xl
        "
      >

        📝

      </p>

      <p
        className="
          font-semibold
        "
      >

        Belum ada kandidat di Sanity

      </p>

      <p
        className="
          text-sm
          text-muted-foreground
        "
      >

        Tambahkan kandidat
        di Sanity Studio,
        klik Publish,
        lalu klik Sinkronisasi.

      </p>

      <a
        href="/studio"
        target="_blank"
        className="
          inline-block
          mt-2
          rounded-lg
          bg-primary
          px-5 py-2
          text-sm
          font-medium
          text-primary-foreground
        "
      >

        Buka Sanity Studio ↗

      </a>

    </div>
  )
}