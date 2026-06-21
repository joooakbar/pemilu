import Row from "./Row";
import SyncSection from "./SyncSection";

interface Props {
  sanityInfo: any;
  syncing: boolean;
  syncResult: any;
  onSync: () => void;
}

function formatDT(iso?: string) {
  if (!iso) return "⚠️ Belum diisi";

  return new Date(iso).toLocaleString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function SanityInfoPanel({
  sanityInfo,
  syncing,
  syncResult,
  onSync,
}: Props) {
  if (!sanityInfo) {
    return (
      <div className="rounded-xl border p-6 text-center text-muted-foreground">
        Belum ada data Sanity
      </div>
    );
  }

  const {
    namaPemilihan,
    tempatVoting,
    deskripsi,
    startTime,
    endTime,
    _id,
  } = sanityInfo;

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <div className="px-5 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* ── DATA SANITY ── */}
          <div className="space-y-2.5">
            <Row
              label="Nama Pemilihan"
              value={namaPemilihan}
              highlight
            />

            <Row
              label="Waktu Mulai"
              value={formatDT(startTime)}
              warn={!startTime}
            />

            <Row
              label="Waktu Selesai"
              value={formatDT(endTime)}
              warn={!endTime}
            />

            <Row
              label="Tempat"
              value={tempatVoting ?? "—"}
            />

            <Row
              label="Deskripsi"
              value={deskripsi ?? "—"}
            />

            <Row
              label="Sanity ID"
              value={_id}
              mono
            />
          </div>

          {/* ── SYNC SECTION ── */}
          <SyncSection
            syncing={syncing}
            disabled={!startTime || !endTime}
            syncResult={syncResult}
            onSync={onSync}
          />
        </div>
      </div>
    </div>
  );
}