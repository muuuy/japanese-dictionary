interface QuizSectionData {
  active: string | null;
  setActive: (e: React.MouseEvent<HTMLDivElement>) => void;
  sectionName: string;
  sectionID: string;
}

const QuizSection: React.FC<QuizSectionData> = ({
  active,
  setActive,
  sectionName,
  sectionID,
}) => {
  return (
    <div
      className={`quiz--section-container ${
        active === sectionID ? "h-5/6 w-2/12" : ""
      }`}
      id={sectionID}
      onClick={(e) => setActive(e)}
    >
      <h2 className="font-black text-5xl text-center absolute bottom-20">
        {sectionName}
      </h2>
    </div>
  );
};

export default QuizSection;
