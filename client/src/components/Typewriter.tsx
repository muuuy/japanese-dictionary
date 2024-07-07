import useTypewriter from "../hooks/useTypewriter";

interface TypewriterData {
  text: string;
  speed: number;
}

const Typewriter: React.FC<TypewriterData> = ({ text, speed }) => {
  const displayText = useTypewriter(text, speed);

  return <p className="bg-red-600 pl-2">{displayText}</p>;
};

export default Typewriter;
