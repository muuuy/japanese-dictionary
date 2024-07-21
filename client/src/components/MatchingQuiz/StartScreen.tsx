import { useEffect, useState } from "react";
import StartButton from "./StartButton";
import RulesButton from "./RulesButton";
import Rules from "./Rules";

interface StartScreenData {
  handleStart: () => void;
}

const StartScreen: React.FC<StartScreenData> = ({ handleStart }) => {
  const [tutorial, setTutorial] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") handleStart();
      if (event.key === "t") handleTutorial();
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [handleStart]);

  const handleTutorial = () => {
    setTutorial(true);
  };

  const handleClose = () => {
    setTutorial(false);
  };

  return (
    <>
      <h1 className="text-9xl font-black">MATCHING QUIZ</h1>
      <div className="absolute bottom-0 -right-2">
        <StartButton handleStart={handleStart} />
      </div>
      <div className="absolute bottom-0 -left-2">
        <RulesButton handleTutorial={handleTutorial} />
      </div>

      {tutorial && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-10" />
          <Rules handleClose={handleClose} />
        </>
      )}
    </>
  );
};

export default StartScreen;
