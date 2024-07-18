import { useEffect, useState } from "react";
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";

import useUserStore from "../stores/store";
import Timer from "../components/MatchingQuiz/Timer";
import Card from "../components/MatchingQuiz/Card";

import Droppable from "../components/DragAndDrop/Droppable";
import Draggable from "../components/DragAndDrop/Draggable";

import { Button } from "@chakra-ui/react";

interface CardData {
  id: number;
  flashcardItem: string;
}

const MatchingQuiz = () => {
  const flashcards = useUserStore((state) => state.flashcards);
  const auth = useUserStore((state) => state.auth);

  const [parent, setParent] = useState<UniqueIdentifier | null>(null);

  const [characterCards, setCharacterCards] = useState<CardData[]>([]);
  const [definitionCards, setDefinitionCards] = useState<CardData[]>([]);

  useEffect(() => {
    const newCharacterCards: CardData[] = [];
    const newDefinitionCards: CardData[] = [];

    flashcards.map((flashcard, index) => {
      newCharacterCards.push({ id: index, flashcardItem: flashcard.character });
      newDefinitionCards.push({
        id: index,
        flashcardItem: flashcard.definition,
      });
    });

    setCharacterCards(newCharacterCards);
    setDefinitionCards(newDefinitionCards);
  }, [flashcards]);

  const [start, setStart] = useState<boolean>(false);

  const handleStart = () => {
    setStart(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;

    setParent(over ? over.id : null);
    console.log("dragged");
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col justify-center items-center flex-1">
        <div className="flex flex-col  text-center">
          <h1 className="page--header">MATCHING QUIZ</h1>
          <h2 className="page--header-description">
            Match the characters to the definition.
          </h2>
        </div>
        <div className="flex flex-col items-center">
          <Timer start={start} />
          <Button onClick={handleStart}>START</Button>
        </div>
        <Droppable>
          <div className="h-[800px] w-[1000px] border-2 border-black"></div>
          {parent === "droppable" ? "dropped" : "drop here"}
        </Droppable>
        <div className="flex flex-row gap-2">
          <div>
            {characterCards.map((card) => (
              <Draggable
                key={`character-card-${card.id}`}
                id={`character-card-${card.id}`}
              >
                <Card flashcardItem={card.flashcardItem} type="character" />
              </Draggable>
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

export default MatchingQuiz;
