import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw, CheckCircle2 } from "lucide-react";

interface Props {
  syncing: boolean;
  disabled: boolean;
  syncResult: {
    action: string;
    message: string;
  } | null;
  onSync: () => void;
}

export default function SyncSection({
  syncing,
  disabled,
  syncResult,
  onSync,
}: Props) {
  const isLoading = syncing || disabled;

  const actionLabel =
    syncResult?.action === "created"
      ? "Election Dibuat"
      : "Election Diperbarui";

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4 rounded-lg bg-secondary/40 border border-dashed">
      <p className="text-sm font-medium text-center">Sync ke Database</p>

      <Button onClick={onSync} disabled={isLoading} className="w-full gap-2">
        {syncing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Sinkronisasi...
          </>
        ) : (
          <>
            <RefreshCw className="w-4 h-4" />
            Sinkronisasi
          </>
        )}
      </Button>

      {syncResult && (
        <div className="w-full rounded-lg p-3 text-xs bg-green-50 border border-green-200 text-green-700">
          <div className="flex items-center gap-1.5 font-medium mb-0.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {actionLabel}
          </div>

          {syncResult.message}
        </div>
      )}
    </div>
  );
}
