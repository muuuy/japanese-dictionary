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
  const [isDrawing, setIsDrawing] = useState(false);

  const [mouseLocation, setMouseLocation] = useState<Mouse>({
    mouseX: 0,
    mouseY: 0,
  });

  // useEffect(() => {
  //   socket.emit("send_coordinates", {
  //     mouseX: mouseLocation.mouseX,
  //     mouseY: mouseLocation.mouseY,
  //   });
  // }, [mouseLocation]);

  useEffect(() => {
    socket.on("recieve_coordinates", (coordinates) => {
      handleMouseMove(null, coordinates.mouseX, coordinates.mouseY);
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
    socketMouseX: number,
    socketMouseY: number
  ) => {
    if (isDrawing || event === null) {
      const rect = canvas.current?.getBoundingClientRect();
      if (rect) {
        // socket.emit("send_coordinates", {
        //   mouseX: mouseLocation.mouseX,
        //   mouseY: mouseLocation.mouseY,
        // });

        const clientX: number = event === null ? socketMouseX : event.clientX;
        const clientY: number = event === null ? socketMouseY : event.clientY;

        event === null ? console.log("null") : console.log("fail");

        const mouseX = clientX - rect.left;
        const mouseY = clientY - rect.top;

        const context = canvas.current?.getContext("2d");

        if (context) {
          drawOnCanvas(context, mouseX, mouseY);

          setMouseLocation({ mouseX, mouseY });
        }
      }
    }
  };

  const drawOnCanvas = (
    context: CanvasRenderingContext2D,
    mouseX: number,
    mouseY: number
  ) => {
    context.strokeStyle = colorValue;
    context.lineWidth = penSize;
    context.lineCap = "round";
    context.lineJoin = "round";

    context.beginPath();
    context.moveTo(mouseLocation.mouseX, mouseLocation.mouseY);
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
    setIsDrawing(true);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
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
          onMouseMove={(event) => handleMouseMove(event, -1, -1)}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        />
      </div>
    </>
  );
};

export default WhiteboardBoard;
