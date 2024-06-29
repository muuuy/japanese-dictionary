import { useRef } from "react";

import Logo from "../assets/yu_kana.png";

import { Button, ButtonGroup } from "@chakra-ui/react";

import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = () => {
  const sidebar = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (sidebar.current)
      sidebar.current.style.display =
        sidebar.current.style.display === "flex" ? "none" : "flex";
  };

  return (
    <div>
      <HamburgerIcon
        boxSize="32px"
        className="ml-2 mt-4 cursor-pointer absolute"
        onClick={handleClick}
      />
      <div
        className="hidden flex-col h-screen w-fit bg-light-gray gap-4 items-center"
        ref={sidebar}
      >
        <img src={Logo} className="scale-50 h-16 select-none" />
        <ButtonGroup orientation="vertical" spacing={8}>
          <Button colorScheme="teal" variant="ghost" className="w-48">
            <span className="sidebar--button-text">home</span>
          </Button>
          <Button colorScheme="teal" variant="ghost" className="w-48">
            <span className="sidebar--button-text">temp</span>
          </Button>
          <Button colorScheme="teal" variant="ghost" className="w-48">
            <span className="sidebar--button-text">temp</span>
          </Button>
          <Button colorScheme="teal" variant="ghost" className="w-48">
            <span className="sidebar--button-text">temp</span>
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Navbar;
