interface SectionContainerData {
  active: string;
  setActive: (e: React.MouseEvent<HTMLDivElement>) => void;
  animation: string;
  sectionID: string;
  children: React.ReactNode;
}

const QuizSectionContainer: React.FC<SectionContainerData> = ({
  animation,
  active,
  sectionID,
  setActive,
  children,
}) => {
  return (
    <div
      className={`quiz--section-container cursor-pointer ${animation} ${
        active === sectionID ? "h-5/6 w-2/12" : ""
      }`}
      id={sectionID}
      onClick={(e) => setActive(e)}
    >
      {children}
    </div>
  );
};

export { QuizSectionContainer };
