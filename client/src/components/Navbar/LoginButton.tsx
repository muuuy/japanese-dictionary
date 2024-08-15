import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { FaArrowRightFromBracket } from "react-icons/fa6";

const LoginButton = () => {
  return (
    <Link to={"/login/"} className="navigation--user-button">
      <Button
        colorScheme="red"
        height={12}
        leftIcon={<FaArrowRightFromBracket />}
        fontSize={32}
        className="w-48"
      >
        <span className="sidebar--button-text">login</span>
      </Button>
    </Link>
  );
};

export { LoginButton };
