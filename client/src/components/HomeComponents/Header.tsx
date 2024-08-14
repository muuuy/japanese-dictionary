import HomePageImage2 from "../../assets/homepage_img2.jpg";
import { LoginBanner } from "../LoginBanner";
import { SkeletonData } from "../../interfaces";
import Typewriter from "../Typewriter";
import useUserStore from "../../stores/store";
import clsx from "clsx";

const Header: React.FC<SkeletonData> = ({ imageLoaded, imagesLoaded }) => {
  const auth = useUserStore((state) => state.auth);

  return (
    <section className="flex flex-row h-3/5 w-full justify-center items-center">
      <div
        className={`flex flex-col flex-1 justify-center items-center text-center bg-beige h-full -translate-x-full ${
          imagesLoaded ? "animate-slide-in-from-left" : ""
        }`}
      >
        <h1 className="font-black">
          <span className={clsx("lg:text-4xl", "sm:text-2xl")}>
            STUDY AND LEARN
          </span>
          <br />
          <span
            className={clsx(
              "text-red-600",
              "sm:text-5xl md:text-6xl lg:text-7xl"
            )}
          >
            JAPANESE
          </span>
        </h1>
        <h2
          className={clsx(
            "font-bold py-4 text-wrap p-2",
            "sm:text-xs md:text-base lg:text-base"
          )}
        >
          Explore and enhance your Japanese language skills by yourself or with
          friends!
        </h2>
        <div className="flex flex-row gap-8 w-[400px] justify-center relative">
          {auth ? (
            <div className="flex flex-col justify-center gap-4 absolute top-20">
              <h3
                className={clsx(
                  "font-black italic underline",
                  "lg:text-4xl, sm:text-2xl"
                )}
              >
                WELCOME BACK!
              </h3>
              <div>
                <Typewriter
                  text="日本語を勉強しよう！"
                  speed={200}
                  style="font-semibold italic text-red-600 text-2xl"
                />
              </div>
            </div>
          ) : (
            <LoginBanner />
          )}
        </div>
      </div>
      <img
        src={HomePageImage2}
        onLoad={imageLoaded}
        className={clsx(
          `w-3/5 h-full object-cover -translate-y-full ${
            imagesLoaded ? "animate-slide-in-from-top" : ""
          }`,
          "sm:w-2/5 md:w-1/2 lg:w-3/5"
        )}
      />
    </section>
  );
};

export default Header;
