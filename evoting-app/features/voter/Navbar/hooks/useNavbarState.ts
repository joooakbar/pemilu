"use client";

import { useEffect, useState } from "react";

export type ElectionStatus = "DRAFT" | "ACTIVE" | "ENDED";

interface NavbarElectionState {
  status: ElectionStatus;
  isActive: boolean;
}

export const useNavbarState = (
  startTime?: string,
  endTime?: string,
): NavbarElectionState => {
  const [state, setState] = useState<NavbarElectionState>({
    status: "DRAFT",
    isActive: false,
  });

  useEffect(() => {
    if (!startTime || !endTime) {
      setState({
        status: "DRAFT",
        isActive: false,
      });
      return;
    }

    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    if (isNaN(start) || isNaN(end)) {
      setState({
        status: "DRAFT",
        isActive: false,
      });
    }

    const tick = () => {
      const now = Date.now();

      let status: ElectionStatus = "DRAFT";

      if (now < start) {
        status = "DRAFT";
      } else if (now >= start && now <= end) {
        status = "ACTIVE";
      } else {
        status = "ENDED";
      }

      setState({
        status,
        isActive: status === "ACTIVE",
      });
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [startTime, endTime]);

  return state;
};
