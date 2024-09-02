import { FlashcardData } from "../../interfaces";

export interface ResultData {
  correct: number;
  wrong: number;
  skipped: number;
}

export interface GraphOptions {
  title: string;
  is3D: boolean;
}

export interface QuizReducerData {
  questions: FlashcardData[];
  currentQuestion: FlashcardData | null;
  numCorrect: number;
  numWrong: number;
  numSkipped: number;
  numQuestions: number;
  questionsAnswered: number;
}
