import HomePageImage2 from "../../assets/homepage_img2.jpg";
import { BrowserRouter as Routes, Route, Link } from "react-router-dom";

import { Button } from "@chakra-ui/react";

const Header = () => {
  return (
    <section className="flex flex-row h-3/5 w-full justify-center items-center">
      <div className="flex flex-col flex-1 justify-center items-center text-center bg-white h-full">
        <h1 className="font-black">
          <span className="text-4xl">STUDY AND LEARN</span>
          <br />
          <span className="text-7xl text-red-600">JAPANESE</span>
        </h1>
        <h2 className="font-bold w-[600px] py-4">
          Explore and enhance your Japanese language skills by yourself or with
          friends!
        </h2>
        <div className="flex flex-row gap-8 w-[400px]">
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
        </div>
      </div>
      <img src={HomePageImage2} className="w-3/5 h-full object-fit" />
    </section>
  );
};

export default Header;
