import HomePageImage from "../../assets/homepage_img.jpg";
import FunctionalitySection from "./FunctionalitySection";

import { FaPencilAlt, FaQuestion } from "react-icons/fa";
import { IoIosFlash } from "react-icons/io";

import { SectionData } from "../../interfaces";
import { SkeletonData } from "../../interfaces";

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
      sectionName: "QUIZ",
      japaneseName: "クイズ",
      description: "Take a quiz using the flashcards you have created!",
      linkTo: "",
      variant: "solid",
      isRound: true,
      iconType: <FaQuestion />,
    },
  ];

  return (
    <section className="flex flex-row flex-1 border-t-2 border-black flex-1 h-2/5">
      <img
        src={HomePageImage}
        onLoad={imageLoaded}
        className={`w-1/5 h-full object-cover translate-y-full  ${
          imagesLoaded ? "animate-slide-in-from-bottom" : ""
        }`}
      />
      <div
        className={`flex flex-row flex-1 justify-evenly bg-white relative translate-x-full ${
          imagesLoaded ? "animate-slide-in-from-right" : ""
        }`}
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
        <p className="absolute font-black text-2xl text-white top-4 right-0 tracking-widest text-right">
          <span className="bg-red-600 pl-2">ようこそ！</span>
          <br />
          <span className="bg-red-600 pl-2">日本語を勉強しよう！</span>
        </p>
        <p className="absolute font-black text-2xl text-white bottom-0 right-4 tracking-widest text-right bg-red-600 px-2">
          が<br />ん<br />ば<br />れ<br />！
        </p>
      </div>
    </section>
  );
};

export default Functionality;
