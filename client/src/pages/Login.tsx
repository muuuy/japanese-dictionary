import { useState } from "react";
import { BrowserRouter as Routes, Route, Link } from "react-router-dom";

import { FormControl, FormLabel, Button, Input } from "@chakra-ui/react";

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="flex flex-1 justify-center items-center text-center">
      <div className="flex flex-col w-96">
        <h1 className="user-form--header my-4">LOGIN</h1>
        <FormControl
          className="flex-col justify-center items-center text-center"
          isRequired
        >
          <FormLabel htmlFor="login--email">EMAIL</FormLabel>
          <Input
            id="login--email"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            onChange={handleInput}
            className="mb-4"
          />
          <FormLabel htmlFor="login--password">PASSWORD</FormLabel>
          <Input
            id="login--password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInput}
          />
          <p className="italic font-semibold my-4">
            Don't have an account?{" "}
            <Link to={"/signup/"} className="text-violet-500 font-black">
              SIGN UP
            </Link>
          </p>
          <Button colorScheme="teal">
            <span className="font-black">SUBMIT</span>
          </Button>
        </FormControl>
      </div>
    </div>
  );
};

export default Login;
