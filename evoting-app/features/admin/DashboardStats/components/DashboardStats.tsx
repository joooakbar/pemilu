"use client";

import { useElectionStats } from "@/hooks/useSSE";
import { formatPersen } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, CheckCircle2, XCircle, TrendingUp } from "lucide-react";

export default function DashboardStats({
  electionId,
  electionStatus,
}: {
  electionId: string;
  electionStatus: string;
}) {
  const { stats } = useElectionStats(electionId);

  console.log("DashboardStats", {
    electionId,
    stats,
  });

  if (!stats) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-24 rounded-xl" />
        ))}
      </div>
    );
  }

  const cards = [
    {
      label: "Total DPT",
      value: stats.totalDPT ?? 0,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Sudah Memilih",
      value: stats.sudahMemilih ?? 0,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Belum Memilih",
      value: stats.belumMemilih ?? 0,
      icon: XCircle,
      color: "text-rose-500",
      bg: "bg-rose-50",
    },
    {
      label: "Partisipasi",
      value: formatPersen(stats.sudahMemilih ?? 0, stats.totalDPT || 1),
      icon: TrendingUp,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
  ];
  console.log(stats.totalDPT);
  console.log("Sudah Memilih:", stats.sudahMemilih);
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, icon: Icon, color, bg }) => (
        <Card key={label}>
          <CardContent className="p-5 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${bg} flex-center shrink-0`}>
              <Icon className={`w-6 h-6 ${color}`} />
            </div>

            <div>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="col-span-2 lg:col-span-4 text-xs text-muted-foreground text-right">
        Status election: <strong className="uppercase">{electionStatus}</strong>{" "}
        · Update otomatis tiap 3 detik
      </div>
    </div>
  );
}
