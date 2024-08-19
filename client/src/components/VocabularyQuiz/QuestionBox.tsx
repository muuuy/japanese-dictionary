import { FlashcardData } from "../../interfaces";

interface QuestionBoxData {
  currentQuestion: FlashcardData | null;
}

const QuestionBox: React.FC<QuestionBoxData> = ({ currentQuestion }) => {
  return (
    <div>
      <p className="font-black text-4xl mb-8">{currentQuestion?.character}</p>
    </div>
  );
};

export default QuestionBox;
