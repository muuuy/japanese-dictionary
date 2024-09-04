import { CardData } from "./MatchingInterface";
import { Droppable } from "../DragAndDrop/Droppable";
import { Card } from "@chakra-ui/react";

interface DroppableCardsData {
  characterCards: CardData[];
  matches: { [key: string]: string | null };
}

const DroppableCards: React.FC<DroppableCardsData> = ({
  characterCards,
  matches,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {characterCards.map((card) => (
        <Droppable key={`character-${card.id}`} id={`character-${card.id}`}>
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
  );
};

export { DroppableCards };
