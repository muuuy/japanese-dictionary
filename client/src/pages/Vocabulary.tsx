import { useEffect, useState } from "react";
import useUserStore from "../stores/store";
import { FlashcardData } from "../interfaces";
import AnswerBar from "../components/VocabularyQuiz/AnswerBar";
import QuestionBox from "../components/VocabularyQuiz/QuestionBox";
import Restart from "../components/VocabularyQuiz/Restart";
import Results from "../components/VocabularyQuiz/Results";
import { LoginBanner } from "../components/LoginBanner";
import { useMutation } from "@tanstack/react-query";
import { validateVocab } from "../util/validateVocab";
import { ValidateVocabData } from "../util/UtilInterfaces";

import QuizTypewriter from "../components/VocabularyQuiz/QuizTypewriter";

const Vocabulary = () => {
  const flashcards: FlashcardData[] = useUserStore((state) => state.flashcards);
  const auth: boolean = useUserStore((state) => state.auth);

  const mutation = useMutation<boolean, Error, ValidateVocabData>({
    mutationFn: async ({ flashcard, input }) => {
      return await validateVocab(flashcard, input);
    },

    onSuccess: (data) => {
      if (data) {
        console.log("yep = true");
        setNumCorrect((prev) => prev + 1);
      } else {
        console.log("yep = false");
        setNumWrong((prev) => prev + 1);
      }
    },

    onError: () => {
      //add error banner
      console.log("nope");
    },
  });

  const [answeredQuestions, setAnsweredQuestions] = useState<FlashcardData[]>(
    []
  );
  const [unAnsweredQuestions, setUnansweredQuestions] = useState<
    FlashcardData[]
  >(useUserStore((state) => state.flashcards));

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1);
  const [numCorrect, setNumCorrect] = useState<number>(0);
  const [numWrong, setNumWrong] = useState<number>(0);

  const [typewriterLoading, setTypewriterLoading] = useState<boolean>(false);

  useEffect(() => {
    setUnansweredQuestions([...flashcards]);
  }, [flashcards]);

  useEffect(() => {
    const randomIndex: number = Math.floor(
      Math.random() * unAnsweredQuestions.length
    );

    setCurrentQuestionIndex(randomIndex);
  }, [unAnsweredQuestions]);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    input: string
  ) => {
    event.preventDefault();

    mutation.mutate({
      flashcard: unAnsweredQuestions[currentQuestionIndex],
      input: input,
    });
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

  const handleLoading = () => {
    setTypewriterLoading(true);
  };

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      <h1 className="page--header">QUIZ</h1>
      {!auth ? (
        <>
          <div className="flex flex-col text-center my-8 gap-2">
            <QuizTypewriter
              text="Please log in or sign up to proceed further."
              speed={50}
              setLoading={handleLoading}
              fontWeight="semibold"
            />
            {typewriterLoading && (
              <QuizTypewriter
                text="ありがとうございます。"
                speed={100}
                fontWeight="normal"
              />
            )}
          </div>
          <div className="flex flex-row gap-4 w-96">
            <LoginBanner />
          </div>
        </>
      ) : (
        <>
          {unAnsweredQuestions.length === 0 ? (
            <Restart handleRestart={handleReset} />
          ) : (
            <>
              <p className="font-black my-2">
                <span className="text-green-500">
                  {answeredQuestions.length}
                </span>{" "}
                / <span className="text-red-500">{flashcards.length}</span>
              </p>
              <QuestionBox
                currentQuestion={unAnsweredQuestions[currentQuestionIndex]}
              />
              <AnswerBar handleSubmit={handleSubmit} />
            </>
          )}
          <Results numCorrect={numCorrect} numWrong={numWrong} />
        </>
      )}
    </div>
  );
};

export { Vocabulary };
