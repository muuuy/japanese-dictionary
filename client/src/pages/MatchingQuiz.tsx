import { useEffect, useState } from "react";
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";

import useUserStore from "../stores/store";
import Timer from "../components/MatchingQuiz/Timer";
import Card from "../components/MatchingQuiz/Card";
import StartButton from "../components/MatchingQuiz/StartButton";
import TutorialButton from "../components/MatchingQuiz/TutorialButton";

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
  const [tutorial, setTutorial] = useState<boolean>(false);
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

  const handleTutorial = () => {
    setTutorial(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;

    setParent(over ? over.id : null);
    console.log("dragged");
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col justify-center items-center flex-1 overflow-hidden relative">
        <div className="flex flex-col items-center text-center mb-8">
          <h1 className="page--header">MATCHING QUIZ</h1>
          <h2 className="page--header-description">
            Match the characters to the definition.
          </h2>
        </div>
        {!start ? (
          <>
            <div className="absolute bottom-0 -right-2">
              <StartButton handleStart={handleStart} />
            </div>

            <div className="absolute bottom-0 -left-2">
              <TutorialButton handleTutorial={handleTutorial} />
            </div>
          </>
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
