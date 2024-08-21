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
  const [id, setId] = useState<string>("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setInput(event.target.value);
  };

  const validateInput = async () => {
    const res = await fetch(`http://localhost:3000/vocab/${id}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
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
      <div className="absolute -right-12">
        <IconButton
          aria-label="submit-button"
          icon={<FaCheck />}
          type="submit"
          colorScheme="red"
          variant={"outline"}
          isRound
        />
      </div>
    </form>
  );
};

export default AnswerBar;
