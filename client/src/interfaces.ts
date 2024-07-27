export interface FlashcardData {
  id: string;
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

export interface ErrorBannerData {
  title: string;
  description?: string;
  link?: string;
}

export interface FormData {
  name: string;
  roomCode: string;
}

export interface WhiteBoardFormData {
  addErrorBanner: (title: string, description: string, link?: string) => void;
}
