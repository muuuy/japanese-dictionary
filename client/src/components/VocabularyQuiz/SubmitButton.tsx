import { IconButton } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa6";

interface SubmitData {
  handleSubmit: (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

const SubmitButton: React.FC<SubmitData> = ({ handleSubmit }) => {
  return (
    <IconButton
      aria-label="submit-button"
      icon={<FaCheck />}
      type="submit"
      colorScheme="red"
      variant={"outline"}
      background={"white"}
      isRound
      onClick={(event) => handleSubmit(event)}
    />
  );
};

export { SubmitButton };
