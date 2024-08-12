import Timer from "./Timer";
import Droppable from "../DragAndDrop/Droppable";
import Card from "./Card";
import Draggable from "../DragAndDrop/Draggable";
import useUserStore from "../../stores/store";
import React, { useState, useEffect } from "react";

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
    <>
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
    </>
  );
};

export default QuizScreen;
