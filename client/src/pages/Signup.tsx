import { useState } from "react";
import { BrowserRouter as Routes, Route, Link } from "react-router-dom";
import axios from "axios";

import { FormControl, FormLabel, Button, Input } from "@chakra-ui/react";

interface SignupData {
  email: string;
  password: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<SignupData>({
    email: "",
    password: "",
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    const res = await axios.get("http://localhost:3000/");
    if (res.status === 200) {
      console.log("success");
    } else {
      console.log("failure");
    }
  };

  return (
    <div className="flex flex-1 justify-center items-center text-center">
      <div className="flex flex-col w-96">
        <h1 className="user-form--header my-4">SIGNUP</h1>
        <FormControl
          className="flex-col justify-center items-center"
          isRequired
        >
          <FormLabel htmlFor="signup--email">EMAIL</FormLabel>
          <Input
            id="signup--email"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            onChange={handleInput}
            className="mb-4"
          />
          <FormLabel htmlFor="signup--password">PASSWORD</FormLabel>
          <Input
            id="signup--password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInput}
            className="mb-4"
          />
          <FormLabel htmlFor="signup--verify-password">
            VERIFY PASSWORD
          </FormLabel>
          <Input
            id="signup--verify-password"
            name="verify-password"
            type="password"
            placeholder="Password"
            onChange={handleInput}
          />
          <p className="italic font-semibold my-4">
            Already have an account?{" "}
            <Link to={"/login/"} className="text-violet-500 font-black">
              LOGIN
            </Link>
          </p>
          <Button colorScheme="teal" onClick={handleSubmit}>
            <span className="font-black">SUBMIT</span>
          </Button>
        </FormControl>
      </div>
    </div>
  );
};

export default Signup;
