import { useState } from "react";
import QuizSection from "../components/Quiz/QuizSection";
import FillInBlankImage from "../assets/Quiz/fill-blank_section.jpg";
import MatchingImage from "../assets/Quiz/matching_section.jpg";

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
        sectionName="VOCABULARY"
        japaneseName="語彙クイズ"
        sectionID="fill-in-the-blank"
        image={FillInBlankImage}
      />
      <QuizSection
        active={active}
        setActive={handleActive}
        sectionName="MATCHING"
        japaneseName="マッチング"
        sectionID="matching"
        image={MatchingImage}
      />
    </div>
  );
};

export default Quiz;
