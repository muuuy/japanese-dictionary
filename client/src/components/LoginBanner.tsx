import { BrowserRouter as Routes, Route, Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

const LoginBanner = () => {
  return (
    <>
      <Link to={"/signup"} className="w-1/2">
        <Button colorScheme="red" variant={"outline"} width={"100%"}>
          <span className="font-black">SIGN UP</span>
        </Button>
      </Link>
      <Link to={"/login"} className="w-1/2">
        <Button colorScheme="red" width={"100%"}>
          <span className="font-black">LOG IN</span>
        </Button>
      </Link>
    </>
  );
};

export default LoginBanner;
