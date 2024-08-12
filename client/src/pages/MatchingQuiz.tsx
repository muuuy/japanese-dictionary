import { Timer } from "../components/MatchingQuiz/Timer";
import { Droppable } from "../components/DragAndDrop/Droppable";
import { Draggable } from "../components/DragAndDrop/Draggable";
import { Card } from "../components/MatchingQuiz/Card";
import { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import useUserStore from "../stores/store";

interface CardData {
  id: number;
  flashcardItem: string;
}

const QuizScreen = () => {
  const flashcards = useUserStore((state) => state.flashcards);

  const [characterCards, setCharacterCards] = useState<CardData[]>([]);
  const [definitionCards, setDefinitionCards] = useState<CardData[]>([]);

  useEffect(() => {
    const tempCharacters: CardData[] = [];
    const tempDefinitions: CardData[] = [];

    flashcards.map((flashcard, index) => {
      tempCharacters.push({ id: index, flashcardItem: flashcard.character });
      tempDefinitions.push({ id: index, flashcardItem: flashcard.definition });
    });

    setCharacterCards(tempCharacters);
    setDefinitionCards(tempDefinitions);
  }, [flashcards]);

  return (
    <DndContext>
      <div className="flex flex-col flex-1 justify-center items-center  overflow-hidden relative max-h-screen bg-beige">
        <Timer />
        <div className="flex flex-row gap-2">
          <div>
            {characterCards.map((card) => (
              <Droppable
                key={`character-card-${card.id}`}
                id={`character-card-${card.id}`}
              >
                <Card flashcardItem={card.flashcardItem} type="character" />
              </Droppable>
            ))}
          </div>
          <div>
            {definitionCards.map((card) => (
              <Draggable
                key={`definition-card-${card.id}`}
                id={`definition-card-${card.id}`}
              >
                <Card flashcardItem={card.flashcardItem} type="definition" />
              </Draggable>
            ))}
          </div>
        </div>
      </div>
    </DndContext>
  );
};

export default QuizScreen;
