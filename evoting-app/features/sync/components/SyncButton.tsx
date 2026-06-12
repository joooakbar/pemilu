"use client";

import { Button } from "@/components/ui/button";
import { useSync } from "../hooks/useSync";

export function SyncButton() {
  const { sync, loading, result, error } = useSync();

  return (
    <div className="space-y-2">
      <Button onClick={sync} disabled={loading}>
        {loading ? "Syncing..." : "Sync Data"}
      </Button>

      {result && (
        <div className="text-sm">
          <p>Created: {result.created}</p>
          <p>Updated: {result.updated}</p>
          <p>Skipped: {result.skipped}</p>
        </div>
      )}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
