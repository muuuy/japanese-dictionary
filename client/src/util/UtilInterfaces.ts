// Interfaces for the quizzes

import { FlashcardData } from "../interfaces";
import { LoginFormData, ForgotFormData, ResetFormData } from "../interfaces";

export interface ValidateVocabData {
  flashcard: FlashcardData;
  input: string;
}

export interface FetchData {
  urlPath: string;
  formData: string | LoginFormData | ForgotFormData | ResetFormData;
}

export interface FetchInfoResponse {
  flashcards: FlashcardData[];
}
