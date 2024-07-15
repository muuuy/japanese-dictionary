import { useState } from "react";
import { Link } from "react-router-dom";

import { FormControl, FormLabel, Button, Input } from "@chakra-ui/react";

interface ResetData {
  password: string;
}

const ResetPassword = () => {
  const [formData, setFormData] = useState<ResetData>({
    password: "",
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
          <FormLabel htmlFor="reset--password">NEW PASSWORD</FormLabel>
          <Input
            id="reset--password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInput}
          />
          <FormLabel htmlFor="reset--verify-password">
            VERIFY NEW PASSWORD
          </FormLabel>
          <Input
            id="reset--verify-password"
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleInput}
          />
          <Button colorScheme="red" className="mt-4 mb-2">
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

export default ResetPassword;
