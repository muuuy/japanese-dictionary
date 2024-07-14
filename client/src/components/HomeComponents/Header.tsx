import HomePageImage2 from "../../assets/homepage_img2.jpg";
import LoginBanner from "../LoginBanner";

import { SkeletonData } from "../../interfaces";

const Header: React.FC<SkeletonData> = ({ imageLoaded, imagesLoaded }) => {
  return (
    <section className="flex flex-row h-3/5 w-full justify-center items-center">
      <div
        className={`flex flex-col flex-1 justify-center items-center text-center bg-white h-full -translate-x-full ${
          imagesLoaded ? "animate-slide-in-from-left" : ""
        }`}
      >
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
          <LoginBanner />
        </div>
      </div>
      <img
        src={HomePageImage2}
        onLoad={imageLoaded}
        className={`w-3/5 h-full object-cover -translate-y-full ${
          imagesLoaded ? "animate-slide-in-from-top" : ""
        }`}
      />
    </section>
  );
};

export default Header;
