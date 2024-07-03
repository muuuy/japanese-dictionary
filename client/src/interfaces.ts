export interface Flashcard {
  id: number;
  character: string;
  definition: string;
}

export interface DrawingData {
  mouseX: number;
  mouseY: number;
  endX: number;
  endY: number;
  strokeStyle: string;
  lineWidth: number;
  lineCap: string;
  lineJoin: string;
}
