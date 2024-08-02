import { FormContainer } from "./FormContainer";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import UserFormButton from "./UserFormButton";
import { handleSubmit } from "../../util/handleSubmit";
import { Link } from "react-router-dom";

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

  const handleInput = (event: React.ChangeEvent) => {

  }

  return (
    <FormContainer>
      <h1 className="user-form--header my-4">SIGNUP</h1>
      <FormControl className="flex-col justify-center items-center" isRequired>
        <FormLabel htmlFor="signup--email">EMAIL</FormLabel>
        <Input
          id="signup--email"
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
        <FormLabel htmlFor="signup--password">PASSWORD</FormLabel>
        <Input
          id="signup--password"
          name="password"
          type="password"
          placeholder="Password"
          minLength={8}
          maxLength={32}
          onChange={handleInput}
          className="mb-4"
          value={formData.password}
        />
        <FormLabel htmlFor="signup--verify-password">VERIFY PASSWORD</FormLabel>
        <Input
          id="signup--verify-password"
          name="verifyPassword"
          type="password"
          minLength={8}
          maxLength={32}
          placeholder="Password"
          onChange={handleInput}
          value={formData.verifyPassword}
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
