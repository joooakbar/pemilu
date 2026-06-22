"use client";

import { useState } from "react";
import { toast } from "sonner";
import { fetchKandidatDB, syncKandidat } from "../services/kandidat.service";
import type { KandidatDB, SyncResult } from "../types";

export function useKandidatSync(initialDB: KandidatDB[]) {
  const [dbList, setDbList] = useState(initialDB);
  const [syncing, setSyncing] = useState(false);
  const [result, setResult] = useState<SyncResult | null>(null);

  const sync = async () => {
    try {
      setSyncing(true);
      setResult(null);

      const response = await syncKandidat(dbList);

      const json = await response.json();

      if (!response.ok) {
        toast.error(json.error || "Sync gagal");
        return;
      }

      setResult(json.data);
      toast.success(json.data.message || "Sync berhasil");

      // refresh DB setelah sync
      const dbResponse = await fetchKandidatDB();
      const dbJson = await dbResponse.json();

      if (dbJson.success) {
        setDbList(dbJson.data);
      }
    } catch (error) {
      toast.error("Gagal sinkronisasi kandidat");
      console.error(error);
    } finally {
      setSyncing(false);
    }
  };

  return {
    dbList,
    syncing,
    result,
    sync,
  };
}
