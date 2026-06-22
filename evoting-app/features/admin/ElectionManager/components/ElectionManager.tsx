"use client";

import { useState } from "react";
import { ElectionManagerProps } from "../types";
import SanityInfoPanel from "./SanityInfoPanel";
import ElectionList from "./ElectionList";
import { toast } from "sonner";

export default function ElectionManager({
  initialElections,
  sanityInfo,
}: ElectionManagerProps) {
  const [elections, setElections] = useState(initialElections);
  const [syncing, setSyncing] = useState(false);

  const handleSync = async () => {
    try {
      setSyncing(true);

      const res = await fetch("/api/admin/election/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Gagal sinkronisasi");

      const data = await res.json();

      if (data?.elections) {
        setElections(data.elections);
      }

      toast.success(data.message || "Sinkronisasi berhasil");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Error");
    } finally {
      setSyncing(false);
    }
  };

  const normalizedSanityInfo = sanityInfo
    ? {
        _id: sanityInfo._id,
        namaPemilihan: sanityInfo.namaPemilihan,
        startTime: sanityInfo.startTime ?? null,
        endTime: sanityInfo.endTime ?? null,
        tempatVoting: sanityInfo.tempatVoting ?? null,
        deskripsi: sanityInfo.deskripsi ?? null,
      }
    : null;

  return (
    <div className="space-y-6">
      <SanityInfoPanel
        sanityInfo={normalizedSanityInfo}
        syncing={syncing}
        syncResult={null}
        onSync={handleSync}
      />

      {elections.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          Tidak ada election
        </div>
      ) : (
        <ElectionList elections={elections} />
      )}

      <div className="space-y-1.5 rounded-lg border bg-secondary/40 p-4 text-xs text-muted-foreground">
        <p className="text-sm font-semibold text-foreground">
          ℹ️ Penjelasan Sinkronisasi
        </p>

        <p>
          ① Edit data di <strong>Sanity Studio</strong>
        </p>
        <p>
          ② Klik <strong>Sinkronisasi</strong> untuk update database
        </p>
        <p>③ Status election akan otomatis mengikuti waktu & aturan sistem</p>
        <p>④ Dashboard & admin akan langsung konsisten setelah sync</p>
      </div>
    </div>
  );
}
