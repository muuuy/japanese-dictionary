import { Button } from "@chakra-ui/react";
import React from "react";

interface RestartData {
  handleRestart: () => void;
}

const Restart: React.FC<RestartData> = ({ handleRestart }) => {
  return (
    <div>
      <p>FINISHED</p>
      <Button onClick={handleRestart}>RETRY QUIZ</Button>
    </div>
  );
};

export default Restart;
