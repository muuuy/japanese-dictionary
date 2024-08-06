import { LoginFormData, ErrorBannerData } from "../../interfaces";
import { useState, useEffect } from "react";
import { FormContainer } from "./FormContainer";
import { useNavigate } from "react-router-dom";
import { fetchInfo } from "../../util/handleSubmit";
import { useMutation } from "@tanstack/react-query";
import { FormControl } from "@chakra-ui/react";
import { EmailInput } from "./FormInputs/EmailInput";
import { PasswordInput } from "./FormInputs/PasswordInput";
import { Link } from "react-router-dom";
import { UserFormButton } from "./UserFormButton";
import useUserStore from "../../stores/store";

const LoginForm = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const authUser = useUserStore((state) => state.authUser);
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => fetchInfo("/users/login", formData),
    onSuccess: (data) => {
      console.log("Login succesful:", data);
      // authUser(data.flashcards);
    },
    onError: (error) => {
      console.log("Login ERROR", error);
    },
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    mutation.mutate();

    console.log(mutation);

    // try {
    //   const res = await fetch("http://localhost:3000/users/login", {
    //     method: "POST",
    //     credentials: "include",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });

    //   const response = await res.json();

    //   if (res.ok) {
    //     authUser(response.flashcards);
    //     // navigate("/");
    //   } else {
    //     console.log("error");
    //   }
    // } catch (err) {
    //   console.log(err);
    // }

    setLoading(false);
  };

  return (
    <FormContainer>
      <h1 className="user-form--header">LOGIN</h1>
      <p className="mb-4 italic">Welcome back! Sign in to start studying!</p>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <EmailInput
            handleInput={handleInput}
            email={formData.email}
            id="login--email"
          />
          <PasswordInput
            handleInput={handleInput}
            password={formData.password}
            id="login--password"
          />
          <p className="text-right">
            <Link
              to={"/forgot-password/"}
              className="text-red-500 font-black italic font-bold text-xs hover:text-red-700"
            >
              Forgot password?
            </Link>
          </p>
          <UserFormButton handleSubmit={handleSubmit} loading={loading} />
          <p className="italic font-semibold text-sm">
            Don't have an account?{" "}
            <Link
              to={"/signup/"}
              className="text-red-500 font-black hover:text-red-700"
            >
              SIGN UP
            </Link>
          </p>
        </FormControl>
      </form>
    </FormContainer>
  );
};

export { LoginForm };
