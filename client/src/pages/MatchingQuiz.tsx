import { useState } from "react";

import useUserStore from "../stores/store";
import Timer from "../components/MatchingQuiz/Timer";

import { Button } from "@chakra-ui/react";

const MatchingQuiz = () => {
  const flashcards = useUserStore((state) => state.flashcards);
  const auth = useUserStore((state) => state.auth);

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
    </div>
  );
};

export default MatchingQuiz;
