import { useEffect, useState } from "react";

export const useCountdown = (startTime?: string, endTime?: string) => {
  const [timeLeft, setTimeLeft] = useState({
    h: "00",
    m: "00",
    s: "00",
  });

  useEffect(() => {
    if (!startTime || !endTime) return;

    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    const tick = () => {
      const now = Date.now();

      let target: number;

      if (now < start) {
        target = start;
      } else if (now >= start && now <= end) {
        target = end;
      } else {
        setTimeLeft({ h: "00", m: "00", s: "00" });
        return;
      }

      const diff = target - now;

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        h: String(hours).padStart(2, "0"),
        m: String(minutes).padStart(2, "0"),
        s: String(seconds).padStart(2, "0"),
      });
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [startTime, endTime]);

  return { timeLeft };
};
