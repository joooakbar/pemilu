"use client";

import { useEffect, useState } from "react";

type VoteChartData = {
  labels: string[];
  data: number[];
};

export function useVoteChart(electionId: string) {
  const [chart, setChart] = useState<VoteChartData>({
    labels: [],
    data: [],
  });

  useEffect(() => {
    if (!electionId) return;

    const fetchChart = async () => {
      const res = await fetch(`/api/admin/election/${electionId}/chart`, {
        cache: "no-store",
      });

      if (!res.ok) return;

      const data = await res.json();

      setChart({
        labels: data.labels,
        data: data.data,
      });
    };

    fetchChart();

    const interval = setInterval(fetchChart, 3000);

    return () => clearInterval(interval);
  }, [electionId]);

  return chart;
}
