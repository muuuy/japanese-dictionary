import { useState } from "react";

import { FlashcardData } from "../../interfaces";

const QuestionBox = () => {
  const answeredQuestions = useState<FlashcardData[]>([]);
  const unAnsweredQuestions = useState<FlashcardData[]>([]);

  const randomQuestion = () => {
    
  }

  return (
    <div>
      <div></div>
    </div>
  );
};

export default QuestionBox;
