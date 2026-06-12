import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface Props {
  action: string;
  loading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function EmergencyConfirm({
  action,
  loading,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-4 space-y-3">
      <p className="font-medium text-sm">
        ⚠ Konfirmasi: <strong>{action}</strong>
      </p>

      <div className="flex gap-2">
        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="destructive"
          size="sm"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            "Ya, Lanjutkan"
          )}
        </Button>

        <Button onClick={onCancel} variant="outline" size="sm">
          Batal
        </Button>
      </div>
    </div>
  );
}
