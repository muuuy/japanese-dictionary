import { create } from "zustand";
import { FlashcardData } from "../interfaces";
import { devtools } from "zustand/middleware";

interface UserState {
  auth: boolean;
  flashcards: FlashcardData[];
  authUser: () => void;
  unAuthUser: () => void;
  addFlashcard: (newFlashcard: FlashcardData) => void;
}

const useUserStore = create<UserState>()(
  devtools((set) => ({
    auth: false,
    flashcards: [{ id: 1, character: "a", definition: "a" }],
    authUser: () => set({ auth: true }),
    unAuthUser: () => set({ auth: false }),
    addFlashcard: (newFlashcard) =>
      set((state) => ({ flashcards: [...state.flashcards, newFlashcard] })),
  }))
);

export default useUserStore;
