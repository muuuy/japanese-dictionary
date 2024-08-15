import { useRef, useState, useContext, useEffect } from "react";
import { ButtonGroup } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { DropdownDispatchContext } from "../../contexts/DropdownContext";
import { NavbarButton } from "./NavbarButton";
import { LoginButton } from "./LoginButton";
import { LogoutButton } from "./LogoutButton";
import { NavbarButtonData } from "./NavbarInterfaces";
import Logo from "../../assets/yu_kana.png";
import useUserStore from "../../stores/store";
import clsx from "clsx";

const Navbar = () => {
  const auth = useUserStore((state) => state.auth);

  const sidebar = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useContext(DropdownDispatchContext);

  const buttonsInfo: NavbarButtonData[] = [
    { linkTo: "/", text: "home" },
    { linkTo: "/create-whiteboard", text: "whiteboard" },
    { linkTo: "/flashcards", text: "flashcard" },
    { linkTo: "/quiz", text: "quizzes" },
    { linkTo: "/", text: "download" },
  ];

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    isOpen
      ? dispatch({ type: "OPEN_SIDEBAR" })
      : dispatch({ type: "CLOSE_SIDEBAR" });
  }, [isOpen, dispatch]);

  return (
    <div className={clsx("sticky top-0 z-40")}>
      <HamburgerIcon
        boxSize="45px"
        className={clsx(
          "ml-2 mt-4 cursor-pointer absolute z-50 bg-white rounded-full p-2",
          "sm:bg-transparent"
        )}
        onClick={handleClick}
      />
      <div
        className={`flex-col h-screen gap-4 items-center border-r-2 border-black relative bg-white ${
          isOpen ? "animate-navbar-open" : "animate-navbar-close"
        } ${isOpen ? "flex" : "hidden"}`}
        ref={sidebar}
      >
        <img
          src={Logo}
          alt="Yukana logo"
          loading="lazy"
          className="scale-50 h-18 select-none"
        />
        <ButtonGroup orientation="vertical" spacing={8}>
          {buttonsInfo.map((info, index) => {
            return (
              <NavbarButton
                linkTo={info.linkTo}
                text={info.text}
                key={`navbar-button${index}`}
              />
            );
          })}
          {auth ? <LogoutButton /> : <LoginButton />}
        </ButtonGroup>
      </div>
    </div>
  );
};

export default Navbar;
