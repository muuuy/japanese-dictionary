import { QuestionBox } from "./QuestionBox";
import { AnswerBar } from "./AnswerBar";
import { SubmitButton } from "./SubmitButton";
import { SkipButton } from "./SkipButton";
import { Restart } from "./Restart";
import { Results } from "./Results";
import { VocabGraph } from "./VocabGraph";
import { useState, useEffect, useReducer } from "react";
import { vocabReducer, vocabInitialState } from "./VocabQuizReducer";
import { FlashcardData } from "../../interfaces";
import { useMutation } from "@tanstack/react-query";
import { validateVocab } from "../../util/validateVocab";
import { ValidateVocabData } from "../../util/UtilInterfaces";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import useUserStore from "../../stores/store";
import clsx from "clsx";

const Quiz = () => {
  const flashcards: FlashcardData[] = useUserStore((state) => state.flashcards);
  const [state, dispatch] = useReducer(vocabReducer, vocabInitialState);
  const [input, setInput] = useState<string>("");
  const [displayGraph, setDisplayGraph] = useState<boolean>(false);

  const mutation = useMutation<boolean, Error, ValidateVocabData>({
    mutationKey: ["vocab-quiz"],
    mutationFn: async ({ flashcard, input }) => {
      return await validateVocab(flashcard, input);
    },

    onSuccess: (data) => {
      if (data) {
        dispatch({ type: "CORRECT" });
        setInput("");
      } else {
        dispatch({ type: "WRONG" });
      }
    },

    onError: () => {
      //add error banner
      console.log("nope");
    },
  });

  useEffect(() => {
    dispatch({ type: "CREATE", intialFlashcards: [...flashcards] });
  }, [flashcards]);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  const handleSubmit = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();

    mutation.mutate({
      flashcard: state.currentQuestion!,
      input: input,
    });
  };

  const handleReset = () => {
    dispatch({ type: "RESTART", intialFlashcards: flashcards });
  };

  const handleSkip = () => {
    dispatch({ type: "SKIP" });
  };

  const handleDisplayGraph = () => {
    setDisplayGraph((prev) => !prev);
  };

  return (
    <div
      className={clsx(
        "flex flex-col items-center px-20 pb-20 rounded-2xl bg-white shadow-custom-dark relative"
      )}
    >
      {!displayGraph ? (
        <>
          {state.currentQuestion === null ? (
            <Restart handleRestart={handleReset} />
          ) : (
            <>
              <h1 className="page--header mb-16 mt-8">VOCAB QUIZ</h1>
              <div
                className={clsx(
                  "flex flex-col items-center justify-center",
                  "animate-vocab--fade-in"
                )}
              >
                <QuestionBox currentQuestion={state.currentQuestion} />
                <AnswerBar
                  handleSubmit={handleSubmit}
                  handleInput={handleInput}
                  input={input}
                />
              </div>
              <div className="flex flex-row justify-between items-center w-full absolute bottom-4 px-4">
                <div className="flex flex-row gap-4 my-2 text-xl">
                  <p className="flex flex-row justify-center items-center gap-2 font-black text-base">
                    <span className="text-red-500 bg-slate-200 p-1 rounded-full">
                      {state.answeredQuestions.length}
                    </span>{" "}
                    of{" "}
                    <span className="text-red-500 bg-slate-200 p-1 rounded-full">
                      {state.numQuestions}
                    </span>
                  </p>
                </div>
                <div className="flex flex-row gap-4">
                  <SubmitButton handleSubmit={handleSubmit} />
                  <SkipButton handleSkip={handleSkip} />
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <VocabGraph
          correct={state.numCorrect}
          wrong={state.numWrong}
          skipped={state.numSkipped}
        />
      )}
      <InfoOutlineIcon
        className="absolute top-2 right-2 cursor-pointer"
        onClick={handleDisplayGraph}
      />
      <Results
        numCorrect={state.numCorrect}
        numWrong={state.numWrong}
        numSkipped={state.numSkipped}
      />
    </div>
  );
};

export { Quiz };
