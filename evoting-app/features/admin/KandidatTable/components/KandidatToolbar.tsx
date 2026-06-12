import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  syncing: boolean;
  totalSanity: number;
  totalDB: number;
  onSync: () => void;
}

export default function KandidatToolbar({
  syncing,
  totalSanity,
  totalDB,
  onSync,
}: Props) {
  return (
    <div
      className="
        flex
        flex-wrap
        items-center
        justify-between
        gap-3
      "
    >
      <p
        className="
          text-sm
          text-muted-foreground
        "
      >
        <span className="font-medium">{totalSanity}</span> kandidat di Sanity ·{" "}
        <span className="font-medium">{totalDB}</span> terdaftar di database
      </p>

      <Button onClick={onSync} disabled={syncing} className="gap-2">
        {syncing ? (
          <>
            <Loader2
              className="
                h-4
                w-4
                animate-spin
              "
            />
            Sinkronisasi...
          </>
        ) : (
          <>
            <RefreshCw className="h-4 w-4" />
            Sinkronisasi ke Database
          </>
        )}
      </Button>
    </div>
  );
}
