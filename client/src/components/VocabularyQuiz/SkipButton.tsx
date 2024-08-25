import { IconButton } from "@chakra-ui/react";
import { IoMdSkipForward } from "react-icons/io";

const SkipButton = () => {
  return (
    <IconButton
      aria-label="Skip Button"
      icon={<IoMdSkipForward />}
      colorScheme="red"
      isRound
    />
  );
};

export { SkipButton };
