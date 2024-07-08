import { useState } from "react";

import { Skeleton } from "@chakra-ui/react";

import Functionality from "../components/HomeComponents/Functionality";
import Header from "../components/HomeComponents/Header";

const Home = () => {
  const [imageOneLoaded, setImageOneLoaded] = useState<boolean>(false);
  const [imageTwoLoaded, setImageTwoLoaded] = useState<boolean>(false);

  const imagesLoaded = imageOneLoaded && imageTwoLoaded;

  const handleImageOne = () => {
    setImageOneLoaded(true);
  };

  const handleImageTwo = () => {
    setImageTwoLoaded(true);
  };

  return (
    <Skeleton
      isLoaded={imagesLoaded}
      startColor="black"
      className="flex flex-1 flex-col max-h-screen w-full bg-black overflow-hidden"
    >
      <Header imageLoaded={handleImageOne} imagesLoaded={imagesLoaded} />
      <Functionality imageLoaded={handleImageTwo} imagesLoaded={imagesLoaded} />
    </Skeleton>
  );
};

export default Home;
