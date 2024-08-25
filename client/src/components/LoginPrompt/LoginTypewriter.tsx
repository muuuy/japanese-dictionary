import useTypewriter from "../../hooks/useTypewriter";
import { LoginTypewriterData } from "./LoginPromptInterfaces";

const LoginTypewriter: React.FC<LoginTypewriterData> = ({
  text,
  speed,
  setLoading,
  fontWeight,
}) => {
  const displayText = useTypewriter(text, speed, setLoading);

  return <p className={`text-xl font-${fontWeight} italic`}>{displayText}</p>;
};

export { LoginTypewriter };
