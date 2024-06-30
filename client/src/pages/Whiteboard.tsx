import { useState } from "react";

import { FaPencilAlt, FaEraser } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

const Whiteboard = () => {
  const [colorValue, setColorValue] = useState();

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-5xl font-black mt-12 text-center">WHITEBOARD</h1>
      <div className="flex gap-4 mt-4">
        <IconButton
          aria-label="Pencil"
          variant="outline"
          colorScheme="teal"
          isRound={true}
          icon={<FaPencilAlt />}
        ></IconButton>
        <IconButton
          aria-label="Eraser"
          variant="outline"
          colorScheme="teal"
          isRound={true}
          icon={<FaEraser />}
        ></IconButton>
      </div>
      <Button colorScheme="teal" variant="outline" className="mt-4">
        CLEAR BOARD
      </Button>
      <div className="w-11/12 my-8 border-2 border-black flex-grow"></div>
    </div>
  );
};

export default Whiteboard;
