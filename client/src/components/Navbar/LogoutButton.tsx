import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { logout } from "../../api/logout";
import useUserStore from "../../stores/store";

const LogoutButton = () => {
  const unAuthUser = useUserStore((state) => state.unAuthUser);

  //Handles logout to backend + Unauths user via Zustand
  const handleLogout = async () => {
    const res = await logout();

    if (res.ok) {
      unAuthUser();
    }
  };

  return (
    <Link to={"/"} className="navigation--user-button">
      <Button
        colorScheme="red"
        height={12}
        leftIcon={<FaArrowRightToBracket />}
        onClick={handleLogout}
        fontSize={32}
        variant={"outline"}
        className="w-48"
      >
        <span className="sidebar--button-text">logout</span>
      </Button>
    </Link>
  );
};

export { LogoutButton };
