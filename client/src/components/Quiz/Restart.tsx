import { Button } from "@chakra-ui/react";
import React from "react";


interface RestartData {
  handleRestart: () => void;
}

const Restart: React.FC<RestartData> = ({
  handleRestart,
}) => {
  return (
    <div className="text-center">
      <p className="text-5xl italic tracking-widest my-4">FINISHED</p>
      <Button onClick={handleRestart} colorScheme="red">
        RETRY QUIZ
      </Button>
    </div>
  );
};

export default Restart;
