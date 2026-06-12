import { useEffect, useState } from "react";

export const useCountdownTime = (startTime?: string, endTime?: string) => {
  const [state, setState] = useState({
    isBeforeStart: false,
    isActive: false,
    isEnded: false,
  });

  useEffect(() => {
    if (!startTime || !endTime) return;

    const start = new Date(startTime).getTime();
    const end = new Date(endTime).getTime();

    const tick = () => {
      const now = Date.now();

      setState({
        isBeforeStart: now < start,
        isActive: now >= start && now <= end,
        isEnded: now > end,
      });
    };

    tick();
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [startTime, endTime]);

  return state;
};
