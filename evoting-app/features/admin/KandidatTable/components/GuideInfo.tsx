export default function GuideInfo() {

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

        ℹ️ Alur Sinkronisasi

      </p>

      <p>
        ① Tambah/edit kandidat
        di <strong>Sanity Studio</strong>
      </p>

      <p>
        ② Klik
        <strong>
          {' '}
          Publish
        </strong>
      </p>

      <p>
        ③ Kembali ke halaman ini
        lalu klik
        <strong>
          {' '}
          Sinkronisasi
        </strong>
      </p>

      <p>
        ④ Data masuk ke tabel
        <code
          className="
            bg-secondary
            px-1
            rounded
          "
        >
          kandidat_ref
        </code>
      </p>

    </div>
  )
}