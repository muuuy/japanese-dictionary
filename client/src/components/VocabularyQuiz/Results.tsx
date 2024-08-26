import { CheckIcon, CloseIcon, RepeatIcon } from "@chakra-ui/icons";

interface ResultsData {
  numCorrect: number;
  numWrong: number;
  numSkipped: number;
}

const Results: React.FC<ResultsData> = ({
  numCorrect,
  numWrong,
  numSkipped,
}) => {
  return (
    <div className="flex flex-row justify-center items-center text-center gap-8 mt-4">
      <p className="flex flex-row items-center gap-2">
        <CheckIcon color={"green"} />
        <span className="font-black">{numCorrect}</span>
      </p>
      <p className="flex flex-row items-center gap-2">
        <CloseIcon color={"red"} />
        <span className="font-black">{numWrong}</span>
      </p>
      <p className="flex flex-row items-center gap-2">
        <RepeatIcon color={"gray"} />
        <span className="font-black">{numSkipped}</span>
      </p>
    </div>
  );
};

export { Results };
