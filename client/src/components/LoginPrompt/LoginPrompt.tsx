import { LoginTypewriter } from "./LoginTypewriter";
import { LoginBanner } from "../LoginBanner";
import { LoginPromptData } from "./LoginPromptInterfaces";
import clsx from "clsx";

const LoginPromt: React.FC<LoginPromptData> = ({ title }) => {
  return (
    <div
      className={clsx(
        `flex flex-col items-center p-8 h-80 border-black border-4 rounded-xl bg-white shadow-2xl relative`,
        "animate-login-prompt--fade-in"
      )}
    >
      <h1 className="page--header">{title}</h1>
      <div className="flex flex-col text-center my-8 gap-2">
        <h2 className="text-2xl font-bold">
          Please log in or sign up to proceed further.
        </h2>
        <LoginTypewriter
          text="ありがとうございます"
          speed={100}
          fontWeight="semibold"
        />
      </div>
      <div className="absolute bottom-12">
        <LoginBanner />
      </div>
    </div>
  );
};

export { LoginPromt };
