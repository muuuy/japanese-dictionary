import {
  FlashcardFormData,
  EditFlashcardMutationData,
} from "./FlashcardInterface";
import { useMutation } from "@tanstack/react-query";
import { editFlashcard } from "../../api/flashcard";
import { FlashcardForm } from "./FlashcardForm";
import { FlashcardData } from "../../interfaces";
import useUserStore from "../../stores/store";

interface AddFlashcardProps {
  flashcard_id: number;
  editFormData: FlashcardFormData;
}

const EditFlashcardForm: React.FC<AddFlashcardProps> = ({
  flashcard_id,
  editFormData,
}) => {
  const editFlashcardStore = useUserStore((state) => state.editFlashcard);

  const editFlashcardMutation = useMutation({
    mutationKey: ["edit-flashcard"],
    mutationFn: async ({
      flashcard_id,
      formData,
    }: EditFlashcardMutationData) => {
      return await editFlashcard(flashcard_id, formData);
    },

    onSuccess: (data: FlashcardData) => {
      editFlashcardStore(data);
    },

    onError: (error: Error) => {
      console.log("Edit Flashcard: Error", error);
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
      editFlashcardMutation.mutate({
        flashcard_id: flashcard_id,
        formData: formData,
      });
    }
  };

  return (
    <div className="bg-white border-2 border-red-600 shadow-custom-red p-8 rounded-xl">
      <h1 className="text-4xl font-black text-center mb-8 tracking-widest">
        EDIT FLASHCARD
      </h1>
      <FlashcardForm handleSubmit={handleSubmit} popupData={editFormData} />
    </div>
  );
};

export { EditFlashcardForm };
