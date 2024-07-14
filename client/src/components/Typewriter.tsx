import useTypewriter from "../hooks/useTypewriter";

interface TypewriterData {
  text: string;
  speed: number;
}

const Typewriter: React.FC<TypewriterData> = ({ text, speed }) => {
  const displayText = useTypewriter(text, speed);

  return <p className="text-xl font-semibold italic my-8">{displayText}</p>;
};

export default Typewriter;
