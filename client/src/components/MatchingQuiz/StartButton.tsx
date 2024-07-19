import Typewriter from "../Typewriter";
import { FaPlay } from "react-icons/fa";

interface StartButtonData {
  handleStart: () => void;
}

const StartButton: React.FC<StartButtonData> = ({ handleStart }) => {
  return (
    <button
      onClick={handleStart}
      className="border-2 border-black h-28 w-full -skew-x-6 bg-red-600 relative transition duration-500 ease-in-out hover:bg-red-500"
    >
      <div>
        <span className="font-black text-5xl tracking-widest flex flex-row items-center gap-16 ml-4">
          START QUIZ
          <FaPlay size={36} className="mt-[6px]" />
        </span>
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
