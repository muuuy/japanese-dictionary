import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { NavbarButtonData } from "./NavbarInterfaces";

// Defines a normal button for the navbar.
// linkTo: String for redirecting the user to another page.
// text: String for text inside of the button.
const NavbarButton: React.FC<NavbarButtonData> = ({ linkTo, text }) => {
  return (
    <Link to={linkTo}>
      <Button colorScheme="red" variant="ghost" className="w-48">
        <span className="sidebar--button-text">{text}</span>
      </Button>
    </Link>
  );
};

export { NavbarButton };
