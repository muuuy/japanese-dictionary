import { create } from "zustand";
import { FlashcardData } from "../interfaces";
import { devtools } from "zustand/middleware";

interface UserState {
  auth: boolean;
  flashcards: FlashcardData[];
  authUser: (flashcards: FlashcardData[]) => void;
  unAuthUser: () => void;
  addFlashcard: (newFlashcard: FlashcardData) => void;
  deleteFlashcard: (flashcardID: number) => void;
  editFlashcard: (flashcardData: FlashcardData) => void;
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

    editFlashcard: (flashcardData) => {
      set((state) => ({
        flashcards: state.flashcards.map((flashcard) =>
          flashcard.flashcard_id === flashcardData.flashcard_id
            ? {
                ...flashcard,
                character: flashcardData.character,
                definition: flashcardData.definition,
              }
            : flashcard
        ),
      })),
        console.log("zustand:", flashcardData);
    },
  }))
);

export default useUserStore;
