import { CloseIcon } from "@chakra-ui/icons";

interface RulesData {
  handleClose: () => void;
}

const Rules: React.FC<RulesData> = ({ handleClose }) => {
  return (
    <div className="absolute z-6 bg-white text-center flex flex-col gap-4 border-2 border-black p-8 rounded-3xl">
      <CloseIcon
        className="absolute top-4 right-4 cursor-pointer"
        onClick={handleClose}
      />
      <h3 className="font-black text-4xl text-red-500 italic">RULES</h3>
      <ul>
        <span className="rules--list-header">OBJECTIVE</span>
        <li>The goal is to match pairs of related items correctly.</li>
      </ul>
      <ul>
        <span className="rules--list-header">GAMEPLAY</span>
        <li>Each term can be paired with only one match.</li>
        <li>
          The player selects a term and then drags it to its corresponding
          match.
        </li>
      </ul>
      <ul>
        <span className="rules--list-header">ATTEMPTS</span>
        <li>The number of attempts per item is unlimited</li>
      </ul>
      <ul>
        <span className="rules--list-header">TIMER</span>
        <li>
          A timer starts tracking the time it takes for the user to complete the
          quiz.
          <br />
          The timer starts once the user presses the <b>START QUIZ</b> button
        </li>
      </ul>
    </div>
  );
};

export default Rules;
