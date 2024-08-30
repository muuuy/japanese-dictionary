export interface FlashcardFormData {
  character: string;
  definition: string;
}

export interface EditFlashcardMutationData {
  flashcard_id: number;
  formData: FlashcardFormData;
}
