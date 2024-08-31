import HomePageImage2 from "../../assets/homepage_img2.jpg";
import { LoginBanner } from "../LoginBanner";
import { SkeletonData } from "../../interfaces";
import { HomeTypewriter } from "./HomeTypewriter";
import useUserStore from "../../stores/store";
import clsx from "clsx";

const Header: React.FC<SkeletonData> = ({ imageLoaded, imagesLoaded }) => {
  const auth = useUserStore((state) => state.auth);

  return (
    <section
      className={clsx(
        "flex flex-col h-full w-full justify-center items-center",
        "sm:flex-row sm:h-3/5"
      )}
    >
      <div
        className={clsx(
          `flex flex-col flex-1 justify-center items-center text-center bg-beige h-full -translate-x-full order-2 ${
            imagesLoaded ? "animate-slide-in-from-left" : ""
          }`,
          "sm:order-1"
        )}
      >
        <div
          className={clsx(
            "bg-white p-8 rounded-lg shadow-custom-dark w-11/12 h-5/6 flex flex-col items-center justify-center",
            "sm:h-auto 2xl:w-auto"
          )}
        >
          <h1 className="font-black">
            <span className={clsx("text-base", "sm:text-2xl lg:text-4xl")}>
              STUDY AND LEARN
            </span>
            <br />
            <span
              className={clsx(
                "text-3xl text-red-600",
                "sm:text-4xl md:text-5xl lg:text-6xl"
              )}
            >
              JAPANESE
            </span>
          </h1>
          <h2
            className={clsx(
              "font-bold py-4 text-wrap p-2 text-xs",
              "sm:text-xs md:text-base lg:text-base"
            )}
          >
            Explore and enhance your Japanese language skills by yourself or
            with friends!
          </h2>
          <div
            className={clsx(
              "flex text-nowrap justify-center relative",
              "sm:gap-8"
            )}
          >
            {auth ? (
              <div
                className={clsx(
                  "flex flex-row justify-center items-center gap-4",
                  "sm:top-20 sm:absolute sm:flex-col"
                )}
              >
                <h3
                  className={clsx(
                    "font-black text-base italic",
                    "sm:text-2xl sm:underline",
                    "lg:text-4xl"
                  )}
                >
                  WELCOME BACK!
                </h3>
                <div>
                  <HomeTypewriter text="日本語を勉強しよう" speed={200} />
                </div>
              </div>
            ) : (
              <LoginBanner />
            )}
          </div>
        </div>
      </div>
      <img
        src={HomePageImage2}
        onLoad={imageLoaded}
        className={clsx(
          `w-full h-1/2 object-cover -translate-y-full order-1 ${
            imagesLoaded ? "animate-slide-in-from-top" : ""
          }`,
          "sm:w-2/5 sm:h-full sm:order-2",
          "md:w-1/2 lg:w-3/5"
        )}
      />
    </section>
  );
};

export default Header;
