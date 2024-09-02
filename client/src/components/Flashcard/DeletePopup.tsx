import { Button } from "@chakra-ui/react";
import { useMutation } from "@tanstack/react-query";
import { deleteFlashcard } from "../../api/flashcard";
import useUserStore from "../../stores/store";

interface DeletePopupData {
  flashcard_id: number;
}

const DeletePopup: React.FC<DeletePopupData> = ({ flashcard_id }) => {
  const deleteFlashcardStore = useUserStore((state) => state.deleteFlashcard);

  const deleteFlashcardMutation = useMutation({
    mutationKey: ["delete-flashcard"],
    mutationFn: async (flashcard_id: number) => {
      return await deleteFlashcard(flashcard_id);
    },

    onSuccess: (data: number) => {
      deleteFlashcardStore(data);
    },

    onError: (error: Error) => {
      console.log("Delete Flashcard: Error", error);
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    deleteFlashcardMutation.mutate(flashcard_id);
  };

  return (
    <div className="bg-white border-2 border-red-600 shadow-custom-red p-8 rounded-xl">
      <h1 className="text-center font-black text-2xl">DELETE FLASHCARD?</h1>
      <Button onClick={handleClick} className="mt-8 w-96" colorScheme="red">
        <span className="font-black text-2xl">CONFIRM</span>
      </Button>
    </div>
  );
};

export { DeletePopup };
