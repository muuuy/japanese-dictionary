import { useState } from "react";

interface Flashcard {
  id: number;
  character: string;
  definition: string;
}

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([
    { id: 1, character: "あ", definition: "a" },
    { id: 2, character: "い", definition: "i" },
    { id: 3, character: "え", definition: "e" },
    { id: 4, character: "お", definition: "o" },
    { id: 5, character: "う", definition: "u" },
  ]);

  const currentID = useState<number>(6);

  return (
    <div className="flex flex-col items-center justify-center flex-1 border-4">
      <div className="flex flex-col flex-1">
        {flashcards.map((flashcard) => (
          <div className="flex flex-row gap-4">
            <p>ID: {flashcard.id}</p>
            <p>CHARACTER: {flashcard.character}</p>
            <p>DEFINITION: {flashcard.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Flashcards;
