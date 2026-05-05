import { useEffect, useState } from "react";

export const useCountdown = (
    startTime?: string,
    endTime?: string,
    status?: "DRAFT" | "ACTIVE" | "ENDED"
) => {
    const [timeLeft, setTimeLeft] = useState({
        h: "00",
        m: "00",
        s: "00",
    });

    useEffect(() => {
        if(!startTime || !endTime || !status) return;

        const target = status === "DRAFT" 
            ? new Date(startTime).getTime()
            : new Date(endTime).getTime();

        const tick = () => {
            const now = Date.now();
            const diff = target - now;

            if (diff <= 0) {
                setTimeLeft({
                    h: "00",
                    m: "00",
                    s: "00",
                })
                return;
            }

            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
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
    }, [startTime, endTime, status]);

    return { timeLeft }; 
}