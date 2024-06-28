import { useRef } from "react";

import Logo from "../assets/yu_kana.png";

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
        className="flex flex-col h-screen w-fit bg-light-gray gap-4"
        ref={sidebar}
      >
        <img src={Logo} className="scale-50 h-16 select-none" />
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
        <p>test</p>
      </div>
    </div>
  );
};

export default Navbar;
