import { UserFormButton } from "./UserFormButton";
import { FormContainer } from "./FormContainer";
import { FormControl } from "@chakra-ui/react";
import { PasswordInput } from "./FormInputs/PasswordInput";
import { VerifyPasswordInput } from "./FormInputs/VerifyPasswordInput";
import { useState } from "react";
import { ResetFormData } from "../../interfaces";
import { Link } from "react-router-dom";
import { fetchInfo } from "../../util/handleSubmit";
import { checkErrors } from "../../util/checkErrors";

interface ResetFormProps {
  token: string;
  addErrorBanner: (title: string, description: string, link?: string) => void;
}

const ResetForm: React.FC<ResetFormProps> = ({ token, addErrorBanner }) => {
  const [formData, setFormData] = useState<ResetFormData>({
    password: "",
    verifyPassword: "",
    token: token,
  });
  const [loading, setLoading] = useState<boolean>(false);

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

    try {
      const res = await fetchInfo({
        urlPath: `/users/reset-password`,
        formData: formData,
      });

      checkErrors(res, "Error resetting password!", addErrorBanner);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <FormContainer>
      <h1 className="user-form--header my-4">RESET PASSWORD</h1>
      <form onSubmit={handleSubmit}>
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
      </form>
    </FormContainer>
  );
};

export { ResetForm };
