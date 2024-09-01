import { useMutation } from "@tanstack/react-query";
import { FlashcardFormData } from "./FlashcardInterface";
import { FlashcardForm } from "./FlashcardForm";
import { addFlashcard } from "../../api/flashcard";
import useUserStore from "../../stores/store";
import { FlashcardData } from "../../interfaces";

const AddFlashcardForm = () => {
  const addFlashcardStore = useUserStore((state) => state.addFlashcard);

  const addFlashcardMutation = useMutation({
    mutationKey: ["add-flashcard"],
    mutationFn: async (formData: FlashcardFormData) =>
      await addFlashcard(formData),

    onSuccess: (data: FlashcardData) => {
      addFlashcardStore(data);
    },

    onError: (error: Error) => {
      console.log("Add Flashcard: Error", error);
    },
  });

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    formData: FlashcardFormData
  ) => {
    event.preventDefault();

    if (formData.character === "" || formData.definition === "") {
      throw new Error("Edit Flashcard: Missing information.");
    } else {
      addFlashcardMutation.mutate(formData);
    }
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
