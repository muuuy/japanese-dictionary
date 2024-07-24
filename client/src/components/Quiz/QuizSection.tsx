import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { FaArrowRightToBracket } from "react-icons/fa6";

interface QuizSectionData {
  active: string | null;
  setActive: (e: React.MouseEvent<HTMLDivElement>) => void;
  sectionName: string;
  sectionID: string;
  image: string;
}

const QuizSection: React.FC<QuizSectionData> = ({
  active,
  setActive,
  sectionName,
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
        <h2 className="font-black text-5xl text-white italic text-center absolute bottom-0 bg-black p-4 w-full">
          {sectionName}
        </h2>
      )}
    </div>
  );
};

export default QuizSection;
