type SectionImageData = {
  imageSrc: string;
  handleImageLoaded: () => void;
};

const QuizSectionImage: React.FC<SectionImageData> = ({
  imageSrc,
  handleImageLoaded,
}) => {
  return (
    <img
      src={imageSrc}
      className="object-cover w-full h-full"
      onLoad={handleImageLoaded}
    />
  );
};

export { QuizSectionImage };
