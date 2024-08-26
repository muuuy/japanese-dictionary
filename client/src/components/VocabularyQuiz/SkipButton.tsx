import { IconButton } from "@chakra-ui/react";
import { IoMdSkipForward } from "react-icons/io";

interface SkipData {
  handleSkip: () => void;
}

const SkipButton: React.FC<SkipData> = ({ handleSkip }) => {
  return (
    <IconButton
      aria-label="Skip Button"
      icon={<IoMdSkipForward />}
      colorScheme="red"
      isRound
      onClick={handleSkip}
    />
  );
};

export { SkipButton };
