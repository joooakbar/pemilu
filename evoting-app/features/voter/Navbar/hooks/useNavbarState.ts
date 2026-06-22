"use client";

import { useEffect, useMemo, useState } from "react";

export type ElectionStatus = "DRAFT" | "ACTIVE" | "ENDED";

interface NavbarElectionState {
  status: ElectionStatus;
  isActive: boolean;
}

export const useNavbarState = (
  startTime?: string,
  endTime?: string,
): NavbarElectionState => {
  const [now, setNow] = useState<number>(0);

  useEffect(() => {
    const tick = () => setNow(Date.now());

    tick(); // initial
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, []);

  return useMemo(() => {
    if (!startTime || !endTime) {
      return { status: "DRAFT", isActive: false };
    }

    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    if (isNaN(start) || isNaN(end)) {
      return { status: "DRAFT", isActive: false };
    }

    if (now === 0) {
      return { status: "DRAFT", isActive: false };
    }

    if (now < start) {
      return { status: "DRAFT", isActive: false };
    }

    if (now <= end) {
      return { status: "ACTIVE", isActive: true };
    }

    return { status: "ENDED", isActive: false };
  }, [now, startTime, endTime]);
};
