import { useState } from "react";
import QuizSection from "../components/Quiz/QuizSection";

const Quiz = () => {
  const [active, setActive] = useState<string | null>(null);

  const handleActive = (e: React.MouseEvent<HTMLDivElement>) => {
    const id = e.currentTarget.getAttribute("id");

    if (id === active) setActive(null);
    else setActive(e.currentTarget.getAttribute("id"));
  };

  return (
    <div className="flex flex-1 flex-row justify-center items-center gap-12">
      <QuizSection
        active={active}
        setActive={handleActive}
        sectionName="FILL IN THE BLANK"
        sectionID="fill-in-the-blank"
      />
      <QuizSection
        active={active}
        setActive={handleActive}
        sectionName="MATCHING"
        sectionID="matching"
      />
    </div>
  );
};

export default Quiz;
