import Typewriter from "../Typewriter";
import { IoReturnDownBackSharp } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";

interface StartButtonData {
  handleStart: () => void;
}

const StartButton: React.FC<StartButtonData> = ({ handleStart }) => {
  const [active, setActive] = useState<boolean>(false);

  const handleActive = () => {
    setActive(true);
  };

  const handleInactive = () => {
    setActive(false);
  };

  return (
    <Link
      to={"/quiz/matching-quiz/quiz"}
      className={` text-dark-orange border-y-4 border-black flex justify-center items-center ${
        active
          ? "h-28 animate-expand--start-button bg-beige"
          : `border-l-2 h-28 w-1/2 absolute right-0 animate-shrink--start-button`
      }`}
      onMouseLeave={handleInactive}
    >
      <span className="absolute flex flex-row items-center gap-2 bottom-2 right-2 text-xl font-bold italic">
        Enter <IoReturnDownBackSharp />
      </span>
      <div>
        <h1
          className="font-black text-6xl tracking-widest inline p-4"
          onMouseEnter={handleActive}
        >
          START
        </h1>
      </div>
      <Typewriter
        text="始まりました"
        speed={100}
        style="font-semibold text-xs tracking-widest absolute left-1/2 bottom-2 -translate-x-1/2"
      />
    </Link>
  );
};

export { StartButton };
