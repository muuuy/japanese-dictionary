export interface FlashcardData {
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

export interface ErrorBanner {
  show: boolean;
  text: string;
}

export interface SectionData {
  sectionName: string;
  japaneseName: string;
  description: string;
  linkTo: string;
  variant: string;
  isRound: boolean;
  iconType: React.ReactElement;
}

export interface SkeletonData {
  imageLoaded: () => void;
  imagesLoaded: boolean;
}
