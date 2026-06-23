"use client";
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useVoteChart } from "../hooks/useVoteChart";
import type { VoteChartProps } from "../types";

Chart.register(ArcElement, Tooltip, Legend);

export default function VoteChart({ electionId }: VoteChartProps) {
  const { labels, data } = useVoteChart(electionId);

  console.log({
    electionId,
    labels,
    data,
  });

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Perolehan Suara</CardTitle>
      </CardHeader>

      <CardContent
        className="
          flex
          h-64
          items-center
          justify-center
        "
      >
        {data.length === 0 ? (
          <div
            className="
              text-sm
              text-muted-foreground
            "
          >
            Belum ada suara masuk
          </div>
        ) : (
          <Doughnut
            data={{
              labels,
              datasets: [
                {
                  data,
                  backgroundColor: [
                    "#2563eb",
                    "#16a34a",
                    "#dc2626",
                    "#ca8a04",
                    "#9333ea",
                    "#0891b2",
                  ],
                  borderWidth: 2,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,

              plugins: {
                legend: {
                  position: "bottom" as const,
                },

                tooltip: {
                  callbacks: {
                    label: (context) => {
                      const value = context.raw as number;

                      const total = context.dataset.data.reduce(
                        (sum, current) => sum + Number(current),
                        0,
                      );

                      const percentage =
                        total > 0 ? ((value / total) * 100).toFixed(1) : "0";

                      return `${context.label}: ${value} suara (${percentage}%)`;
                    },
                  },
                },
              },
            }}
            style={{
              maxHeight: "220px",
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
