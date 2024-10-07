import clsx from "clsx";

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
      <h2
        className={clsx(
          "font-black text-4xl text-white italic text-center bg-black p-1 w-full text-ellipsis overflow-hidden whitespace-nowrap"
        )}
      >
        {sectionName}
      </h2>
      <h3 className="text-white font-black bg-black w-full text-center p-1">
        {japaneseName}
      </h3>
    </div>
  );
};

export { SectionInfo };
