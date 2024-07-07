import HomePageImage from "../../assets/homepage_img.jpg";
import FunctionalitySection from "./FunctionalitySection";

import { FaPencilAlt, FaQuestion } from "react-icons/fa";
import { IoIosFlash } from "react-icons/io";

import { SectionData } from "../../interfaces";

const Functionality = () => {
  const desc: string =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  const sectionData: SectionData[] = [
    {
      sectionName: "WHITEBOARD",
      description:
        "Practice writing Japanses characters by yourself or with friends!",
      linkTo: "create-whiteboard",
      variant: "solid",
      isRound: true,
      iconType: <FaPencilAlt />,
    },
    {
      sectionName: "FLASHCARDS",
      description: "Create and study Japanese characters with flashcards!",
      linkTo: "flashcards",
      variant: "outline",
      isRound: false,
      iconType: <IoIosFlash />,
    },
    {
      sectionName: "QUIZ",
      description: "Take a quiz using the flashcards you have created!",
      linkTo: "",
      variant: "solid",
      isRound: true,
      iconType: <FaQuestion />,
    },
  ];

  return (
    <section className="flex flex-row flex-1 border-t-2 border-black flex-1 h-2/5">
      <img src={HomePageImage} />
      <div className="flex flex-row flex-1 justify-evenly bg-white">
        {sectionData.map((data) => (
          <FunctionalitySection
            sectionName={data.sectionName}
            description={data.description}
            variant={data.variant}
            isRound={data.isRound}
            linkTo={data.linkTo}
            iconType={data.iconType}
          />
        ))}
      </div>
    </section>
  );
};

export default Functionality;
