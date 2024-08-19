import { useEffect, useState } from "react";
import { Skeleton } from "@chakra-ui/react";
import { StartButton } from "../components/MatchingQuiz/StartButton";
import { RulesButton } from "../components/MatchingQuiz/RulesButton";
import { Rules } from "../components/MatchingQuiz/Rules";
import { useNavigate } from "react-router-dom";
import MatchingQuizImage from "../assets/matching_quiz.jpg";

const MatchingQuizStart = () => {
  const [tutorial, setTutorial] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        navigate("/quiz/matching-quiz/quiz");
      }
      if (event.key === "t") {
        setTutorial((prev) => !prev);
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [navigate]);

  const handleTutorial = () => {
    setTutorial((prev) => !prev);
  };

  const handleClose = () => {
    setTutorial(false);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Skeleton
      className="flex flex-1 max-h-screen flex-col justify-center"
      fadeDuration={1}
      isLoaded={imageLoaded}
    >
      <div className="flex flex-col left-0 flex flex-col gap-4 w-full">
        <div className="matching-quiz--header-container">
          <h1 className="matching-quiz--header font-bold tracking-wider animate-header--fade-in">
            MATCHING QUIZ
            <span className="matching-quiz--sub-header">
              Practice your Japanese skills.
            </span>
          </h1>
        </div>
        <div className="matching-quiz--header-container">
          <h2 className="matching-quiz--header font-black pt-12 animate-header--fade-in">
            マッチングクイズ
            <span className="matching-quiz--sub-header">
              日本語のスキルを練習しましょう.
            </span>
          </h2>
        </div>
      </div>
      <img
        src={MatchingQuizImage}
        alt="Beautiful Japanese Scenery"
        className="h-3/5 w-full object-cover p-4"
        onLoad={handleImageLoad}
      />
      <div className="h-28 relative">
        <RulesButton handleTutorial={handleTutorial} />
        <StartButton />
      </div>
      {tutorial && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-10" />
          <Rules handleClose={handleClose} />
        </>
      )}
    </Skeleton>
  );
};

export { MatchingQuizStart };
