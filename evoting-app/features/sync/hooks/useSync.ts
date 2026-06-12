import { useState } from "react";
import { syncData } from "../services/sync.service";
import type { SyncResult } from "../schemas/sync.schema";

export function useSync() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SyncResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sync = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await syncData();
      setResult(res);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { sync, loading, result, error };
}
