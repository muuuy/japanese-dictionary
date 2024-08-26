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
    //Create the flashcard deck for the quiz or Restart the quiz
    case "CREATE":
    case "RESTART": {
      if (action.intialFlashcards) {
        const flashcards: FlashcardData[] = shuffleFlashcards([
          ...action.intialFlashcards,
        ]);
        const currQuestion: FlashcardData = flashcards[0];

        return {
          ...state,
          unansweredQuestions: flashcards,
          answeredQuestions: [],
          currentQuestion: currQuestion,
          numCorrect: 0,
          numWrong: 0,
          numSkipped: 0,
          numQuestions: flashcards.length,
        };
      } else {
        return state;
      }
    }

    //Correct answer for quiz
    case "CORRECT": {
      const previousQuestion: FlashcardData = state.currentQuestion!;
      const currentQuestion: FlashcardData | null =
        state.unansweredQuestions.shift() || null;

      return {
        ...state,
        numCorrect: state.numCorrect + 1,
        currentQuestion: currentQuestion,
        answeredQuestions: [...state.answeredQuestions, previousQuestion],
      };
    }

    //Wrong answer for quiz
    case "WRONG": {
      return {
        ...state,
        numWrong: state.numWrong + 1,
      };
    }

    //Skip the current question
    case "SKIP": {
      const previousQuestion: FlashcardData = state.currentQuestion!;
      const currentQuestion: FlashcardData | null =
        state.unansweredQuestions.shift() || null;

      return {
        ...state,
        numSkipped: state.numSkipped + 1,
        currentQuestion: currentQuestion,
        answeredQuestions: [...state.answeredQuestions, previousQuestion],
      };
    }
  }
}
