import { useState, useReducer } from "react";
import { QuizSection } from "../components/Quiz/QuizSection";
import { Skeleton } from "@chakra-ui/react";
import FillInBlankImage from "../assets/Quiz/fill-blank_section.jpg";
import MatchingImage from "../assets/Quiz/matching_section.jpg";

interface ImageState {
  imageOneLoaded: boolean;
  imageTwoLoaded: boolean;
}

interface ImageAction {
  type: "LOAD_IMAGE_ONE" | "LOAD_IMAGE_TWO";
}

const reducer = (state: ImageState, action: ImageAction): ImageState => {
  switch (action.type) {
    case "LOAD_IMAGE_ONE":
      return { ...state, imageOneLoaded: true };
    case "LOAD_IMAGE_TWO":
      return { ...state, imageTwoLoaded: true };
    default:
      return state;
  }
};

const Quiz = () => {
  const [active, setActive] = useState<string | null>(null);
  const [state, dispatch] = useReducer(reducer, {
    imageOneLoaded: false,
    imageTwoLoaded: false,
  });

  const handleActive = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.getAttribute("id");

    if (id === active) setActive(null);
    else setActive(e.currentTarget.getAttribute("id"));
  };

  const handleImageOneLoaded = () => {
    dispatch({ type: "LOAD_IMAGE_ONE" });
  };

  const handleImageTwoLoaded = () => {
    dispatch({ type: "LOAD_IMAGE_TWO" });
  };

  const { imageOneLoaded, imageTwoLoaded } = state;

  return (
    <Skeleton
      className="flex flex-1 flex-row justify-center items-center gap-12"
      fadeDuration={1}
      isLoaded={imageOneLoaded && imageTwoLoaded}
    >
      <QuizSection
        active={active}
        setActive={handleActive}
        sectionName="VOCABULARY"
        japaneseName="語彙クイズ"
        sectionID="fill-in-the-blank"
        image={FillInBlankImage}
        link="/quiz/fill-in-the-blank-quiz"
        handleImageLoaded={handleImageOneLoaded}
        animation="animate-fade-in--right"
      />
      <QuizSection
        active={active}
        setActive={handleActive}
        sectionName="MATCHING"
        japaneseName="マッチング"
        sectionID="matching"
        image={MatchingImage}
        link="/quiz/matching-quiz/start"
        handleImageLoaded={handleImageTwoLoaded}
        animation="animate-fade-in--left"
      />
    </Skeleton>
  );
};

export default Quiz;
