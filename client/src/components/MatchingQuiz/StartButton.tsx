import Typewriter from "../Typewriter";
import { IoReturnDownBackSharp } from "react-icons/io5";
import { useState } from "react";

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
    <button
      onClick={handleStart}
      className={`${
        active
          ? "h-full z-10 bg-beige animate-expand--start-button text-dark-orange"
          : "border-l-2 border-black h-28 w-full relative text-dark-orange"
      }`}
      onMouseLeave={handleInactive}
    >
      <span className="absolute flex flex-row items-center gap-2 bottom-2 right-2 text-xl font-bold italic">
        Enter <IoReturnDownBackSharp />
      </span>
      <div>
        <h1
          className="font-black text-5xl tracking-widest inline p-4"
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
    </button>
  );
};

export default StartButton;
