export interface FlashcardData {
  flashcard_id: number;
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

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ForgotFormData {
  email: string;
}

export interface UserFormProps {
  addErrorBanner: (title: string, description: string) => void;
}

export interface ResetData {
  password: string;
  verifyPassword: string;
}

export interface ResetFormData {
  password: string;
  verifyPassword: string;
  token: string;
}

export interface ValidateBodyData {
  flashcard_id: number;
  character: string;
  definition: string;
  input?: string;
}
