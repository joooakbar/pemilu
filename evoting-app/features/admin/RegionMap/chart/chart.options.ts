import type { TooltipItem } from "chart.js";

export const chartOptions = {
  maintainAspectRatio: false,

  plugins: {
    legend: {
      display: false,
    },

    tooltip: {
      callbacks: {
        label: (context: TooltipItem<"bar">) => {
          const value = Number(context.raw);

          const dataset = context.dataset.data as number[];

          const total = dataset.reduce(
            (sum, current) => sum + Number(current),
            0,
          );

          const percentage =
            total > 0 ? ((value / total) * 100).toFixed(1) : "0";

          return `${value} suara (${percentage}%)`;
        },
      },
    },
  },

  scales: {
    y: {
      beginAtZero: true,

      ticks: {
        precision: 0,
      },
    },
  },
};
