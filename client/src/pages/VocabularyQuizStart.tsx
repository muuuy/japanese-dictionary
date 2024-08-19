import { QuizStartScreen } from "../components/QuizStartScreen/QuizStartScreen";
import { StartScreenTitles } from "../components/QuizStartScreen/StartInterface";
import VocabStartImage from "../assets/vocab-start.jpg";

const VocabularyQuizStart = () => {
  const titles: StartScreenTitles = {
    englishTitle: "VOCABULARY",
    japaneseTitle: "語彙クイズ",
  };

  return (
    <QuizStartScreen
      linkTo="/quiz/vocabulary-quiz"
      image={VocabStartImage}
      titles={titles}
    />
  );
};

export { VocabularyQuizStart };
