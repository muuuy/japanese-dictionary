import { useState } from "react";
import { Input } from "@chakra-ui/react";

interface AnswerBarData {
  handleSubmit: (
    event: React.FormEvent<HTMLFormElement>,
    input: string
  ) => void;
}

const AnswerBar: React.FC<AnswerBarData> = ({ handleSubmit }) => {
  const [input, setInput] = useState<string>("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  return (
    <form
      className="flex flex-row gap-4 relative"
      onSubmit={(event) => handleSubmit(event, input)}
    >
      <Input
        value={input}
        onChange={handleInput}
        name="quiz-input"
        background={"white"}
        borderColor={"black"}
        isRequired
      />
    </form>
  );
};

export default AnswerBar;
