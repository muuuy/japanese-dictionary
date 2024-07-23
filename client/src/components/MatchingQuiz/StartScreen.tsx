import { useEffect, useState } from "react";
import StartButton from "./StartButton";
import RulesButton from "./RulesButton";
import Rules from "./Rules";
import MatchingQuizImage from "../../assets/matching_quiz.jpg";

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
      <h1 className="text-7xl font-black text-center z-2 italic absolute top-8">
        MATCHING
        <br />
        QUIZ
      </h1>
      <h2 className="absolute bottom-8 text-2xl font-black bg-red-500 text-white rounded-full px-4 py-2 border-2 border-black">
        マッチングクイズ
      </h2>
      <img
        src={MatchingQuizImage}
        alt="Beautiful Japanese Scenery"
        className="h-4/6 w-full object-cover"
      />
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
