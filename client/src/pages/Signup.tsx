import { useState } from "react";

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

  return (
    <div className="flex flex-col flex-1 justify-center items-center text-center">
      <h1 className="user-form--header">SIGNUP</h1>
      <FormControl
        className="flex-col justify-center items-center gap-4"
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
        />
        <FormLabel htmlFor="signup--password">PASSWORD</FormLabel>
        <Input
          id="signup--password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleInput}
        />
        <FormLabel htmlFor="signup--verify-password">VERIFY PASSWORD</FormLabel>
        <Input
          id="signup--verify-password"
          name="verify-password"
          type="password"
          placeholder="Password"
          onChange={handleInput}
        />
        <Button>SUBMIT</Button>
      </FormControl>
    </div>
  );
};

export default Signup;
