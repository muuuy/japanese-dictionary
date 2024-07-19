import useTypewriter from "../hooks/useTypewriter";

interface TypewriterData {
  text: string;
  speed: number;
  style: string;
}

const Typewriter: React.FC<TypewriterData> = ({ text, speed, style }) => {
  const displayText = useTypewriter(text, speed);

  return <p className={style}>{displayText}</p>;
};

export default Typewriter;
