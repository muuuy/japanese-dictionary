import { Chart } from "react-google-charts";
import { ResultData } from "./VocabInterface";

const VocabGraph: React.FC<ResultData> = ({ correct, wrong, skipped }) => {
  const data = [
    ["Statistic", "Number"],
    ["Correct Answers", correct],
    ["Wrong Answers", wrong],
    ["Skipped Questions", skipped],
  ];

  return (
    <>  
      <h1 className="pt-12 font-black text-4xl">VOCAB QUIZ RESULTS</h1>
      <div className="flex justify-center items-center">
        <Chart
          chartType="PieChart"
          data={data}
          options={{
            is3D: true,
            legend: "none",
            titleTextStyle: {
              fontSize: 18,
            },
          }}
          width={"100%"}
          height={"320px"}
        />
      </div>
    </>
  );
};

export { VocabGraph };
