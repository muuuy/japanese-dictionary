import { useState, useEffect } from "react";

const useTypewriter = (text: string, speed: number): string => {
  const [displayText, setDisplayText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [index, speed, text]);

  return displayText;
};

export default useTypewriter;
