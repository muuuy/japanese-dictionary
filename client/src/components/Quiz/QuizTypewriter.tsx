import { useState } from "react";

import useTypewriter from "../../hooks/useTypewriter";

interface QuizTypewriterData {
  text: string;
  speed: number;
  setLoading?: () => void;
  fontWeight: string;
}

const QuizTypewriter: React.FC<QuizTypewriterData> = ({
  text,
  speed,
  setLoading,
  fontWeight,
}) => {
  const displayText = useTypewriter(text, speed, setLoading);

  return <p className={`text-xl font-${fontWeight} italic`}>{displayText}</p>;
};

export default QuizTypewriter;
