import { useEffect, useState } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 59) {
          setMinutes((prev) => prev + 1);
          return 0;
        } else return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const formatToTwoDigits = (number: number): string => {
    return number.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };

  return (
    <div>
      <div>
        {formatToTwoDigits(minutes)} : {formatToTwoDigits(seconds)}
      </div>
    </div>
  );
};

export default Timer;
