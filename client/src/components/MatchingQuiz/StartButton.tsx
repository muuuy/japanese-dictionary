import { Button } from "@chakra-ui/react";
import Typewriter from "../Typewriter";

interface StartButtonData {
  handleStart: () => void;
}

const StartButton: React.FC<StartButtonData> = ({ handleStart }) => {
  return (
    <div>
      <Button
        onClick={handleStart}
        colorScheme="red"
        padding={4}
        height={20}
        alignItems={"start"}
      >
        <div className="relative">
          <span className="font-black text-3xl tracking-widest">
            START QUIZ
          </span>
          <br />
          <Typewriter
            text="始まりました"
            speed={100}
            style="font-semibold text-xs tracking-widest absolute left-1/2 -translate-x-1/2"
          />
        </div>
      </Button>
    </div>
  );
};

export default StartButton;
