import { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import useUserStore from "../stores/store";
import { FlashcardData } from "../interfaces";

import AnswerBar from "../components/Quiz/AnswerBar";

interface QuizData {
  flashcard: FlashcardData;
  isAnswered: boolean;
}

const Quiz = () => {
  const flashcards: FlashcardData[] = useUserStore((state) => state.flashcards);
  const [quizQuestions, setQuizQuestions] = useState<QuizData[]>([]);

  const [userInput, setUserInput] = useState<string>("");

  useEffect(() => {
    const questions: QuizData[] = flashcards.map((flashcard) => ({
      flashcard: flashcard,
      isAnswered: false,
    }));

    setQuizQuestions(questions);
  }, [flashcards]);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    input: string
  ) => {
    event.preventDefault();

    if (input === "") return;

    console.log(input);
  };

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <h1 className="page--header">QUIZ</h1>
      <AnswerBar handleSubmit={handleSubmit} />
    </div>
  );
};

export default Quiz;
