import { LoginFormData } from "../../interfaces";
import { useState } from "react";
import { FormContainer } from "./FormContainer";
import { useNavigate } from "react-router-dom";
import { fetchQueryInfo } from "../../util/handleSubmit";
import { useMutation } from "@tanstack/react-query";
import { FormControl } from "@chakra-ui/react";
import { EmailInput } from "./FormInputs/EmailInput";
import { PasswordInput } from "./FormInputs/PasswordInput";
import { Link } from "react-router-dom";
import { UserFormButton } from "./UserFormButton";
import { FetchData, FetchInfoResponse } from "../../interfaces";
import { UserFormProps } from "../../interfaces";
import useUserStore from "../../stores/store";

const LoginForm: React.FC<UserFormProps> = ({ addErrorBanner }) => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const authUser = useUserStore((state) => state.authUser);
  const navigate = useNavigate();

  const mutation = useMutation<FetchInfoResponse, Error, FetchData>({
    mutationFn: (info: FetchData) => fetchQueryInfo(info),

    onSuccess: (data) => {
      console.log("Login succesful:", data);
      authUser(data.flashcards);
      navigate("/");
    },

    onError: (error) => {
      addErrorBanner("Error logging in!", error.message);
    },
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (
    event:
      | React.FormEvent<HTMLFormElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    setLoading(true);

    mutation.mutate({ urlPath: "/users/login", formData: formData });

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
