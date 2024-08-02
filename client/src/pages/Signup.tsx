import { useState } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@chakra-ui/react";
import { FormControl, FormLabel, Button, Input } from "@chakra-ui/react";
import SignupImage from "../assets/signup_image.jpg";
import axios from "axios";
import { UserFormContainer } from "../components/UserFormComponents/UserFormContainer";
import { FormContainer } from "../components/UserFormComponents/FormContainer";

interface SignupData {
  email: string;
  password: string;
  verifyPassword: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<SignupData>({
    email: "",
    password: "",
    verifyPassword: "",
  });
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    const res = await axios.post(
      "http://localhost:3000/users/signup",
      formData,
      { withCredentials: true }
    );
    if (res.status === 200) {
      setFormData({ email: "", password: "", verifyPassword: "" });
    } else {
      console.log("failure");
    }
  };

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  return (
    <Skeleton
      className="page--container"
      fadeDuration={1}
      isLoaded={imageLoaded}
    >
      <UserFormContainer>
        <FormContainer>
          <h1 className="user-form--header my-4">SIGNUP</h1>
          <FormControl
            className="flex-col justify-center items-center"
            isRequired
          >
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
            <FormLabel htmlFor="signup--verify-password">
              VERIFY PASSWORD
            </FormLabel>
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
            <Button colorScheme="red" onClick={handleSubmit}>
              <span className="font-black">SUBMIT</span>
            </Button>
          </FormControl>
        </FormContainer>
        <img
          src={SignupImage}
          className="user-form--image"
          onLoad={handleImageLoaded}
          alt="Stairway to Japanese temple."
          loading="lazy"
        />
      </UserFormContainer>
    </Skeleton>
  );
};

export default Signup;
