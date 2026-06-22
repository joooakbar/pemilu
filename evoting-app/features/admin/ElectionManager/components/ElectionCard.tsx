import { Calendar, MapPin, Hash } from "lucide-react";
import { ElectionDB } from "../types";

interface Props {
  election: ElectionDB;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ElectionCard({ election }: Props) {
  const statusIcon =
    election.status === "ACTIVE"
      ? "🟢"
      : election.status === "DRAFT"
        ? "📝"
        : election.status === "SUSPENDED"
          ? "⏸️"
          : "⚪";

  const statusColor =
    election.status === "ACTIVE"
      ? "bg-green-100 text-green-700 border-green-200"
      : election.status === "DRAFT"
        ? "bg-amber-100 text-amber-700 border-amber-200"
        : election.status === "SUSPENDED"
          ? "bg-amber-50 text-amber-600 border-amber-200"
          : "bg-secondary text-muted-foreground border-border";

  return (
    <div className="overflow-hidden rounded-xl border bg-card">
      <div className="flex items-start justify-between gap-4 p-5">
        <div className="min-w-0 flex-1 space-y-3">
          {/* HEADER */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-lg">{statusIcon}</span>

            <p className="font-semibold">{election.nama}</p>

            <span
              className={`rounded border px-2 py-0.5 text-xs font-medium ${statusColor}`}
            >
              {election.status}
            </span>

            {election.sanityId && (
              <span className="text-xs px-2 py-0.5 rounded border bg-purple-50 text-purple-700 border-purple-200">
                🔗 SANITY
              </span>
            )}
          </div>

          {/* DETAIL INFO */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Mulai: {formatDate(election.startTime)}
            </div>

            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Selesai: {formatDate(election.endTime)}
            </div>

            {election.tempatVoting && (
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                {election.tempatVoting}
              </div>
            )}

            <div className="flex items-center gap-1 font-mono opacity-70">
              <Hash className="w-3.5 h-3.5" />
              {election.id.slice(0, 14)}...
            </div>
          </div>
        </div>

        {/* BUTTON */}
        {election.status === "DRAFT" || election.status === "ACTIVE"}
      </div>
    </div>
  );
}
