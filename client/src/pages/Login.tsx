import { useState } from "react";
import { Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

import { ErrorBanner } from "../interfaces";
import useUserStore from "../stores/store";

import { FormControl, FormLabel, Button, Input } from "@chakra-ui/react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const authUser = useUserStore((state) => state.authUser);
  const navigate = useNavigate();

  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errorBanner, setErrorBanner] = useState<ErrorBanner>({
    show: false,
    text: "",
  });

  const [loading, setLoading] = useState<boolean>(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        authUser(data.flashcards);
        navigate("/");
      }
    } catch (err) {
      if (err instanceof AxiosError && err.response)
        setErrorBanner({ show: true, text: err.response.data.errors });

      setLoading(false);

      setTimeout(() => {
        setErrorBanner((prev) => ({ ...prev, show: false }));
      }, 10000);
    }
  };

  return (
    <div className="flex flex-1 justify-center items-center text-center">
      <div className="flex flex-col w-96">
        <h1 className="user-form--header my-4">LOGIN</h1>
        <FormControl className="text-center" isRequired>
          <FormLabel htmlFor="login--email">EMAIL</FormLabel>
          <Input
            id="login--email"
            name="email"
            type="email"
            placeholder="Email"
            autoComplete="email"
            minLength={2}
            maxLength={254}
            onChange={handleInput}
            className="mb-4"
            value={formData.email}
          />
          <FormLabel htmlFor="login--password">PASSWORD</FormLabel>
          <Input
            id="login--password"
            name="password"
            type="password"
            placeholder="Password"
            minLength={8}
            maxLength={32}
            onChange={handleInput}
            value={formData.password}
          />
          <p className="text-right">
            <Link
              to={"/forgot-password/"}
              className="text-violet-500 font-black italic font-bold text-xs"
            >
              Forgot password?
            </Link>
          </p>
          <Button
            colorScheme="red"
            className="mt-4 mb-2"
            type="submit"
            onClick={handleSubmit}
            isLoading={loading}
          >
            <span className="font-black">SUBMIT</span>
          </Button>
          <p className="italic font-semibold">
            Don't have an account?{" "}
            <Link to={"/signup/"} className="text-violet-500 font-black">
              SIGN UP
            </Link>
          </p>
        </FormControl>
      </div>
      {errorBanner.show && (
        <div className={clsx("absolute bottom-8 right-8", "animate-fade-out")}>
          <Alert status="error">
            <AlertIcon />
            <AlertTitle>Error logging in!</AlertTitle>
            <AlertDescription>{errorBanner.text}</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default Login;
