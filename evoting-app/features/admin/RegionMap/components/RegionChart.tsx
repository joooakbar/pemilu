import { Bar } from "react-chartjs-2";
import { chartOptions } from "../chart/chart.options";
import type { RegionData } from "../types";

interface Props {
  data: RegionData[];
}

export default function RegionChart({ data }: Props) {
  const chartData = {
    labels: data.map((region) => region.kodeWilayah),

    datasets: [
      {
        label: "Jumlah Suara",

        data: data.map((region) => region.jumlah),

        backgroundColor: "#1d4ed8cc",

        borderRadius: 6,
      },
    ],
  };

  return <Bar data={chartData} options={chartOptions} />;
}
