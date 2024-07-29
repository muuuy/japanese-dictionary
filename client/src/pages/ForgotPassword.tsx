import { useState } from "react";
import { Link } from "react-router-dom";
import { FormControl, FormLabel, Button, Input } from "@chakra-ui/react";
import ForgotImage from "../assets/forgot_image.jpg";
import EmailInput from "../components/UserFormComponents/EmailInput";
import UserFormButton from "../components/UserFormComponents/UserFormButton";

const ForgotPassword = () => {
  const [formData, setFormData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormData(event.target.value);
  };

  const handleSubmit = () => {};

  return (
    <div className="page--container">
      <div className="user-form--container">
        <div className="user-form--form-container">
          <h1 className="user-form--header my-4">FORGOT PASSWORD</h1>
          <FormControl className="text-center" isRequired>
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
        </div>
        <img src={ForgotImage} className="user-form--image" />
      </div>
    </div>
  );
};

export default ForgotPassword;
