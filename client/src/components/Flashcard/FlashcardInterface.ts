export interface FlashcardFormData {
  character: string;
  definition: string;
}

export interface EditFlashcardMutationData {
  flashcard_id: number;
  formData: FlashcardFormData;
}

export enum FlashcardFormType {
  EDIT = "edit",
  DELETE = "delete",
  ADD = "add",
}
