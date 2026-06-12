import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { ElectionDB } from "../types";

interface Props {
  election: ElectionDB;
  onEdit: () => void;
}

export default function ElectionCard({ election, onEdit }: Props) {
  const statusIcon =
    election.status === "ACTIVE"
      ? "🟢"
      : election.status === "DRAFT"
        ? "📝"
        : "⚪";

  const statusColor =
    election.status === "ACTIVE"
      ? "bg-green-100 text-green-700 border-green-200"
      : election.status === "DRAFT"
        ? "bg-amber-100 text-amber-700 border-amber-200"
        : "bg-secondary text-muted-foreground border-border";

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex items-start justify-between gap-4 p-5">
        <div className="min-w-0 flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg">{statusIcon}</span>

            <p className="font-semibold">{election.nama}</p>

            <span
              className={`rounded border px-2 py-0.5 text-xs font-medium ${statusColor}`}
            >
              {election.status}
            </span>
          </div>
        </div>

        {(election.status === "DRAFT" || election.status === "ACTIVE") && (
          <Button
            size="sm"
            variant="outline"
            onClick={onEdit}
            className="shrink-0 gap-1.5"
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Button>
        )}
      </div>
    </div>
  );
}
