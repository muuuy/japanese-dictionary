import { useEffect, useState } from "react";
import { Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

import useUserStore from "../stores/store";
import { FlashcardData } from "../interfaces";

import AnswerBar from "../components/Quiz/AnswerBar";

const Quiz = () => {
  const [answeredQuestions, setAnsweredQuestions] = useState<FlashcardData[]>(
    []
  );
  const [unAnsweredQuestions, setUnansweredQuestions] = useState<
    FlashcardData[]
  >(useUserStore((state) => state.flashcards));

  const [userInput, setUserInput] = useState<string>("");
  const [currentQuestion, setcurrentQuestion] = useState<FlashcardData | null>(
    null
  );

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    input: string
  ) => {
    event.preventDefault();

    if (input === currentQuestion?.character) return true;
    else return false;
  };

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <h1 className="page--header">QUIZ</h1>
      <AnswerBar handleSubmit={handleSubmit} />
    </div>
  );
};

export default Quiz;
