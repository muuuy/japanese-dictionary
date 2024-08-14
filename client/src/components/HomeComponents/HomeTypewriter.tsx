import useTypewriter from "../../hooks/useTypewriter";
import clsx from "clsx";

interface HomeTypewriterData {
  text: string;
  speed: number;
}

const HomeTypewriter: React.FC<HomeTypewriterData> = ({ text, speed }) => {
  const displayText = useTypewriter(text, speed);

  return (
    <p className={clsx("font-bold text-red-600 text-base", "sm:text-2xl")}>
      {displayText}
    </p>
  );
};

export { HomeTypewriter };
