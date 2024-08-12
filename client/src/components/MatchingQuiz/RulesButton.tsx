import Typewriter from "../Typewriter";
import { useState } from "react";

interface TutorialButtonData {
  handleTutorial: () => void;
}

const RulesButton: React.FC<TutorialButtonData> = ({ handleTutorial }) => {
  const [active, setActive] = useState<boolean>(false);

  const handleActive = () => {
    setActive(true);
  };

  const handleInactive = () => {
    setActive(false);
  };

  return (
    <button
      onClick={handleTutorial}
      className={`text-red-600 bg-beige border-y-4 border-black ${
        active
          ? `h-28 animate-expand--end-button`
          : `absolute left-0 h-28 border-r-2 w-1/2 animate-shrink--end-button`
      }`}
      onMouseLeave={handleInactive}
    >
      <span className="absolute bottom-2 left-2 text-xl font-bold italic">
        T
      </span>
      <span
        className="font-black text-6xl tracking-widest"
        onMouseEnter={handleActive}
      >
        RULES
      </span>
      <Typewriter
        text="ルール"
        speed={100}
        style="font-semibold text-xs tracking-widest absolute left-1/2 bottom-2 -translate-x-1/2"
      />
    </button>
  );
};

export { RulesButton };
