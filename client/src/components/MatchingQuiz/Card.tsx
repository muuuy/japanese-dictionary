import { FlashcardData } from "../../interfaces";

interface CardData {
  flashcard: FlashcardData;
  type: string;
}

const Card: React.FC<CardData> = ({ flashcard, type }) => {
  return (
    <div
      className={`absolute bg-white border-2 ${
        type === "character" ? "border-black" : "border-red-600"
      } p-4`}
    >
      <p className="font-black text-2xl">{flashcard.character}</p>
    </div>
  );
};

export default Card;
