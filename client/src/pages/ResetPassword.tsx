import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FormControl, FormLabel, Button, Input } from "@chakra-ui/react";
import ResetPasswordImage from "../assets/reset_password.jpg";

interface ResetData {
  password: string;
}

const ResetPassword = () => {
  const [formData, setFormData] = useState<ResetData>({
    password: "",
  });
  const token = useParams().token;

  console.log(token);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div className="page--container">
      <div className="user-form--container">
        <div className="user-form--form-container">
          <h1 className="user-form--header my-4">FORGOT PASSWORD</h1>
          <FormControl className="text-center" isRequired>
            <FormLabel htmlFor="reset--password">NEW PASSWORD</FormLabel>
            <Input
              id="reset--password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleInput}
            />
            <FormLabel htmlFor="reset--verify-password">
              VERIFY NEW PASSWORD
            </FormLabel>
            <Input
              id="reset--verify-password"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleInput}
            />
            <Button colorScheme="red" className="mt-4 mb-2">
              <span className="font-black">SUBMIT</span>
            </Button>
            <p className="italic font-semibold">
              Return to{" "}
              <Link to={"/login/"} className="text-violet-500 font-black">
                LOG IN
              </Link>
            </p>
          </FormControl>
        </div>
        <img src={ResetPasswordImage} className="user-form--image" />
      </div>
    </div>
  );
};

export default ResetPassword;
