"use client";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { CHART_COLORS } from "../constants/voteChart.constants";
Chart.register(ArcElement, Tooltip, Legend);

interface Props {
  labels: string[];
  data: number[];
}

export default function VoteChartContent({ labels, data }: Props) {
  return (
    <Doughnut
      data={{
        labels,
        datasets: [
          {
            data,
            backgroundColor: CHART_COLORS,
            borderWidth: 2,
          },
        ],
      }}
      options={{
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        maintainAspectRatio: false,
      }}
      style={{ maxHeight: "220px" }}
    />
  );
}
