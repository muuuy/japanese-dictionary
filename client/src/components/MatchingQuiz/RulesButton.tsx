import Typewriter from "../Typewriter";
import { useState, useEffect } from "react";

interface TutorialButtonData {
  handleTutorial: () => void;
}

const RulesButton: React.FC<TutorialButtonData> = ({ handleTutorial }) => {
  const [active, setActive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(true), 100);

    return () => clearTimeout(timer);
  }, []);

  const handleActive = () => {
    setActive(true);
  };

  const handleInactive = () => {
    setActive(false);
  };

  return (
    <button
      onClick={handleTutorial}
      className={`text-red-600 bg-beige ${
        active
          ? `h-full z-10  animate-expand--end-button`
          : `relative flex items-center justify-center border-r-2 border-black h-28 w-1/2 ${
              loading ? "" : "animate-shrink--end-button"
            }`
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

export default RulesButton;
