import { useEffect, useState } from "react";
import { DndContext, DragEndEvent, UniqueIdentifier } from "@dnd-kit/core";
import QuizScreen from "../components/MatchingQuiz/QuizScreen";
import useUserStore from "../stores/store";
import StartScreen from "../components/MatchingQuiz/StartScreen";
import LoginPrompt from "../components/LoginPrompt";
import MatchingQuizImage from "../assets/matching_quiz.jpg";

const MatchingQuiz = () => {
  const auth = useUserStore((state) => state.auth);
  const [start, setStart] = useState<boolean>(false);
  const [parent, setParent] = useState<UniqueIdentifier | null>(null);

  const handleStart = () => {
    setStart(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event;

    setParent(over ? over.id : null);
    console.log("dragged");
  };

  return (
    <>
      {!auth ? (
        <LoginPrompt />
      ) : (
        <DndContext onDragEnd={handleDragEnd}>
          <div
            className="flex flex-col flex-1 justify-center items-center  overflow-hidden relative max-h-screen"
            // style={{
            //   backgroundImage: !start ? `url(${MatchingQuizImage})` : "",
            // }}
          >
            {!start ? (
              <StartScreen handleStart={handleStart} />
            ) : (
              <QuizScreen start={start} />
            )}
          </div>
        </DndContext>
      )}
    </>
  );
};

export default MatchingQuiz;
