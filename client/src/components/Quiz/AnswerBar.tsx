import { useState } from "react";

import { Input } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

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
      className="flex flex-row gap-4"
      onSubmit={(event) => handleSubmit(event, input)}
    >
      <Input
        value={input}
        onChange={handleInput}
        name="quiz-input"
        isRequired
      />
      <IconButton
        aria-label="submit-button"
        icon={<FaCheck />}
        type="submit"
        colorScheme="red"
        variant={"outline"}
        isRound
      />
    </form>
  );
};

export default AnswerBar;
