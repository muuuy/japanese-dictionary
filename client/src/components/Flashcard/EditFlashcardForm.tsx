import { useState, useEffect } from "react";
import {
  FlashcardFormData,
  EditFlashcardMutationData,
} from "./FlashcardInterface";
import { useMutation } from "@tanstack/react-query";
import { editFlashcard } from "../../api/flashcard";
import { FlashcardForm } from "./FlashcardForm";
import useUserStore from "../../stores/store";

interface AddFlashcardProps {
  flashcard_id: number;
  formData: FlashcardFormData;
}

const EditFlashcardForm: React.FC<AddFlashcardProps> = ({
  flashcard_id,
  formData,
}) => {
  const addFlashcard = useUserStore((state) => state.addFlashcard);
  const editFlashcardStore = useUserStore((state) => state.editFlashcard);
  const [editFormData, setEditFormData] = useState<FlashcardFormData>({
    ...formData,
  });

  const editFlashcardMutation = useMutation({
    mutationKey: ["edit-flashcard"],
    mutationFn: async ({
      flashcard_id,
      formData,
    }: EditFlashcardMutationData) => {
      return await editFlashcard(flashcard_id, formData);
    },

    onSuccess: () => {
      editFlashcardStore(
        flashcard_id,
        editFormData.character,
        editFormData.definition
      );
      setEditFormData({ character: "", definition: "" });
    },

    onError: () => {},
  });

  useEffect(() => {
    setEditFormData({ ...formData });
  }, [formData]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (editFormData.character === "" || editFormData.definition === "") {
      throw new Error("Edit Flashcard: Missing information.");
    } else {
      editFlashcardMutation.mutate({
        flashcard_id: flashcard_id,
        formData: editFormData,
      });
    }
  };

  // const handleEdit = async () => {
  //   try {
  //     const res = await fetch(`http://localhost:3000/flashcards/${id}`, {
  //       method: "PUT",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (res.ok) {
  //       editFlashcardStore(
  //         flashcard_id,
  //         formData.character,
  //         formData.definition
  //       );
  //       setFormData({ character: "", definition: "" });
  //       return;
  //     } else console.log("failure");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const handleAdd = async () => {
  //   try {
  //     const res = await fetch("http://localhost:3000/flashcards/", {
  //       method: "POST",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (res.ok) {
  //       const data = await res.json();
  //       addFlashcard(data.flashcard);
  //       setFormData({ character: "", definition: "" });
  //       return;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
