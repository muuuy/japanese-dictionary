import { useEffect, useState } from "react";
import useUserStore from "../../stores/store";

interface CardData {
  id: number;
  flashcardItem: string;
}

const MatchingQuizContent = () => {
  const flashcards = useUserStore((state) => state.flashcards);

  const [charCards, setCharCards] = useState<CardData[]>([]);
  const [defCards, setDefCards] = useState<CardData[]>([]);

  useEffect(() => {
    const tempCharCards: CardData[] = [];
    const tempDefCards: CardData[] = [];

    flashcards.map((flashcard, index) => {
      tempCharCards.push({ id: index, flashcardItem: flashcard.character });
      tempDefCards.push({ id: index, flashcardItem: flashcard.definition });
    });

    setCharCards(tempCharCards);
    setDefCards(tempDefCards);
  }, [flashcards]);

  return (
    <div>
      <div></div>
    </div>
  );
};

export { MatchingQuizContent };
