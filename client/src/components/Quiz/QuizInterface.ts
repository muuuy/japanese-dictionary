export interface QuizSectionDetails {
  sectionID: string;
  sectionName: string;
  japaneseName: string;
  image: string;
  link: string;
}

export interface QuizSectionData {
  activeSectionManager: SectionManagerData;
  sectionDetails: QuizSectionDetails;
  handleImageLoaded: () => void;
  animation: string;
}

export interface QuizImageData {
  sectionImage: string;
  handleImageLoaded: () => void;
}

export interface SectionManagerData {
  active: string | null;
  setActive: (e: React.MouseEvent<HTMLDivElement>) => void;
}
