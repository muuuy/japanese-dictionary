import { useEffect, useState } from "react";

import useUserStore from "../stores/store";
import Timer from "../components/MatchingQuiz/Timer";
import Card from "../components/MatchingQuiz/Card";

import { Button } from "@chakra-ui/react";

interface CardData {
  id: number;
  flashcardItem: string;
}

const MatchingQuiz = () => {
  const flashcards = useUserStore((state) => state.flashcards);
  const auth = useUserStore((state) => state.auth);

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

  return (
    <div className="flex flex-col justify-center items-center flex-1">
      <div className="flex flex-col absolute top-12 text-center">
        <h1 className="page--header">MATCHING QUIZ</h1>
        <h2 className="page--header-description">
          Match the characters to the definition.
        </h2>
      </div>

      <div className="flex flex-col items-center">
        <Timer start={start} />
        <Button onClick={handleStart}>START</Button>
      </div>
      <div className="flex flex-row gap-2">
        <div>
          {characterCards.map((card) => (
            <Card
              key={`character-card-${card.id}`}
              flashcardItem={card.flashcardItem}
              type="character"
            />
          ))}
        </div>
        <div>
          {definitionCards.map((card) => (
            <Card
              key={`definition-card-${card.id}`}
              flashcardItem={card.flashcardItem}
              type="definition"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MatchingQuiz;
