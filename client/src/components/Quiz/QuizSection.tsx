import { Link } from "react-router-dom";
import { FaArrowRightToBracket } from "react-icons/fa6";
import "../../styles/QuizSection.scss";

interface QuizSectionData {
  active: string | null;
  setActive: (e: React.MouseEvent<HTMLDivElement>) => void;
  sectionName: string;
  sectionID: string;
  image: string;
  japaneseName: string;
  link: string;
  handleImageLoaded: () => void;
  animation: string;
}

const QuizSection: React.FC<QuizSectionData> = ({
  active,
  setActive,
  sectionName,
  japaneseName,
  sectionID,
  image,
  link,
  handleImageLoaded,
  animation,
}) => {
  return (
    <div
      className={`quiz--section-container cursor-pointer ${animation} ${
        active === sectionID ? "h-5/6 w-2/12" : ""
      }`}
      id={sectionID}
      onClick={(e) => setActive(e)}
    >
      <img
        src={image}
        className="object-cover w-full h-full"
        onLoad={handleImageLoaded}
      />
      {active === sectionID ? (
        <Link to={link} className="w-full absolute bottom-0 bg-black">
          <div className="flex flex-row p-1 w-full justify-center items-center gap-4 p-2">
            <h2 className="font-black text-5xl text-white italic text-center">
              PLAY
            </h2>
            <FaArrowRightToBracket color="white" size={32} />
          </div>
        </Link>
      ) : (
        <div className="w-full absolute bottom-0">
          <h2 className="font-black text-5xl text-white italic text-center bg-black p-1 w-full">
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

export { QuizSection };
