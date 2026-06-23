"use client";

import { useEffect, useState } from "react";

type RegionData = {
  kodeWilayah: string;
  jumlah: number;
};

export function useRegionMap(electionId: string) {
  const [regions, setRegions] = useState<RegionData[]>([]);

  useEffect(() => {
    if (!electionId) return;

    const fetchRegions = async () => {
      const res = await fetch(`/api/admin/election/${electionId}/regions`, {
        cache: "no-store",
      });

      if (!res.ok) return;

      const data = await res.json();

      setRegions(data.regions ?? []);
    };

    fetchRegions();

    const interval = setInterval(fetchRegions, 3000);

    return () => clearInterval(interval);
  }, [electionId]);

  return regions;
}
