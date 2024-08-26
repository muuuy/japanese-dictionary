import { FlashcardData } from "../../interfaces";

export interface ResultData {
  correct: number;
  wrong: number;
  skipped: number;
}

export interface GraphOptions {
  title: string;
  is3D: boolean;
  backgroundColor: string;
}

export interface QuizReducerData {
  unansweredQuestions: FlashcardData[];
  answeredQuestions: FlashcardData[];
  currentQuestion: FlashcardData | null;
  numCorrect: number;
  numWrong: number;
  numSkipped: number;
  numQuestions: number;
}
