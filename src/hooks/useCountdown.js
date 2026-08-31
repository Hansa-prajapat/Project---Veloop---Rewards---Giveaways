import { useEffect, useMemo, useState } from "react";

export function useCountdown(targetDate) {
  const calculate = () => Math.max(0, new Date(targetDate).getTime() - Date.now());
  const [remaining, setRemaining] = useState(calculate);

  useEffect(() => {
    const timer = setInterval(() => setRemaining(calculate()), 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return useMemo(() => {
    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return { remaining, days, hours, minutes, seconds, expired: remaining === 0 };
  }, [remaining]);
}
