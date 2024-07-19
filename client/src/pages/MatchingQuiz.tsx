import { useEffect, useState } from "react";
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";

import useUserStore from "../stores/store";
import Timer from "../components/MatchingQuiz/Timer";
import Card from "../components/MatchingQuiz/Card";
import StartButton from "../components/MatchingQuiz/StartButton";

import Droppable from "../components/DragAndDrop/Droppable";
import Draggable from "../components/DragAndDrop/Draggable";

interface CardData {
  id: number;
  flashcardItem: string;
}

const MatchingQuiz = () => {
  const flashcards = useUserStore((state) => state.flashcards);
  const auth = useUserStore((state) => state.auth);
  const [start, setStart] = useState<boolean>(false);
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
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="page--header">MATCHING QUIZ</h1>
          <h2 className="page--header-description">
            Match the characters to the definition.
          </h2>
          <p className="w-1/3 text-wrap mt-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        {!start ? (
          <StartButton handleStart={handleStart} />
        ) : (
          <>
            <Timer start={start} />
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
                    <Card
                      flashcardItem={card.flashcardItem}
                      type="definition"
                    />
                  </Draggable>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </DndContext>
  );
};

export default MatchingQuiz;
