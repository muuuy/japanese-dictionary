import { useState } from "react";

import WhiteboardBoard from "../components/WhiteboardComponents/WhiteboardBoard";

import { FaPencilAlt, FaEraser } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";

const Whiteboard = () => {
  interface PenSettings {
    colorValue: string;
    penSize: number;
  }

  const [penSettings, setPenSettings] = useState<PenSettings>({
    colorValue: "black",
    penSize: 8,
  });

  const changeColor = (color: string, size: number) => {
    setPenSettings({ colorValue: color, penSize: size });
  };

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
          onClick={() => changeColor("black", 8)}
        ></IconButton>
        <IconButton
          aria-label="Eraser"
          variant="outline"
          colorScheme="teal"
          isRound={true}
          icon={<FaEraser />}
          onClick={() => changeColor("white", 32)}
        ></IconButton>
      </div>
      <WhiteboardBoard
        colorValue={penSettings.colorValue}
        penSize={penSettings.penSize}
      />
    </div>
  );
};

export default Whiteboard;
