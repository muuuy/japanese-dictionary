import { Button } from "@chakra-ui/react";
import LoginPromptImage from "../assets/login_prompt.jpg";

const LoginPrompt = () => {
  return (
    <div className="flex flex-1  justify-center items-center">
      <div className="flex flex-row max-h-96 max-w-4xl border-black border-2 overflow-hidden ">
        <div className="flex flex-col w-1/2 justify-center items-center">
          <h1 className="font-black text-5xl italic">LOGIN / SIGNUP</h1>
          <h2 className="font-semibold text-xl">
            Login or signup in order to access this content!
          </h2>
          <div className="flex flex-row gap-4 mt-4">
            <Button colorScheme="red">
              <span className="font-black">LOGIN</span>
            </Button>
            <Button colorScheme="red" variant={"outline"}>
              <span className="font-black">SIGN UP</span>
            </Button>
          </div>
        </div>
        <img
          src={LoginPromptImage}
          className="object-cover border-green-500 border-2 w-1/2"
        />
      </div>
    </div>
  );
};

export default LoginPrompt;
