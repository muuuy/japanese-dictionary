import { IconButton } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa6";

const SubmitButton = () => {
  return (
    <IconButton
      aria-label="submit-button"
      icon={<FaCheck />}
      type="submit"
      colorScheme="red"
      variant={"outline"}
      background={"white"}
      isRound
     
    />
  );
};

export { SubmitButton };
