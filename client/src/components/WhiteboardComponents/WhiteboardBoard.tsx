import { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";

import { DrawingData } from "../../interfaces";

import { Button } from "@chakra-ui/react";

const socket = io("http://localhost:3000", { transports: ["websocket"] });
interface WhiteboardBoardProps {
  colorValue: string;
  penSize: number;
}
interface Mouse {
  mouseX: number;
  mouseY: number;
}

const WhiteboardBoard: React.FC<WhiteboardBoardProps> = ({
  colorValue,
  penSize,
}) => {
  const whiteboard = useRef<HTMLDivElement | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);

  const [mouseLocation, setMouseLocation] = useState<Mouse>({
    mouseX: 0,
    mouseY: 0,
  });

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

  useEffect(() => {
    const resizeCanvas = () => {
      const canvasElem = canvas.current;
      const parentDiv = whiteboard.current;

      if (canvasElem && parentDiv) {
        const parentDiv = whiteboard.current;
        canvasElem.width = parentDiv?.clientWidth || 0;
        canvasElem.height = parentDiv?.clientHeight || 0;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    socket.on("draw", (data: DrawingData) => {
      console.log("recieved data", data);
    });

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const handleMouseMove = (
    event: React.MouseEvent<HTMLCanvasElement> | null,
    startMouseX: number,
    startMouseY: number,
    socketMouseX: number,
    socketMouseY: number,
    color: string,
    size: number
  ) => {
    if (isDrawingRef.current || event === null) {
      const rect = canvas.current?.getBoundingClientRect();
      if (rect) {
        const clientX: number = event === null ? socketMouseX : event.clientX;
        const clientY: number = event === null ? socketMouseY : event.clientY;

        if (isDrawingRef.current) {
          socket.emit("send_coordinates", {
            startMouseX: mouseLocation.mouseX,
            startMouseY: mouseLocation.mouseY,
            mouseX: clientX,
            mouseY: clientY,
            color: colorValue,
            size: penSize,
          });
        }

        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;

        const context = canvas.current?.getContext("2d");

        if (context) {
          startMouseX === -1 && startMouseY === -1 && color === ""
            ? drawOnCanvas(
                context,
                mouseLocation.mouseX,
                mouseLocation.mouseY,
                mouseX,
                mouseY,
                colorValue,
                size
              )
            : drawOnCanvas(
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
        onClick={clearCanvas}
      >
        CLEAR BOARD
      </Button>
      <div
        className="w-11/12 my-8 flex-1 border-2 border-black cursor-crosshair"
        ref={whiteboard}
      >
        <canvas
          ref={canvas}
          onMouseMove={(event) =>
            handleMouseMove(event, -1, -1, -1, -1, "", penSize)
          }
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
      </div>
    </>
  );
};

export default WhiteboardBoard;
