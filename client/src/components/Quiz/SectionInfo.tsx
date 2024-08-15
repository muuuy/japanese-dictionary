type SectionInfoData = {
  sectionName: string;
  japaneseName: string;
};

const SectionInfo: React.FC<SectionInfoData> = ({
  sectionName,
  japaneseName,
}) => {
  return (
    <div className="w-full absolute bottom-0">
      <h2 className="font-black text-5xl text-white italic text-center bg-black p-1 w-full">
        {sectionName}
      </h2>
      <h3 className="text-white font-black bg-black w-full text-center p-1">
        {japaneseName}
      </h3>
    </div>
  );
};

export { SectionInfo };
