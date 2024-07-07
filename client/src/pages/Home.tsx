import { BrowserRouter as Routes, Route, Link } from "react-router-dom";

import HomePageImage2 from "../assets/homepage_img2.jpg";
import Functionality from "../components/HomeComponents/Functionality";

import { Button } from "@chakra-ui/react";

const Home = () => {
  return (
    <div className="flex flex-1 flex-col max-h-screen max-w-full bg-black">
      <section className="flex flex-row h-3/5 w-full justify-center items-center gap-2 py-2">
        <div className="flex flex-col flex-1 justify-center items-center text-center bg-white h-full rounded-3xl">
          <h1 className="font-black">
            <span className="text-4xl">STUDY AND LEARN</span>
            <br />
            <span className="text-7xl text-red-600">JAPANESE</span>
          </h1>
          <h2 className="font-bold w-[600px] py-4">
            Explore and Enhance Your Japanese Language Skills by Yourself or
            with Friends
          </h2>
          <div className="flex flex-row gap-8 w-[400px]">
            <Link to={"/signup"} className="w-[50%]">
              <Button colorScheme="red" variant={"outline"} width={"100%"}>
                <span className="font-black">SIGN UP</span>
              </Button>
            </Link>
            <Link to={"/login"} className="w-[50%]">
              <Button colorScheme="red" width={"100%"}>
                <span className="font-black">LOG IN</span>
              </Button>
            </Link>
          </div>
        </div>
        <img
          src={HomePageImage2}
          className="max-w-[60%] h-[100%] object-cover rounded-3xl"
        />
      </section>
      <Functionality />
    </div>
  );
};

export default Home;
