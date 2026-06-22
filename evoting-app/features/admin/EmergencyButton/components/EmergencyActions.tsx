import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface Props {
  isActive: boolean;
  isEnded: boolean;
  onEnd: () => void;
}

export default function EmergencyActions({ isActive, isEnded, onEnd }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {isActive && (
        <Button
          variant="outline"
          onClick={onEnd}
          className="gap-2 border-destructive text-destructive"
        >
          <AlertTriangle className="w-4 h-4" />
          Akhiri
        </Button>
      )}

      {isEnded && (
        <div className="text-sm text-muted-foreground">
          Pemilihan telah berakhir
        </div>
      )}
    </div>
  );
}
