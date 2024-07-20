import Typewriter from "../Typewriter";
import { FaPlay } from "react-icons/fa";
import { FaArrowRightFromBracket } from "react-icons/fa6";

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
        <span className="font-black text-5xl tracking-widest flex flex-row items-center gap-8 ml-4">
          START QUIZ
          <FaPlay size={36} className="mt-[6px] mx-8" />
        </span>
      </div>
      <Typewriter
        text="始まりました"
        speed={100}
        style="font-semibold text-xs tracking-widest absolute left-1/2 bottom-2 -translate-x-1/2"
      />
      <div className="w-10 h-10 border-2 border-black bg-white absolute -left-4 -top-4 rounded-full flex items-center justify-center z-5 skew-x-0">
        <FaArrowRightFromBracket fontSize={20} color="black" />
      </div>
    </button>
  );
};

export default StartButton;
