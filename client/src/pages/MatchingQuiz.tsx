import { Timer } from "../components/Timer";
import { Droppable } from "../components/DragAndDrop/Droppable";
import { Draggable } from "../components/DragAndDrop/Draggable";
import { Card } from "../components/MatchingQuiz/Card";
import { useState, useEffect } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { CardData } from "../components/MatchingQuiz/MatchingInterface";
import useUserStore from "../stores/store";

const QuizScreen = () => {
  const flashcards = useUserStore((state) => state.flashcards);

  const [characterCards, setCharacterCards] = useState<CardData[]>([]);
  const [definitionCards, setDefinitionCards] = useState<CardData[]>([]);
  const [matches, setMatches] = useState<{ [key: string]: string | null }>({});

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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (
      over &&
      active.id.toString().startsWith("definition-") &&
      over.id.toString().startsWith("character-")
    ) {
      const definitionId = active.id.toString().split("-")[1];
      const characterId = over.id.toString().split("-")[1];

      if (definitionId === characterId) {
        setMatches((prev) => ({
          ...prev,
          [over.id.toString()]: active.id.toString(),
        }));
      }
    }
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center overflow-hidden relative max-h-screen bg-beige">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex flex-row gap-20 justify-center items-center">
          <div className="flex flex-col gap-4">
            {characterCards.map((card) => (
              <Droppable
                key={`character-${card.id}`}
                id={`character-${card.id}`}
              >
                {`character-${card.id}` in matches ? (
                  <div className="flex items-center shadow-custom-green">
                    <Card flashcardItem={card.flashcardItem} type="complete" />
                    <Card
                      flashcardItem={definitionCards[card.id].flashcardItem}
                      type="complete"
                    />
                  </div>
                ) : (
                  <Card flashcardItem={card.flashcardItem} type="character" />
                )}
              </Droppable>
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {definitionCards.map((card) => (
              <Draggable
                key={`definition-${card.id}`}
                id={`definition-${card.id}`}
              >
                {!Object.values(matches).includes(`definition-${card.id}`) && (
                  <Card flashcardItem={card.flashcardItem} type="definition" />
                )}
              </Draggable>
            ))}
          </div>
        </div>
      </DndContext>
      <Timer />
    </div>
  );
};

export default QuizScreen;
