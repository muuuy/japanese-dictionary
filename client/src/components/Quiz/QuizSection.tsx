import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { FaArrowRightToBracket } from "react-icons/fa6";

import "../../styles/QuizSection.scss";

interface QuizSectionData {
  active: string | null;
  setActive: (e: React.MouseEvent<HTMLDivElement>) => void;
  sectionName: string;
  sectionID: string;
  image: string;
  japaneseName: string;
}

const QuizSection: React.FC<QuizSectionData> = ({
  active,
  setActive,
  sectionName,
  japaneseName,
  sectionID,
  image,
}) => {
  return (
    <div
      className={`quiz--section-container ${
        active === sectionID ? "h-5/6 w-2/12" : ""
      }`}
      style={{ backgroundImage: `url(${image})` }}
      id={sectionID}
      onClick={(e) => setActive(e)}
    >
      {active === sectionID ? (
        <Link to={"/quiz/matching-quiz"} className="absolute bottom-20">
          <Button>
            <FaArrowRightToBracket />
          </Button>
        </Link>
      ) : (
        <div className="w-full absolute bottom-0">
          <h2 className="font-black text-5xl text-white italic text-center  bg-black p-1 w-full">
            {sectionName}
          </h2>
          <h3 className="text-white font-black bg-black w-full text-center p-1">
            {japaneseName}
          </h3>
        </div>
      )}
    </div>
  );
};

export default QuizSection;
