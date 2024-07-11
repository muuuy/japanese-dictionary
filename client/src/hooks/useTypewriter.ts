import { useState, useEffect } from "react";

const useTypewriter = (text: string, speed: number): string => {
  const [displayText, setDisplayText] = useState<string>("");

  useEffect(() => {
    let i = 0;

    const typingInterval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prevText) => prevText + text.charAt(i));
        i += 1;
      } else clearInterval(typingInterval);
    }, speed);

    return () => clearInterval(typingInterval);
  }, [text, speed]);

  return displayText;
};

export default useTypewriter;
