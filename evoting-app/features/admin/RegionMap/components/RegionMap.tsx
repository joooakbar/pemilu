"use client";
import { useElectionStats } from "@/hooks/useSSE";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar } from "react-chartjs-2";
import { chartOptions } from "../chart/chart.options";
import "../chart/chart.config";
import { ElectionStats, RegionStats } from "@/types";

interface Props {
  electionId: string;
}
type RegionMapStats = ElectionStats & {
  suaraPerWilayah?: RegionStats[];
};

export default function RegionMap({ electionId }: Props) {
  const { stats } = useElectionStats(electionId) as {
    stats: RegionMapStats | null;
  };

  if (!stats) {
    return null;
  }

  const sorted = [...(stats?.suaraPerWilayah ?? [])]
    .sort((a, b) => b.jumlah - a.jumlah)
    .slice(0, 10);
  const chartData = {
    labels: sorted.map((region) => region.kodeWilayah),

    datasets: [
      {
        label: "Jumlah Suara",

        data: sorted.map((region) => region.jumlah),

        backgroundColor: "#1d4ed8cc",

        borderRadius: 6,
      },
    ],
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Sebaran Suara per Wilayah</CardTitle>

        <p
          className="
            text-xs
            text-muted-foreground
          "
        >
          Berdasarkan 6 digit pertama NIK (kode wilayah)
        </p>
      </CardHeader>

      <CardContent className="h-64">
        {sorted.length === 0 ? (
          <div
            className="
              flex
              h-full
              items-center
              justify-center
              text-sm
              text-muted-foreground
            "
          >
            Belum ada data wilayah
          </div>
        ) : (
          <Bar data={chartData} options={chartOptions} />
        )}
      </CardContent>
    </Card>
  );
}
