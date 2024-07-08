import { useState } from "react";

import Functionality from "../components/HomeComponents/Functionality";
import Header from "../components/HomeComponents/Header";

const Home = () => {
  const [imageOneLoaded, setImageOneLoaded] = useState<boolean>(false);
  const [imageTwoLoaded, setImageTwoLoaded] = useState<boolean>(false);

  const imagesLoaded = true;

  const handleImageOne = () => {
    setImageOneLoaded(true);
  };

  const handleImageTwo = () => {
    setImageTwoLoaded(true);
  };

  return (
    <div className="flex flex-1 flex-col max-h-screen w-full bg-black overflow-hidden">
      <Header imageLoaded={handleImageOne} imagesLoaded={imagesLoaded} />
      <Functionality imageLoaded={handleImageTwo} imagesLoaded={imagesLoaded} />
    </div>
  );
};

export default Home;
