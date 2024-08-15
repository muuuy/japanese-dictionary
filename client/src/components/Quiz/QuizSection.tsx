import { QuizSectionImage } from "./QuizSectionImage";
import { PlayButton } from "./PlayButton";
import { SectionInfo } from "./SectionInfo";
import { QuizSectionData } from "./QuizInterface";
import "../../styles/QuizSection.scss";

const QuizSection: React.FC<QuizSectionData> = ({
  activeSectionManager,
  sectionDetails,
  handleImageLoaded,
  animation,
}) => {
  const { sectionName, japaneseName, sectionID, image, link } = sectionDetails;
  const { active, setActive } = activeSectionManager;

  return (
    <div
      className={`quiz--section-container cursor-pointer ${animation} ${
        active === sectionID ? "h-5/6 w-2/12" : ""
      }`}
      id={sectionID}
      onClick={(e) => setActive(e)}
    >
      <QuizSectionImage
        imageSrc={image}
        handleImageLoaded={handleImageLoaded}
      />
      {active === sectionID ? (
        <PlayButton link={link} />
      ) : (
        <SectionInfo sectionName={sectionName} japaneseName={japaneseName} />
      )}
    </div>
  );
};

export { QuizSection };
