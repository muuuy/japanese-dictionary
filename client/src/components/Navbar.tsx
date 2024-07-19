import { useRef, useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../assets/yu_kana.png";

import useUserStore from "../stores/store";
import { logout } from "../api/logout";

import { Button, ButtonGroup } from "@chakra-ui/react";
import { IoLogOut } from "react-icons/io5";

import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const auth = useUserStore((state) => state.auth);
  const unAuthUser = useUserStore((state) => state.unAuthUser);

  const sidebar = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    const res = await logout();
    if (res) {
      unAuthUser();
    }
  };

  return (
    <div className="sticky top-0 z-40">
      <HamburgerIcon
        boxSize="32px"
        className="ml-2 mt-4 cursor-pointer absolute z-50"
        onClick={handleClick}
      />
      <div
        className={`flex-col h-screen gap-4 items-center border-r-2 border-black relative ${
          isOpen ? "animate-navbar-open" : "animate-navbar-close"
        } ${isOpen ? "flex" : "hidden"}`}
        ref={sidebar}
      >
        <img src={Logo} className="scale-50 h-16 select-none" />
        <ButtonGroup orientation="vertical" spacing={8}>
          <Link to={"/"}>
            <Button colorScheme="red" variant="ghost" className="w-48">
              <span className="sidebar--button-text">home</span>
            </Button>
          </Link>
          <Link to={"/create-whiteboard"}>
            <Button colorScheme="red" variant="ghost" className="w-48">
              <span className="sidebar--button-text">whiteboard</span>
            </Button>
          </Link>
          <Link to={"/flashcards"}>
            <Button colorScheme="red" variant="ghost" className="w-48">
              <span className="sidebar--button-text">flashcards</span>
            </Button>
          </Link>
          <Link to={"/quiz"}>
            <Button colorScheme="red" variant="ghost" className="w-48">
              <span className="sidebar--button-text">quiz</span>
            </Button>
          </Link>
          {auth ? (
            <Link to={"/"} className="navigation--user-button">
              <Button
                colorScheme="red"
                height={12}
                leftIcon={<IoLogOut />}
                onClick={handleLogout}
                fontSize={32}
              >
                <span className="sidebar--button-text">logout</span>
              </Button>
            </Link>
          ) : (
            <Link to={"/login/"} className="navigation--user-button">
              <Button
                colorScheme="red"
                height={12}
                fontSize={32}
                className="w-48"
              >
                <span className="sidebar--button-text">login</span>
              </Button>
            </Link>
          )}
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Navbar;
