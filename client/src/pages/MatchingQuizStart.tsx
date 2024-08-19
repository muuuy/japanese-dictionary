import { QuizStartScreen } from "../components/QuizStartScreen/QuizStartScreen";
import { StartScreenTitles } from "../components/QuizStartScreen/StartInterface";
import { RuleTypes } from "../components/QuizStartScreen/StartInterface";
import MatchingQuizImage from "../assets/matching_quiz.jpg";

const MatchingQuizStart = () => {
  const titles: StartScreenTitles = {
    englishTitle: "MATCHING QUIZ",
    japaneseTitle: "マッチングクイズ",
  };

  return (
    <QuizStartScreen
      linkTo="/quiz/matching-quiz"
      image={MatchingQuizImage}
      titles={titles}
      rulesType={RuleTypes.MATCHING}
    />
  );
};

export { MatchingQuizStart };
