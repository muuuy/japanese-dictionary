import { useState, useRef, useEffect } from "react";

const WhiteboardBoard = () => {
  interface Mouse {
    mouseX: number;
    mouseY: number;
  }

  const whiteboard = useRef<HTMLDivElement | null>(null);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState<string>("black");

  const [mouseLocation, setMouseLocation] = useState<Mouse>({
    mouseX: 0,
    mouseY: 0,
  });

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

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDrawing) {
      const rect = canvas.current?.getBoundingClientRect();
      if (rect) {
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;
        setMouseLocation({ mouseX: mouseX, mouseY: mouseY });

        const context = canvas.current?.getContext("2d");
        if (context) {
          context.fillStyle = "black";
          context.lineWidth = 8;
          context.lineCap = "round";
          context.lineJoin = "round";

          context.beginPath();
          context.moveTo(mouseLocation.mouseX, mouseLocation.mouseY);
          context.lineTo(mouseX, mouseY);
          context.stroke();
          context.closePath();

          setMouseLocation({ mouseX, mouseY });
        }
      }
    }
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

  return (
    <div
      className="w-11/12 my-8 flex-grow border-2 border-black"
      ref={whiteboard}
    >
      <canvas
        width="100%"
        height="100%"
        ref={canvas}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      ></canvas>
    </div>
  );
};

export default WhiteboardBoard;
