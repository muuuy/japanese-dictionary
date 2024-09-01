import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { FlashcardFormData } from "./FlashcardInterface";
import { FlashcardForm } from "./FlashcardForm";
import { addFlashcard } from "../../api/flashcard";
import useUserStore from "../../stores/store";

const AddFlashcardForm = () => {
  const addFlashcardStore = useUserStore((state) => state.addFlashcard);
  const addFlashcardMutation = useMutation({
    mutationKey: ["add-flashcard"],
    mutationFn: async (formData: FlashcardFormData) =>
      await addFlashcard(formData),

    onSuccess: () => {},

    onError: () => {},
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="bg-white border-2 border-red-600 shadow-custom-red p-8 rounded-xl">
      <h1 className="text-4xl font-black text-center mb-8 tracking-widest">
        ADD FLASHCARD
      </h1>
      <FlashcardForm handleSubmit={handleSubmit} />
    </div>
  );
};

export { AddFlashcardForm };
