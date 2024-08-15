import { useReducer } from "react";
import { QuizSection } from "../components/Quiz/QuizSection";
import { Skeleton } from "@chakra-ui/react";
import { useQuizSectionState } from "../hooks/useQuizSectionState";
import { QuizSectionDetails } from "../components/Quiz/QuizInterface";
import VocabularyImage from "../assets/Quiz/fill-blank_section.jpg";
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
  const activeSectionManager = useQuizSectionState();
  const [state, dispatch] = useReducer(reducer, {
    imageOneLoaded: false,
    imageTwoLoaded: false,
  });

  const handleImageOneLoaded = () => {
    dispatch({ type: "LOAD_IMAGE_ONE" });
  };

  const handleImageTwoLoaded = () => {
    dispatch({ type: "LOAD_IMAGE_TWO" });
  };

  const { imageOneLoaded, imageTwoLoaded } = state;

  const sectionData: QuizSectionDetails[] = [
    {
      sectionID: "vocabulary",
      sectionName: "VOCABULARY",
      japaneseName: "語彙クイズ",
      image: VocabularyImage,
      link: "/quiz/vocabulary-quiz",
    },
    {
      sectionID: "matching",
      sectionName: "MATCHING",
      japaneseName: "マッチング",
      image: MatchingImage,
      link: "/quiz/matching-quiz/start",
    },
  ];

  return (
    <Skeleton
      className="flex flex-1 flex-row justify-center items-center gap-12"
      fadeDuration={1}
      isLoaded={imageOneLoaded && imageTwoLoaded}
    >
      <QuizSection
        activeSectionManager={activeSectionManager}
        sectionDetails={sectionData[0]}
        handleImageLoaded={handleImageOneLoaded}
        animation="animate-fade-in--right"
      />
      <QuizSection
        activeSectionManager={activeSectionManager}
        sectionDetails={sectionData[1]}
        handleImageLoaded={handleImageTwoLoaded}
        animation="animate-fade-in--left"
      />
    </Skeleton>
  );
};

export default Quiz;
