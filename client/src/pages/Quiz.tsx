import { useEffect, useState } from "react";

import useUserStore from "../stores/store";
import { FlashcardData } from "../interfaces";

interface QuizData {
  flashcard: FlashcardData;
  isAnswered: boolean;
}

const Quiz = () => {
  const flashcards: FlashcardData[] = useUserStore((state) => state.flashcards);

  const [quizQuestions, setQuizQuestions] = useState<QuizData[]>([]);

  useEffect(() => {
    const questions: QuizData[] = flashcards.map((flashcard) => ({
      flashcard: flashcard,
      isAnswered: false,
    }));

    setQuizQuestions(questions);
  }, [flashcards]);

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <h1 className="page--header">QUIZ</h1>
    </div>
  );
};

export default Quiz;
