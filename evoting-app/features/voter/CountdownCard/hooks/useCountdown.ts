"use client";

import { useEffect, useMemo, useState } from "react";

export const useCountdown = (startTime?: string, endTime?: string) => {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return useMemo(() => {
    if (!startTime || !endTime) {
      return {
        timeLeft: { h: "00", m: "00", s: "00" },
        isBeforeStart: false,
        isActive: false,
        isEnded: false,
      };
    }

    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    const isBeforeStart = now < start;
    const isActive = now >= start && now <= end;
    const isEnded = now > end;

    const target = isBeforeStart ? start : end;
    const diff = Math.max(target - now, 0);

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return {
      timeLeft: {
        h: String(hours).padStart(2, "0"),
        m: String(minutes).padStart(2, "0"),
        s: String(seconds).padStart(2, "0"),
      },
      isBeforeStart,
      isActive,
      isEnded,
    };
  }, [now, startTime, endTime]);
};
