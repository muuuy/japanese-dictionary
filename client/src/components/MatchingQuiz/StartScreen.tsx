import { useEffect, useState } from "react";
import { Skeleton } from "@chakra-ui/react";
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
    <Skeleton>
      <div className="absolute top-20 left-0 flex flex-col gap-4 w-full">
        <h1 className="matching-quiz--header font-bold tracking-wider">
          MATCHING QUIZ
          <span className="matching-quiz--sub-header">
            Practice your Japanese skills.
          </span>
        </h1>
        <h2 className="matching-quiz--header font-black pt-12">
          マッチングクイズ
          <span className="matching-quiz--sub-header">
            日本語のスキルを練習しましょう.
          </span>
        </h2>
      </div>
      <div className="flex flex-row w-full border-y-4 border-black relative">
        <RulesButton handleTutorial={handleTutorial} />
        <StartButton handleStart={handleStart} />
      </div>
      <img
        src={MatchingQuizImage}
        alt="Beautiful Japanese Scenery"
        className="h-1/3 w-full object-cover absolute bottom-0"
      />
      {tutorial && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-10" />
          <Rules handleClose={handleClose} />
        </>
      )}
    </Skeleton>
  );
};

export default StartScreen;
