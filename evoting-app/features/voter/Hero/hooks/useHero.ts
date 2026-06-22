"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { StatusPemilihan } from "@prisma/client";

export const useHero = (
  idPemilihan?: string,
  startTime?: string,
  endTime?: string,
  dbStatus?: StatusPemilihan,
  isManuallyEnded?: boolean, // 🔥 NEW
) => {
  const router = useRouter();

  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const { canVote, isStarted, isEnded, finalStatus } = useMemo(() => {
    const start = startTime ? new Date(startTime).getTime() : null;
    const end = endTime ? new Date(endTime).getTime() : null;

    // -------------------------
    // 1. MANUAL OVERRIDE (HIGHEST PRIORITY)
    // -------------------------
    if (isManuallyEnded) {
      return {
        canVote: false,
        isStarted: true,
        isEnded: true,
        finalStatus: "ENDED",
      };
    }

    // -------------------------
    // 2. TIME BASED LOGIC
    // -------------------------
    const isStarted = start ? now >= start : false;
    const isEnded = end ? now > end : false;

    const canVote = !!idPemilihan && isStarted && !isEnded;

    let finalStatus: "DRAFT" | "ACTIVE" | "ENDED" = "DRAFT";

    if (isEnded) finalStatus = "ENDED";
    else if (isStarted) finalStatus = "ACTIVE";

    return {
      canVote,
      isStarted,
      isEnded,
      finalStatus,
    };
  }, [idPemilihan, startTime, endTime, isManuallyEnded, now]);

  const handleVote = () => {
    if (!canVote) return;
    router.push(`/vote/${idPemilihan}`);
  };

  const handleScroll = (selector: string) => {
    document.querySelector(selector)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return {
    handleVote,
    handleScroll,
    canVote,
    isStarted,
    isEnded,
    status: finalStatus,
  };
};
