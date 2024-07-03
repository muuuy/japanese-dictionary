import { useState } from "react";

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
    <div className="flex flex-col flex-1 justify-center items-center text-center">
      <h1 className="user-form--header">LOGIN</h1>
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
        />
        <FormLabel htmlFor="login--password">PASSWORD</FormLabel>
        <Input
          id="login--password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleInput}
        />
        <Button>SUBMIT</Button>
      </FormControl>
    </div>
  );
};

export default Login;
