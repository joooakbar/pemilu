import type { KandidatSanity } from "@/types";
import type { KandidatDB } from "./types";

export function getKandidatSyncStatus(
  kandidat: KandidatSanity,
  dbList: KandidatDB[],
) {
  const db = dbList.find((d) => d.sanityId === kandidat._id);

  const synced = !!db;

  const hasChanges =
  !!db &&
  (
    db.nama.trim() !== kandidat.namaPaslon.trim() ||
    Number(db.noUrut) !== Number(kandidat.noUrut)
  );
  return {
    synced,
    hasChanges,
  };
}
