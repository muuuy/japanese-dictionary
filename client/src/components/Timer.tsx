import { useTimer } from "../hooks/useTimer";
import { useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { FaPlay, FaPause } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";

const Timer = () => {
  const [start, setStart] = useState<boolean>(false);
  const { minutes, seconds, reset } = useTimer(start);

  const formatToTwoDigits = (number: number): string => {
    return number.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
  };

  const handleStart = () => {
    setStart(true);
  };

  const handlePause = () => {
    setStart(false);
    console.log("pasued");
  };

  return (
    <div className="absolute top-10 right-10 flex flex-col items-center gap-8">
      <div className="flex flex-row text-5xl font-black relative top-4">
        <div className="relative">
          <p className="timer--number-label">MINUTES</p>
          <p className="timer--number-container font-mono">
            {formatToTwoDigits(minutes)}
          </p>
        </div>
        <div className="relative">
          <p className="relative -top-0.5 p-2 font-mono">:</p>
        </div>
        <div className="relative">
          <p className="timer--number-label">SECONDS</p>
          <p className="timer--number-container font-mono">
            {formatToTwoDigits(seconds)}
          </p>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <IconButton
          onClick={handlePause}
          colorScheme="red"
          variant={"outline"}
          background={"white"}
          icon={<FaPause />}
          aria-label="Pause"
        >
          PAUSE
        </IconButton>
        <IconButton
          onClick={handleStart}
          colorScheme="red"
          icon={<FaPlay />}
          aria-label="Play"
        >
          START
        </IconButton>
        <IconButton
          onClick={reset}
          colorScheme="red"
          variant={"outline"}
          background={"white"}
          icon={<FaArrowsRotate />}
          aria-label="Restart "
        >
          RESET
        </IconButton>
      </div>
    </div>
  );
};

export { Timer };
