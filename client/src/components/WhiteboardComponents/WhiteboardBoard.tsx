import { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import { Button } from "@chakra-ui/react";
import clsx from "clsx";

const socket = io("http://localhost:3000", { transports: ["websocket"] });
interface WhiteboardBoardProps {
  colorValue: string;
  penSize: number;
  roomCode: string;
  connectionType: string;
  name: string;
}
interface Mouse {
  mouseX: number;
  mouseY: number;
}

const WhiteboardBoard: React.FC<WhiteboardBoardProps> = ({
  colorValue,
  penSize,
  roomCode,
  connectionType,
  name,
}) => {
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);
  const [mouseLocation, setMouseLocation] = useState<Mouse>({
    mouseX: 0,
    mouseY: 0,
  });
  const windowDimensions: number[] = [
    window.innerHeight > 900 ? 1000 : 500,
    window.innerWidth > 850 ? 1000 : 500,
  ];

  useEffect(() => {
    socket.emit(connectionType, { roomCode: roomCode, name: name });
  }, [connectionType, roomCode, name]);

  useEffect(() => {
    socket.on("recieve_coordinates", (coordinates) => {
      handleMouseMove(
        null,
        coordinates.startMouseX,
        coordinates.startMouseY,
        coordinates.mouseX,
        coordinates.mouseY,
        coordinates.color,
        coordinates.size
      );
    });

    return () => {
      socket.off("receive_coordinates");
    };
  }, [socket]);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement> | null,
    startMouseX: number,
    startMouseY: number,
    socketMouseX: number | null,
    socketMouseY: number | null,
    color: string,
    size: number
  ) => {
    if (isDrawingRef.current || event === null) {
      const rect = canvas.current?.getBoundingClientRect();
      if (rect) {
        const clientX: number | null = event?.clientX ?? socketMouseX ?? null;
        const clientY: number | null = event?.clientY ?? socketMouseY ?? null;

        if (clientX === null || clientY === null) return;

        if (isDrawingRef.current) {
          socket.emit("send_coordinates", {
            startMouseX: mouseLocation.mouseX,
            startMouseY: mouseLocation.mouseY,
            mouseX: clientX,
            mouseY: clientY,
            color: colorValue,
            size: penSize,
            roomCode: roomCode,
          });
        }

        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;

        const context = canvas.current?.getContext("2d");

        if (context) {
          drawOnCanvas(
            context,
            startMouseX,
            startMouseY,
            mouseX,
            mouseY,
            color,
            size
          );

          setMouseLocation({ mouseX, mouseY });
        }
      }
    }
  };

  const drawOnCanvas = (
    context: CanvasRenderingContext2D,
    startMouseX: number,
    startMouseY: number,
    mouseX: number,
    mouseY: number,
    color: string,
    size: number
  ) => {
    context.strokeStyle = color;
    context.lineWidth = size;
    context.lineCap = "round";
    context.lineJoin = "round";

    context.beginPath();
    context.moveTo(startMouseX, startMouseY);
    context.lineTo(mouseX, mouseY);
    context.stroke();
    context.closePath();
  };

  const handleMouseDown = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvas.current?.getBoundingClientRect();
    if (rect) {
      const mouseX = event.clientX - rect.left;
      const mouseY = event.clientY - rect.top;
      setMouseLocation({ mouseX, mouseY });
    }
    isDrawingRef.current = true;
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  const clearCanvas = () => {
    const context = canvas.current?.getContext("2d");
    if (context) {
      context.clearRect(0, 0, canvas.current!.width, canvas.current!.height);
    }
  };

  return (
    <>
      <Button
        colorScheme="red"
        variant="outline"
        className="mt-4"
        backgroundColor={"white"}
        onClick={clearCanvas}
      >
        CLEAR BOARD
      </Button>
      <canvas
        className={clsx("border-2 border-black my-8 bg-white", "s")}
        ref={canvas}
        height={windowDimensions[0]}
        width={windowDimensions[1]}
        onMouseMove={(event) =>
          handleMouseMove(
            event,
            mouseLocation.mouseX,
            mouseLocation.mouseY,
            null,
            null,
            colorValue,
            penSize
          )
        }
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />
    </>
  );
};

export default WhiteboardBoard;
