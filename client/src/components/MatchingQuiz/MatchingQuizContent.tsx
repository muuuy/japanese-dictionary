import { useEffect, useState } from "react";
import { CardData } from "./MatchingInterface";
import useUserStore from "../../stores/store";

const MatchingQuizContent = () => {
  const flashcards = useUserStore((state) => state.flashcards);

  const [charCards, setCharCards] = useState<CardData[]>([]);
  const [defCards, setDefCards] = useState<CardData[]>([]);
  const [matches, setMatches] = useState<{ [key: string]: string | null }>({});

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
