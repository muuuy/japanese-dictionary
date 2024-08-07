import { UserFormButton } from "./UserFormButton";
import { FormContainer } from "./FormContainer";
import { FormControl } from "@chakra-ui/react";
import { PasswordInput } from "./FormInputs/PasswordInput";
import { VerifyPasswordInput } from "./FormInputs/VerifyPasswordInput";
import { useState } from "react";
import { ResetData } from "../../interfaces";
import { Link } from "react-router-dom";

const ResetForm = () => {
  const [formData, setFormData] = useState<ResetData>({
    password: "",
    verifyPassword: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  const handleSubmit = () => {};

  return (
    <FormContainer>
      <h1 className="user-form--header my-4">RESET PASSWORD</h1>
      <FormControl className="text-center" isRequired>
        <PasswordInput
          handleInput={handleInput}
          password={formData.password}
          id="reset--password"
        />
        <VerifyPasswordInput
          handleInput={handleInput}
          verifyPassword={formData.verifyPassword}
          id="reset--verify-password"
        />
        <UserFormButton handleSubmit={handleSubmit} loading={loading} />
        <p className="italic font-semibold">
          Return to{" "}
          <Link to={"/login/"} className="text-violet-500 font-black">
            LOG IN
          </Link>
        </p>
      </FormControl>
    </FormContainer>
  );
};

export { ResetForm };
