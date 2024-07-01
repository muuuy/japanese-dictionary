import Flashcard from "../interfaces";

const FlashcardComponent: React.FC<Flashcard> = ({
  id,
  character,
  definition,
}) => {
  return (
    <div className="flex flex-row gap-4" key={`flashcard-${id}`}>
      <p>ID: {id}</p>
      <p>CHARACTER: {character}</p>
      <p>DEFINITION: {definition}</p>
    </div>
  );
};

export default FlashcardComponent;
