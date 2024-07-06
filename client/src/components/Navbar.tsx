import { useRef } from "react";
import { BrowserRouter as Routes, Route, Link } from "react-router-dom";

import Logo from "../assets/yu_kana.png";

import useUserStore from "../stores/store";

import { Button, ButtonGroup } from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const auth = useUserStore((state) => state.auth);

  const sidebar = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (sidebar.current)
      sidebar.current.style.display =
        sidebar.current.style.display === "flex" ? "none" : "flex";
  };

  return (
    <div className="sticky top-0 z-50">
      <HamburgerIcon
        boxSize="32px"
        className="ml-2 mt-4 cursor-pointer absolute"
        onClick={handleClick}
      />
      <div
        className="hidden flex-col h-screen w-fit bg-light-gray gap-4 items-center border-r-2 border-black"
        ref={sidebar}
      >
        <img src={Logo} className="scale-50 h-16 select-none" />
        <ButtonGroup orientation="vertical" spacing={8}>
          <Link to={"/"}>
            <Button colorScheme="teal" variant="ghost" className="w-48">
              <span className="sidebar--button-text">home</span>
            </Button>
          </Link>
          <Link to={"/create-whiteboard"}>
            <Button colorScheme="teal" variant="ghost" className="w-48">
              <span className="sidebar--button-text">whiteboard</span>
            </Button>
          </Link>
          <Link to={"/flashcards"}>
            <Button colorScheme="teal" variant="ghost" className="w-48">
              <span className="sidebar--button-text">flashcards</span>
            </Button>
          </Link>
          <Button colorScheme="teal" variant="ghost" className="w-48">
            <span className="sidebar--button-text">temp</span>
          </Button>
          {auth ? (
            <Link to={"/login/"}>
              <Button colorScheme="teal" variant="ghost" className="w-48">
                <span className="sidebar--button-text">logout</span>
              </Button>
            </Link>
          ) : (
            <Link to={"/login/"}>
              <Button colorScheme="teal" variant="ghost" className="w-48">
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
