import { useState, useEffect } from "react";

const useTypewriter = (
  text: string,
  speed: number,
  setLoading?: () => void
): string => {
  const [displayText, setDisplayText] = useState<string>("");
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else if (setLoading !== undefined) setLoading();
  }, [index, speed, text, setLoading]);

  return displayText;
};

export default useTypewriter;
