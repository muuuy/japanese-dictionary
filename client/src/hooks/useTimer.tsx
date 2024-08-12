import { useState, useRef, useEffect } from "react";

export const useTimer = (start: boolean) => {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (start) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev == 59) {
            setMinutes((prevMinute) => prevMinute + 1);
            return 0;
          } else {
            return prev + 1;
          }
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [start]);

  const reset = () => {
    setSeconds(0);
    setMinutes(0);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  return { seconds, minutes, reset };
};
