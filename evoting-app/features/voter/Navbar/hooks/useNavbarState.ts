"use client";

import { useEffect, useMemo, useState } from "react";

export type ElectionStatus = "DRAFT" | "ACTIVE" | "ENDED";

interface NavbarElectionState {
  status: ElectionStatus;
  isActive: boolean;
  timeToStart: number;
  timeToEnd: number;
}

export const useNavbarState = (
  dbStatus?: ElectionStatus,
  startTime?: string,
  endTime?: string,
): NavbarElectionState => {
  // ⏱️ SOURCE OF TIME (aman, tidak di render)
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return useMemo(() => {
    const start = startTime ? new Date(startTime).getTime() : null;
    const end = endTime ? new Date(endTime).getTime() : null;

    let status: ElectionStatus = dbStatus ?? "DRAFT";

    let timeToStart = 0;
    let timeToEnd = 0;

    if (start && end) {
      timeToStart = Math.max(start - now, 0);
      timeToEnd = Math.max(end - now, 0);

      if (now < start) {
        status = "DRAFT";
      } else if (now >= start && now <= end) {
        status = "ACTIVE";
      } else {
        status = "ENDED";
      }
    }

    return {
      status,
      isActive: status === "ACTIVE",
      timeToStart,
      timeToEnd,
    };
  }, [dbStatus, startTime, endTime, now]);
};
