import { Chart } from "react-google-charts";
import { ResultData, GraphOptions } from "./VocabInterface";

const options: GraphOptions = {
  title: "Vocab Quiz Results",
  is3D: true,
};

const VocabGraph: React.FC<ResultData> = ({ correct, wrong, skipped }) => {
  const data = [
    ["test", "test"],
    ["Correct Answers", correct],
    ["Wrong Answers", wrong],
    ["Skipped Questions", skipped],
  ];

  return (
    <>
      {correct > 0 || wrong > 0 || skipped > 0 ? (
        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export { VocabGraph };
