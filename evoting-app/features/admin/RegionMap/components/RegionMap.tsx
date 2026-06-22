"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar } from "react-chartjs-2";
import { chartOptions } from "../chart/chart.options";
import "../chart/chart.config";
import { useRegionMap } from "../hooks/useRegioChart";

interface Props {
  electionId: string;
}

export default function RegionMap({ electionId }: Props) {
  const regions = useRegionMap(electionId);

  const sorted = [...regions].sort((a, b) => b.jumlah - a.jumlah).slice(0, 10);

  const totalSuara = sorted.reduce((sum, region) => sum + region.jumlah, 0);

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

        <p className="text-xs text-muted-foreground">
          Berdasarkan 6 digit pertama NIK (kode wilayah)
        </p>
      </CardHeader>

      <CardContent className="h-64">
        {sorted.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Belum ada data wilayah
          </div>
        ) : (
          <Bar
            data={chartData}
            options={{
              ...chartOptions,

              plugins: {
                ...chartOptions.plugins,

                tooltip: {
                  callbacks: {
                    title: (items) => {
                      return `Wilayah ${items[0].label}`;
                    },

                    label: (context) => {
                      const value = Number(context.raw);

                      const percentage =
                        totalSuara > 0
                          ? ((value / totalSuara) * 100).toFixed(1)
                          : "0";

                      return [
                        `Jumlah: ${value} suara`,
                        `Persentase: ${percentage}%`,
                      ];
                    },
                  },
                },
              },
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
