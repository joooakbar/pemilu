"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ElectionManagerProps } from "../types";
import SanityInfoPanel from "./SanityInfoPanel";
import ElectionList from "./ElectionList";

export default function ElectionManager({
  initialElections,
  sanityInfo,
}: ElectionManagerProps) {
  const router = useRouter();

  // 🔥 FIX: state harus mutable
  const [elections, setElections] = useState(initialElections);
  const [syncing, setSyncing] = useState(false);

  const [selectedElection, setSelectedElection] = useState<any | null>(null);
  const [editForm, setEditForm] = useState<any>({});
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSync = async () => {
    try {
      setSyncing(true);
      console.log("Sync berhasil");

      // kalau nanti ada API:
      // await fetch(...)
      // router.refresh();

    } catch (error) {
      console.error(error);
    } finally {
      setSyncing(false);
    }
  };

  // ✅ OPEN EDIT
  const handleEdit = (election: any) => {
    setSelectedElection(election);

    setEditForm({
      nama: election.nama ?? "",
      startTime: election.startTime ?? "",
      endTime: election.endTime ?? "",
      tempatVoting: election.tempatVoting ?? "",
      deskripsi: election.deskripsi ?? "",
    });

    setIsEditing(true);
  };

  // ✅ SAVE EDIT (FIX UTAMA)
  const handleSave = async () => {
    try {
      setSaving(true);

      const updatedData = {
        id: selectedElection.id,
        ...editForm,
      };

      console.log("UPDATE DATA:", updatedData);

      // 🔥 TODO: API UPDATE
      // await fetch("/api/election/update", {...})

      // 🔥 UPDATE STATE LIST (INI KUNCINYA)
      setElections((prev: any[]) =>
        prev.map((item) =>
          item.id === selectedElection.id
            ? { ...item, ...editForm }
            : item
        )
      );

      // reset UI
      setIsEditing(false);
      setSelectedElection(null);
      setEditForm({});

      // optional kalau pakai server component
      // router.refresh();

    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedElection(null);
    setEditForm({});
  };

  return (
    <div className="space-y-6">
      <SanityInfoPanel
        sanityInfo={sanityInfo}
        syncing={syncing}
        syncResult={null}
        onSync={handleSync}
      />

      {/* LIST */}
      {!isEditing && (
        <>
          {elections.length === 0 ? (
            <div className="py-12 text-center text-muted-foreground">
              Tidak ada election
            </div>
          ) : (
            <ElectionList elections={elections} onEdit={handleEdit} />
          )}
        </>
      )}


      {/* INFO */}
      <div className="space-y-1.5 rounded-lg border bg-secondary/40 p-4 text-xs text-muted-foreground">
        <p className="text-sm font-semibold text-foreground">
          ℹ️ Penjelasan Sinkronisasi
        </p>

        <p>① Edit nama, jadwal, tempat di <strong>Sanity Studio</strong></p>
        <p>② Klik <strong>Sinkronisasi</strong></p>
        <p>③ Status election hanya diubah via Emergency Stop</p>
        <p>④ Setelah sync, election otomatis dipakai dashboard</p>
      </div>
    </div>
  );
}