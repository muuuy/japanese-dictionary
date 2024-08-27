import { Button } from "@chakra-ui/react";
import clsx from "clsx";

interface RestartData {
  handleRestart: () => void;
}

const Restart: React.FC<RestartData> = ({ handleRestart }) => {
  return (
    <div
      className={clsx(
        "flex flex-col items-center justify-center gap-12 text-center",
        "animate-vocab--fade-in"
      )}
    >
      <p className="text-5xl font-black italic tracking-widest my-4 pt-16">
        FINISHED
      </p>
      <Button onClick={handleRestart} colorScheme="red">
        RETRY QUIZ
      </Button>
    </div>
  );
};

export { Restart };
