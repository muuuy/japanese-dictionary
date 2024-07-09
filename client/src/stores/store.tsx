import { create } from "zustand";
import { FlashcardData } from "../interfaces";
import { devtools } from "zustand/middleware";

interface UserState {
  auth: boolean;
  flashcards: FlashcardData[];
  authUser: (flashcards: FlashcardData[]) => void;
  unAuthUser: () => void;
  addFlashcard: (newFlashcard: FlashcardData) => void;
}

const useUserStore = create<UserState>()(
  devtools((set) => ({
    auth: false,
    flashcards: [],
    authUser: (flashcards) => set({ auth: true, flashcards: [...flashcards] }),
    unAuthUser: () => set({ auth: false }),
    addFlashcard: (newFlashcard) =>
      set((state) => ({ flashcards: [...state.flashcards, newFlashcard] })),
  }))
);

export default useUserStore;
