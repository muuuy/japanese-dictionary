import Flashcard from "../interfaces";

const FlashcardComponent: React.FC<Flashcard> = ({
  id,
  character,
  definition,
}) => {
  return (
    <div
      className="flex flex-row gap-4 border-4 w-96 p-4 border-2 border-teal rounded-xl cursor-pointer hover:scale-105 ease-out	duration-300"
      key={`flashcard-${id}`}
    >
      <p className="w-1/3 font-black text-xl">{character}</p>
      <p className="text-xl text-wrap truncate max-h-40">{definition}</p>
    </div>
  );
};

export default FlashcardComponent;
