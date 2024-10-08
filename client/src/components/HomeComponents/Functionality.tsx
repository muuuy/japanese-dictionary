import { FaPencilAlt, FaQuestion } from "react-icons/fa";
import { IoIosFlash } from "react-icons/io";
import { SectionData } from "../../interfaces";
import { SkeletonData } from "../../interfaces";
import { FunctionalitySection } from "./FunctionalitySection";
import HomePageImage from "../../assets/homepage_img.jpg";
import clsx from "clsx";

const Functionality: React.FC<SkeletonData> = ({
  imageLoaded,
  imagesLoaded,
}) => {
  const sectionData: SectionData[] = [
    {
      sectionName: "WHITEBOARD",
      japaneseName: "ホワイトボード",
      description:
        "Practice writing Japanses characters by yourself or with friends!",
      linkTo: "create-whiteboard",
      variant: "solid",
      isRound: true,
      iconType: <FaPencilAlt />,
    },
    {
      sectionName: "FLASHCARDS",
      japaneseName: "フラッシュカード",
      description: "Create and study Japanese characters with flashcards!",
      linkTo: "flashcards",
      variant: "outline",
      isRound: false,
      iconType: <IoIosFlash />,
    },
    {
      sectionName: "QUIZZES",
      japaneseName: "クイズ",
      description: "Take a quiz using the flashcards you have created!",
      linkTo: "quiz",
      variant: "solid",
      isRound: true,
      iconType: <FaQuestion />,
    },
  ];

  return (
    <section
      className={clsx(
        "flex flex-col   flex-1 border-t-2 border-black flex-1 h-2/5",
        "sm:flex-row"
      )}
    >
      <img
        src={HomePageImage}
        onLoad={imageLoaded}
        className={clsx(
          `w-full h-full rounded-b-3xl object-cover translate-y-full  ${
            imagesLoaded ? "animate-slide-in-from-bottom" : ""
          }`,
          "sm:w-1/5 sm:h-full sm:rounded-none"
        )}
      />
      <div
        className={clsx(
          `flex flex-row min-h-full justify-evenly bg-beige relative ${
            imagesLoaded ? "animate-slide-in-from-right" : ""
          }`,
          "sm:flex-1"
        )}
      >
        {sectionData.map((data, index) => (
          <FunctionalitySection
            sectionName={data.sectionName}
            japaneseName={data.japaneseName}
            description={data.description}
            variant={data.variant}
            isRound={data.isRound}
            linkTo={data.linkTo}
            iconType={data.iconType}
            key={`functionality-${index}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Functionality;
