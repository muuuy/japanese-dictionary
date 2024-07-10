import { useState } from "react";
import axios from "axios";

import { FlashcardData } from "../../interfaces";
import useUserStore from "../../stores/store";

import { FaPencilAlt, FaTrash, FaEllipsisH } from "react-icons/fa";

const FlashcardComponent: React.FC<FlashcardData> = ({
  id,
  character,
  definition,
}) => {
  console.log("id", id);

  const deleteFlashcard = useUserStore((state) => state.deleteFlashcard);
  const flashcards = useUserStore((state) => state.flashcards);

  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const handleDelete = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/flashcards/123",
        null,
        { withCredentials: true }
      );

      if (res.status === 200) {
        deleteFlashcard(id);
        console.log(flashcards);
      } else console.log("failure");
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/flashcards/edit",
        null,
        { withCredentials: true }
      );

      if (res.status === 200) console.log("success");
      else console.log("failure");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-row gap-4 w-96 p-5 border-2 border-red-600 rounded-xl cursor-pointer hover:scale-105 ease-out	duration-300 relative">
      <p className="w-1/3 font-black text-xl">{character}</p>
      <p className="text-lg text-wrap truncate max-h-40">{definition}</p>
      <div className="flex flex-row text-center absolute top-1 right-2">
        <ul
          className={`${
            openDropdown ? "flex" : "hidden"
          } z-50 font-black text-xl tracking-widest flex-row overflow-hidden ${
            openDropdown ? "animate-open-flashcard-menu" : ""
          }`}
        >
          <li className="rounded-full hover:bg-red-200 p-1">
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
