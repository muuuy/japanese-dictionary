import { useState } from "react";
import { FlashcardData } from "../../interfaces";
import { FaPencilAlt, FaTrash, FaEllipsisH } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { deleteFlashcard } from "../../api/flashcard";
import { FlashcardFormType } from "./FlashcardInterface";
import useUserStore from "../../stores/store";

interface FlashcardComponentProps {
  flashcardData: FlashcardData;
  handlePopup: (
    isEdit: FlashcardFormType,
    id: number,
    character: string,
    definition: string
  ) => void;
}

const FlashcardComponent: React.FC<FlashcardComponentProps> = ({
  flashcardData,
  handlePopup,
}) => {
  const deleteFlashcardStore = useUserStore((state) => state.deleteFlashcard);

  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const mutation = useMutation({
    mutationKey: ["delete-flashcard"],
    mutationFn: async ({ flashcardId }: { flashcardId: number }) => {
      return await deleteFlashcard(flashcardId);
    },

    onSuccess: (data: number) => {
      deleteFlashcardStore(data);
    },

    onError: (error: Error) => {
      console.log("Delete Flashcard: Error", error);
    },
  });

  const handleDelete = async () => {
    const flashcardId = flashcardData.flashcard_id;

    mutation.mutate({ flashcardId: flashcardId });
  };

  return (
    <div className="flex flex-row gap-4 w-96 p-5 shadow-custom-red rounded-xl bg-white cursor-pointer hover:scale-105 ease-out	duration-300 relative">
      <p className="w-1/3 font-black text-xl">{flashcardData.character}</p>
      <p className="text-lg text-wrap truncate max-h-40">
        {flashcardData.definition}
      </p>
      <div className="flex flex-row text-center absolute top-1 right-2">
        <ul
          className={`${
            openDropdown ? "flex" : "hidden"
          } z-50 font-black text-xl tracking-widest flex-row overflow-hidden ${
            openDropdown ? "animate-open-flashcard-menu" : ""
          }`}
        >
          <li
            className="rounded-full hover:bg-red-200 p-1"
            onClick={() =>
              handlePopup(
                true,
                flashcardData.flashcard_id,
                flashcardData.character,
                flashcardData.definition
              )
            }
          >
            <FaPencilAlt className="h-4" />
          </li>
          <li
            className="rounded-full hover:bg-red-200 p-1"
            onClick={handleDelete}
          >
            <FaTrash className="h-4" />
          </li>
        </ul>
        <FaEllipsisH
          onClick={() => setOpenDropdown(!openDropdown)}
          className="ml-1 mt-1"
        />
      </div>
    </div>
  );
};

export default FlashcardComponent;
