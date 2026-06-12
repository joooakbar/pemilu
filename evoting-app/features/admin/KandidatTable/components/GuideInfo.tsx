export default function GuideInfo() {
  return (
    <div
      className="
        space-y-1.5
        rounded-lg
        border
        bg-secondary/40
        p-4
        text-xs
        text-muted-foreground
      "
    >
      <p
        className="
          text-sm
          font-semibold
          text-foreground
        "
      >
        ℹ️ Alur Sinkronisasi
      </p>

      <p>
        ① Tambah atau edit kandidat di
        <strong> Sanity Studio</strong>
      </p>

      <p>
        ② Klik
        <strong> Publish</strong>
      </p>

      <p>
        ③ Kembali ke halaman ini lalu klik
        <strong> Sinkronisasi</strong>
      </p>

      <p>
        ④ Data masuk ke tabel
        <code
          className="
            ml-1
            rounded
            bg-secondary
            px-1
          "
        >
          kandidat_ref
        </code>
      </p>
    </div>
  );
}
