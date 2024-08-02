import { useState } from "react";
import { FormContainer } from "./FormContainer";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import UserFormButton from "./UserFormButton";
import { handleSubmit } from "../../util/handleSubmit";
import { Link } from "react-router-dom";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import { VerifyPasswordInput } from "./VerifyPasswordInput";

interface SignupData {
  email: string;
  password: string;
  verifyPassword: string;
}

const SignupForm = () => {
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
    try {
      const res = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 200) {
        setFormData({ email: "", password: "", verifyPassword: "" });
      } else {
        console.log("failure");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <FormContainer>
      <h1 className="user-form--header my-4">SIGNUP</h1>
      <FormControl className="flex-col justify-center items-center" isRequired>
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
    </FormContainer>
  );
};

export { SignupForm };
