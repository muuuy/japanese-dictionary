import { useState } from "react";
import { FormContainer } from "./FormContainer";
import { FormControl } from "@chakra-ui/react";
import { UserFormButton } from "./UserFormButton";
import { Link } from "react-router-dom";
import { EmailInput } from "./FormInputs/EmailInput";
import { PasswordInput } from "./FormInputs/PasswordInput";
import { VerifyPasswordInput } from "./FormInputs/VerifyPasswordInput";
import { fetchInfo } from "../../util/handleSubmit";
import { checkErrors } from "../../util/checkErrors";
import { UserFormProps } from "../../interfaces";

interface SignupData {
  email: string;
  password: string;
  verifyPassword: string;
}

const SignupForm: React.FC<UserFormProps> = ({ addErrorBanner }) => {
  const [formData, setFormData] = useState<SignupData>({
    email: "",
    password: "",
    verifyPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const res = await fetchInfo({
        urlPath: "/users/signup",
        formData: formData,
      });

      checkErrors(res, "Error signing up!", addErrorBanner);

      if (res.ok) {
        setFormData({ email: "", password: "", verifyPassword: "" });
      } else {
        console.log("failure");
      }
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  return (
    <FormContainer>
      <h1 className="user-form--header my-4">SIGNUP</h1>
      <form onSubmit={handleSubmit}>
        <FormControl
          className="flex-col justify-center items-center"
          isRequired
        >
          <EmailInput
            handleInput={handleInput}
            email={formData.email}
            id="signup--email"
          />
          <PasswordInput
            handleInput={handleInput}
            password={formData.password}
            id="signup--password"
          />
          <VerifyPasswordInput
            handleInput={handleInput}
            verifyPassword={formData.verifyPassword}
            id="signup--verify-password"
          />
          <p className="italic font-semibold my-4">
            Already have an account?{" "}
            <Link to={"/login/"} className="text-violet-500 font-black">
              LOGIN
            </Link>
          </p>
          <UserFormButton handleSubmit={handleSubmit} loading={loading} />
        </FormControl>
      </form>
    </FormContainer>
  );
};

export { SignupForm };
