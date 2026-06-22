"use client";

import { useEffect, useMemo, useState } from "react";

export type ElectionStatus = "DRAFT" | "ACTIVE" | "ENDED";

export const useAdminElectionStatus = (
  startTime?: string,
  endTime?: string,
): ElectionStatus => {
  const [now, setNow] = useState<number>(0);

  useEffect(() => {
    const tick = () => setNow(Date.now());

    tick(); // initial run
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, []);

  return useMemo(() => {
    if (!startTime || !endTime) return "DRAFT";

    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    if (isNaN(start) || isNaN(end)) return "DRAFT";

    if (now === 0) return "DRAFT";

    if (now < start) return "DRAFT";
    if (now <= end) return "ACTIVE";

    return "ENDED";
  }, [now, startTime, endTime]);
};
