import { useEffect, useState } from "react";
import { Skeleton } from "@chakra-ui/react";
import { StartButton } from "./StartButton";
import { RulesButton } from "./RulesButton";
import { useNavigate } from "react-router-dom";
import { StartScreenData } from "./StartInterface";
import { Rules } from "./Rules";
import clsx from "clsx";

const QuizStartScreen: React.FC<StartScreenData> = ({
  linkTo,
  image,
  titles,
  rulesType,
}) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [tutorial, setTutorial] = useState<boolean>(false);
  const navigate = useNavigate();

  const { englishTitle, japaneseTitle } = titles;

  //Handle key press ("Enter" || "t")
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        navigate(linkTo);
      }
      if (event.key === "t") {
        handleTutorial();
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [navigate, linkTo]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleTutorial = () => {
    setTutorial((prev) => !prev);
  };

  const handleClose = () => {
    setTutorial(false);
  };

  return (
    <Skeleton
      className="flex flex-1 max-h-screen flex-col justify-center"
      fadeDuration={1}
      isLoaded={imageLoaded}
    >
      <div className="flex flex-col left-0 gap-4 w-full">
        <div className="matching-quiz--header-container">
          <h1
            className={clsx(
              "matching-quiz--header font-bold tracking-wider animate-header--fade-in",
              "text-8xl ml-8",
              "lg:text-8xl"
            )}
          >
            {englishTitle}
            <span className="matching-quiz--sub-header">
              Practice your Japanese skills.
            </span>
          </h1>
        </div>
        <div className="matching-quiz--header-container">
          <h2 className="matching-quiz--header font-black pt-12 animate-header--fade-in">
            {japaneseTitle}
            <span className="matching-quiz--sub-header">
              日本語のスキルを練習しましょう.
            </span>
          </h2>
        </div>
      </div>
      <img
        src={image}
        alt="Beautiful Japanese Scenery"
        className="h-3/5 w-full object-cover p-4"
        onLoad={handleImageLoad}
      />
      <div className="h-28 relative">
        <RulesButton handleTutorial={handleTutorial} />
        <StartButton linkTo={linkTo} />
      </div>
      {tutorial && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-10" />
          <Rules handleClose={handleClose} ruleType={rulesType} />
        </>
      )}
    </Skeleton>
  );
};

export { QuizStartScreen };
