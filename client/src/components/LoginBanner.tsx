import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import clsx from "clsx";

const LoginBanner = () => {
  return (
    <div className={clsx("flex gap-8 w-72", "sm:w-80 m:w-96")}>
      <Link to={"/signup"} className={"w-1/2"}>
        <Button
          colorScheme="red"
          variant={"outline"}
          background={"white"}
          width={"100%"}
        >
          <span className="font-black">SIGN UP</span>
        </Button>
      </Link>
      <Link to={"/login"} className="w-1/2">
        <Button colorScheme="red" width={"100%"}>
          <span className="font-black">LOG IN</span>
        </Button>
      </Link>
    </div>
  );
};

export { LoginBanner };
