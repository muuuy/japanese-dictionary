import { useEffect, useState } from "react";

import useUserStore from "../stores/store";
import { FlashcardData } from "../interfaces";

import AnswerBar from "../components/Quiz/AnswerBar";
import QuestionBox from "../components/Quiz/QuestionBox";
import Restart from "../components/Quiz/Restart";
import Results from "../components/Quiz/Results";

const Quiz = () => {
  const flashcards = useUserStore<FlashcardData[]>((state) => state.flashcards);

  const [answeredQuestions, setAnsweredQuestions] = useState<FlashcardData[]>(
    []
  );
  const [unAnsweredQuestions, setUnansweredQuestions] = useState<
    FlashcardData[]
  >(useUserStore((state) => state.flashcards));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1);
  const [numCorrect, setNumCorrect] = useState<number>(0);
  const [numWrong, setNumWrong] = useState<number>(0);

  useEffect(() => {
    setUnansweredQuestions([...flashcards]);
  }, [flashcards]);

  useEffect(() => {
    const randomIndex: number = Math.floor(
      Math.random() * unAnsweredQuestions.length
    );

    setCurrentQuestionIndex(randomIndex);
  }, [unAnsweredQuestions]);

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    input: string
  ) => {
    event.preventDefault();

    if (input === unAnsweredQuestions[currentQuestionIndex].character)
      handleCorrect();
    else setNumWrong((prev) => prev + 1);
  };

  const handleCorrect = () => {
    setAnsweredQuestions((prev) => [
      ...prev,
      unAnsweredQuestions[currentQuestionIndex],
    ]);

    const filteredQuestions = [...unAnsweredQuestions];
    filteredQuestions.splice(currentQuestionIndex, 1);
    setUnansweredQuestions([...filteredQuestions]);
    setNumCorrect((prev) => prev + 1);
  };

  const handleReset = () => {
    setUnansweredQuestions([...flashcards]);
    setAnsweredQuestions([]);
    setCurrentQuestionIndex(-1);
    setNumCorrect(0);
    setNumWrong(0);
  };

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <h1 className="page--header">QUIZ</h1>
      {unAnsweredQuestions.length === 0 ? (
        <Restart handleRestart={handleReset} />
      ) : (
        <>
          <p className="font-black my-2">
            <span className="text-green-500">{answeredQuestions.length}</span> /{" "}
            <span className="text-red-500">{flashcards.length}</span>
          </p>
          <QuestionBox
            currentQuestion={unAnsweredQuestions[currentQuestionIndex]}
          />
          <AnswerBar handleSubmit={handleSubmit} />
        </>
      )}
      <Results numCorrect={numCorrect} numWrong={numWrong} />
    </div>
  );
};

export default Quiz;
