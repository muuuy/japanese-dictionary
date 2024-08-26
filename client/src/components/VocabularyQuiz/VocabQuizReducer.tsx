import { FlashcardData } from "../../interfaces";
import { shuffleFlashcards } from "../../util/shuffleFlashcards";
import { QuizReducerData } from "./VocabInterface";

interface VoacbQuizReducerAction {
  type: "CORRECT" | "WRONG" | "SKIP" | "CREATE" | "RESTART";
  intialFlashcards?: FlashcardData[];
}

export const vocabInitialState: QuizReducerData = {
  unansweredQuestions: [],
  answeredQuestions: [],
  currentQuestion: null,
  numCorrect: 0,
  numWrong: 0,
  numSkipped: 0,
  numQuestions: 0,
};

export function vocabReducer(
  state: QuizReducerData,
  action: VoacbQuizReducerAction
): QuizReducerData {
  switch (action.type) {
    //Create the flashcard deck for the quiz
    case "CREATE":
      if (action.intialFlashcards) {
        const flashcards: FlashcardData[] = shuffleFlashcards([
          ...action.intialFlashcards,
        ]);
        const currQuestion: FlashcardData = flashcards[0];

        console.log("reducer", state.unansweredQuestions);

        return {
          ...state,
          unansweredQuestions: flashcards.slice(1),
          currentQuestion: currQuestion,
          numQuestions: flashcards.length + 1,
        };
      } else {
        return state;
      }

    case "CORRECT":
      const previousQuestion: FlashcardData = state.currentQuestion!;
      const currentQuestion: FlashcardData = state.unansweredQuestions.shift()!;

      return {
        ...state,
        numCorrect: state.numCorrect + 1,
        currentQuestion: currentQuestion,
        answeredQuestions: [...state.answeredQuestions, previousQuestion],
      };

    case "WRONG":
      return state;
    case "SKIP":
      return state;
    case "RESTART":
      return state;
  }
}
