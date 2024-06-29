import { useState } from "react";

import { FaPencilAlt, FaEraser } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";

const Whiteboard = () => {
  const [colorValue, setColorValue] = useState();

  return (
    <div className="flex flex-col items-center justify-center mt-12">
      <h1 className="text-5xl font-black">WHITEBOARD</h1>
      <div className="flex gap-4 mt-8">
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
      <div className="flex flex-col mt-4 font-bold gap-2">
        <p>SELECT COLOR</p>
      </div>
    </div>
  );
};

export default Whiteboard;
