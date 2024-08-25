import { useEffect, useState } from "react";
import useUserStore from "../stores/store";
import { FlashcardData } from "../interfaces";
import AnswerBar from "../components/VocabularyQuiz/AnswerBar";
import QuestionBox from "../components/VocabularyQuiz/QuestionBox";
import { Restart } from "../components/VocabularyQuiz/Restart";
import Results from "../components/VocabularyQuiz/Results";
import { useMutation } from "@tanstack/react-query";
import { validateVocab } from "../util/validateVocab";
import { ValidateVocabData } from "../util/UtilInterfaces";
import { VocabGraph } from "../components/VocabularyQuiz/VocabGraph";
import { ResultData } from "../components/VocabularyQuiz/VocabInterface";
import { LoginPromt } from "../components/LoginPrompt/LoginPrompt";
import { Timer } from "../components/MatchingQuiz/Timer";
import { SubmitButton } from "../components/VocabularyQuiz/SubmitButton";
import { SkipButton } from "../components/VocabularyQuiz/SkipButton";
import clsx from "clsx";

const Vocabulary = () => {
  const flashcards: FlashcardData[] = useUserStore((state) => state.flashcards);
  const auth: boolean = useUserStore((state) => state.auth);
  const [answeredQuestions, setAnsweredQuestions] = useState<FlashcardData[]>(
    []
  );
  const [unAnsweredQuestions, setUnansweredQuestions] = useState<
    FlashcardData[]
  >([...flashcards]);
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

  console.log("1st len", flashcards.length);
  console.log("len", unAnsweredQuestions.length);

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

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      {!auth ? (
        <LoginPromt title="VOCAB QUIZ" />
      ) : (
        <>
          <div
            className={clsx(
              "flex flex-col items-center px-20 pb-20 border-black border-4 rounded-2xl bg-white shadow-2xl relative"
            )}
          >
            {unAnsweredQuestions.length === 0 ? (
              <Restart handleRestart={handleReset} />
            ) : (
              <>
                <h1 className="page--header mb-16 mt-8">VOCAB QUIZ</h1>
                <QuestionBox
                  currentQuestion={unAnsweredQuestions[currentQuestionIndex]}
                />
                <AnswerBar handleSubmit={handleSubmit} />
                <div className="flex flex-row justify-between items-center w-full absolute bottom-4 px-4">
                  <div className="flex flex-row gap-4 my-2 text-xl">
                    <p className="flex flex-row justify-center items-center gap-2 font-black text-base">
                      <span className="text-dark-orange bg-slate-200 p-1 rounded-full">
                        {answeredQuestions.length}
                      </span>{" "}
                      of{" "}
                      <span className="text-dark-orange bg-slate-200 p-1 rounded-full">
                        {flashcards.length}
                      </span>
                    </p>
                  </div>
                  <div className="flex flex-row gap-4">
                    <SubmitButton />
                    <SkipButton />
                  </div>
                </div>
              </>
            )}
            <Results numCorrect={results.correct} numWrong={results.wrong} />
            <VocabGraph
              correct={results.correct}
              wrong={results.wrong}
              skipped={results.skipped}
            />
          </div>
          <Timer />
        </>
      )}
    </div>
  );
};

export { Vocabulary };
