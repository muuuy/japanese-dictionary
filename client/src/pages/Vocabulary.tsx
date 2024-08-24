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
import { VocabGraph } from "../components/VocabularyQuiz/VocabGraph";
import { ResultData } from "../components/VocabularyQuiz/VocabInterface";

import QuizTypewriter from "../components/VocabularyQuiz/QuizTypewriter";

const Vocabulary = () => {
  const flashcards: FlashcardData[] = useUserStore((state) => state.flashcards);
  const auth: boolean = useUserStore((state) => state.auth);
  const [answeredQuestions, setAnsweredQuestions] = useState<FlashcardData[]>(
    []
  );
  const [unAnsweredQuestions, setUnansweredQuestions] = useState<
    FlashcardData[]
  >(useUserStore((state) => state.flashcards));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(-1);

  const [results, setResutls] = useState<ResultData>({
    correct: 0,
    wrong: 0,
    skipped: 0,
  });

  const mutation = useMutation<boolean, Error, ValidateVocabData>({
    mutationKey: ["vocab-quiz"],
    mutationFn: async ({ flashcard, input }) => {
      return await validateVocab(flashcard, input);
    },

    onSuccess: (data) => {
      if (data) {
        console.log("yep = true");
        setResutls((prev) => ({ ...prev, correct: prev.correct + 1 }));
      } else {
        console.log("yep = false");
        setResutls((prev) => ({ ...prev, wrong: prev.wrong + 1 }));
      }
    },

    onError: () => {
      //add error banner
      console.log("nope");
    },
  });

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

  const handleReset = () => {
    setUnansweredQuestions([...flashcards]);
    setAnsweredQuestions([]);
    setCurrentQuestionIndex(-1);
    setResutls({ correct: 0, wrong: 0, skipped: 0 });
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
          <Results numCorrect={results.correct} numWrong={results.wrong} />
          <VocabGraph
            correct={results.correct}
            wrong={results.wrong}
            skipped={results.skipped}
          />
        </>
      )}
    </div>
  );
};

export { Vocabulary };
