import { Input } from "@chakra-ui/react";

interface AnswerBarData {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AnswerBar: React.FC<AnswerBarData> = ({ handleSubmit, handleInput }) => {
  return (
    <form
      className="flex flex-row gap-4 relative"
      onSubmit={(event) => handleSubmit(event)}
    >
      <Input
        onChange={(event) => handleInput(event)}
        name="quiz-input"
        background={"white"}
        borderColor={"black"}
        isRequired
      />
    </form>
  );
};

export { AnswerBar };
