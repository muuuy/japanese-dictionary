import { useEffect, useState } from "react";

import useUserStore from "../stores/store";
import Timer from "../components/MatchingQuiz/Timer";
import Card from "../components/MatchingQuiz/Card";

import { Button } from "@chakra-ui/react";

interface CardData {
  id: number;
  content: string;
}

const MatchingQuiz = () => {
  const flashcards = useUserStore((state) => state.flashcards);
  const auth = useUserStore((state) => state.auth);

  const [characterCards, setCharacterCards] = useState({});
  const [definitionCards, setDefinitionCards] = useState({});

  useEffect(() => {
    flashcards.map((flashcard, index) => {
      setCharacterCards((prev) => ({ ...prev, [index]: flashcard.character }));
      setDefinitionCards((prev) => ({
        ...prev,
        [index]: flashcard.definition,
      }));
    });
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

      <Card flashcard={flashcards[0]} type="character" />
    </div>
  );
};

export default MatchingQuiz;
