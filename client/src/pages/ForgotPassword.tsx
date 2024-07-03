import { useState } from "react";
import { BrowserRouter as Routes, Route, Link } from "react-router-dom";

import { FormControl, FormLabel, Button, Input } from "@chakra-ui/react";

interface ForgotPasswordData {
  email: string;
}

const ForgotPassword = () => {
  const [formData, setFormData] = useState<ForgotPasswordData>({
    email: "",
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="flex flex-1 justify-center items-center text-center">
      <div className="flex flex-col w-96">
        <h1 className="user-form--header my-4">FORGOT PASSWORD</h1>
        <FormControl className="text-center" isRequired>
          <FormLabel htmlFor="forgot--email">EMAIL</FormLabel>
          <Input
            id="forgot--email"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            onChange={handleInput}
            className="mb-4"
          />
          <Button colorScheme="teal" className="mt-4 mb-2">
            <span className="font-black">SUBMIT</span>
          </Button>
          <p className="italic font-semibold">
            Return to{" "}
            <Link to={"/login/"} className="text-violet-500 font-black">
              LOG IN
            </Link>
          </p>
        </FormControl>
      </div>
    </div>
  );
};

export default ForgotPassword;
