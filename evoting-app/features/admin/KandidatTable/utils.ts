import type { KandidatSanity } from "@/types";
import type { KandidatDB } from "./types";

export function getKandidatSyncStatus(
  kandidat: KandidatSanity,
  dbList: KandidatDB[],
) {
  const db = dbList.find((d) => d.sanityId === kandidat._id);

  const synced = Boolean(db);

  const hasChanges =
    Boolean(db) &&
    ((db?.nama ?? "").trim() !== (kandidat.namaPaslon ?? "").trim() ||
      Number(db?.noUrut ?? 0) !== Number(kandidat.noUrut ?? 0));

  return {
    synced,
    hasChanges,
  };
}
