import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useHero = (
  idPemilihan?: string,
  startTime?: Date | string,
  endTime?: Date | string,
) => {
  const router = useRouter();

  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const start = startTime ? new Date(startTime) : null;
  const end = endTime ? new Date(endTime) : null;

  const isStarted = start ? now >= start : false;
  const isEnded = end ? now > end : false;

  const canVote = !!idPemilihan && isStarted && !isEnded;

  const handleVote = () => {
    if (!canVote) return;
    router.push(`/vote/${idPemilihan}`);
  };

  const handleScroll = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return {
    handleVote,
    handleScroll,
    canVote,
    isStarted,
    isEnded,
  };
};
