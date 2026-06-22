"use client";

import { useEffect, useMemo, useState } from "react";

export type ElectionStatus = "DRAFT" | "ACTIVE" | "ENDED";

export interface ElectionTimeLeft {
  h: string;
  m: string;
  s: string;
}

export interface ElectionState {
  status: ElectionStatus;
  isStarted: boolean;
  isEnded: boolean;
  isManuallyEnded: boolean; // ✅ FIX
  canVote: boolean;
  timeLeft: ElectionTimeLeft;
}

export const useElectionEngine = (
  idPemilihan?: string,
  startTime?: string,
  endTime?: string,
  isManuallyEnded?: boolean,
): ElectionState => {
  const [now, setNow] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (ms: number): ElectionTimeLeft => {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    return {
      h: String(hours).padStart(2, "0"),
      m: String(minutes).padStart(2, "0"),
      s: String(seconds).padStart(2, "0"),
    };
  };

  return useMemo(() => {
    const start = startTime ? new Date(startTime).getTime() : null;
    const end = endTime ? new Date(endTime).getTime() : null;

    const valid = !!start && !!end && !isNaN(start) && !isNaN(end);

    const emergency = !!isManuallyEnded;

    // 🚨 PRIORITY 1: EMERGENCY STOP
    if (emergency) {
      return {
        status: "ENDED",
        isStarted: true,
        isEnded: true,
        isManuallyEnded: true,
        canVote: false,
        timeLeft: { h: "00", m: "00", s: "00" },
      };
    }

    const isStarted = valid ? now >= start! : false;
    const isEnded = valid ? now > end! : false;

    const canVote = !!idPemilihan && valid && isStarted && !isEnded;

    let status: ElectionStatus = "DRAFT";
    if (isEnded) status = "ENDED";
    else if (isStarted) status = "ACTIVE";

    const target = isStarted ? end : start;
    const diff = target ? Math.max(target - now, 0) : 0;

    return {
      status,
      isStarted,
      isEnded,
      isManuallyEnded: false, // normal state
      canVote,
      timeLeft: formatTime(diff),
    };
  }, [now, idPemilihan, startTime, endTime, isManuallyEnded]);
};
