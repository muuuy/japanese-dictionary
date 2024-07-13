import { useState } from "react";

import { FlashcardData } from "../../interfaces";

interface QuestionBoxData {
  currentQuestion: FlashcardData;
}

const QuestionBox: React.FC<QuestionBoxData> = ({ currentQuestion }) => {
  return (
    <div>
      <div>{currentQuestion.character}</div>
    </div>
  );
};

export default QuestionBox;
