import { FlashcardData } from "../../interfaces";
import { shuffleFlashcards } from "../../util/shuffleFlashcards";
import { QuizReducerData } from "./VocabInterface";

interface VoacbQuizReducerAction {
  type: "CORRECT" | "WRONG" | "SKIP" | "CREATE" | "RESTART";
  intialFlashcards?: FlashcardData[];
}

export const vocabInitialState: QuizReducerData = {
  questions: [],
  currentQuestion: null,
  numCorrect: 0,
  numWrong: 0,
  numSkipped: 0,
  numQuestions: 0,
  questionsAnswered: 0,
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
          questions: flashcards,
          currentQuestion: currQuestion,
          numCorrect: 0,
          numWrong: 0,
          numSkipped: 0,
          numQuestions: flashcards.length,
          questionsAnswered: 0,
        };
      } else {
        return state;
      }
    }

    //Correct answer for quiz
    case "CORRECT": {
      // const currentQuestion: FlashcardData | null =
      //   state.unansweredQuestions.shift() || null;

      const numCorrect = state.numCorrect + 1;
      const numAnswered = state.questionsAnswered + 1;

      return {
        ...state,
        numCorrect: numCorrect,
        questionsAnswered: numAnswered,
        currentQuestion:
          numAnswered < state.numQuestions
            ? state.questions[numAnswered]
            : null,
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
      const numSkipped = state.numSkipped + 1;
      const numAnswered = state.questionsAnswered + 1;

      return {
        ...state,
        numSkipped: numSkipped,
        questionsAnswered: numAnswered,
        currentQuestion:
          numAnswered < state.numQuestions
            ? state.questions[numAnswered]
            : null,
      };
    }
  }
}
