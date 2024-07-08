import { useState } from "react";

import WhiteboardBoard from "../components/WhiteboardComponents/WhiteboardBoard";

import { FaPencilAlt, FaEraser } from "react-icons/fa";
import { IconButton } from "@chakra-ui/react";
interface PenSettings {
  colorValue: string;
  penSize: number;
}

const Whiteboard = () => {
  const [penSettings, setPenSettings] = useState<PenSettings>({
    colorValue: "black",
    penSize: 8,
  });
  const [activeButton, setActiveButton] = useState<string>("black");

  const changeColor = (color: string, size: number) => {
    setPenSettings({ colorValue: color, penSize: size });
    setActiveButton(color);
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center h-screen">
      <h1 className="text-5xl font-black mt-12 text-center">WHITEBOARD</h1>
      <div className="flex gap-4 mt-4">
        <IconButton
          aria-label="Pencil"
          variant="outline"
          colorScheme="red"
          isRound={true}
          icon={<FaPencilAlt />}
          onClick={() => changeColor("black", 8)}
          isActive={activeButton === "black"}
        ></IconButton>
        <IconButton
          aria-label="Eraser"
          variant="outline"
          colorScheme="red"
          isRound={true}
          icon={<FaEraser />}
          onClick={() => changeColor("white", 32)}
          isActive={activeButton === "white"}
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
