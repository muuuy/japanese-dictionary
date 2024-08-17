import { create } from "zustand";
import { FlashcardData } from "../interfaces";
import { devtools } from "zustand/middleware";

interface UserState {
  auth: boolean;
  flashcards: FlashcardData[];
  authUser: (flashcards: FlashcardData[]) => void;
  unAuthUser: () => void;
  addFlashcard: (newFlashcard: FlashcardData) => void;
  deleteFlashcard: (flashcardID: string) => void;
  editFlashcard: (
    flashcardID: string,
    character: string,
    definition: string
  ) => void;
}

const useUserStore = create<UserState>()(
  devtools((set) => ({
    auth: false,
    flashcards: [],
    authUser: (flashcards) => set({ auth: true, flashcards: [...flashcards] }),
    unAuthUser: () => set({ auth: false, flashcards: [] }),
    addFlashcard: (newFlashcard) =>
      set((state) => ({ flashcards: [...state.flashcards, newFlashcard] })),
    deleteFlashcard: (flashcardID) =>
      set((state) => ({
        flashcards: [
          ...state.flashcards.filter(
            (flashcard) => flashcard.flashcard_id !== flashcardID
          ),
        ],
      })),
    editFlashcard: (flashcardID, character, definition) =>
      set((state) => ({
        flashcards: state.flashcards.map((flashcard) =>
          flashcard.flashcard_id === flashcardID
            ? { ...flashcard, character: character, definition: definition }
            : flashcard
        ),
      })),
  }))
);

export default useUserStore;
