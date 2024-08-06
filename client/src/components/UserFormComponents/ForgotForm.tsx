import { UserFormButton } from "./UserFormButton";
import { EmailInput } from "./FormInputs/EmailInput";
import { Link } from "react-router-dom";
import { FormControl } from "@chakra-ui/react";
import { FormContainer } from "./FormContainer";
import { useState } from "react";
import { fetchInfo } from "../../util/handleSubmit";
import { UserFormProps } from "../../interfaces";
import { checkErrors } from "../../util/checkErrors";

const ForgotForm: React.FC<UserFormProps> = ({ addErrorBanner }) => {
  const [formData, setFormData] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormData(event.target.value);
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
        urlPath: "/users/forgot-password",
        formData: { email: formData },
      });

      checkErrors(res, "Error resetting password!", addErrorBanner);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <FormContainer>
      <h1 className="user-form--header my-4">FORGOT PASSWORD</h1>
      <form onSubmit={handleSubmit}>
        <FormControl>
          <EmailInput
            handleInput={handleInput}
            email={formData}
            id="forgot--email"
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

export { ForgotForm };
