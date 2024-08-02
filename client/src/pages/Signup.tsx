import { useState } from "react";
import { Skeleton } from "@chakra-ui/react";
import { UserFormContainer } from "../components/UserFormComponents/UserFormContainer";
import { SignupForm } from "../components/UserFormComponents/SignupForm";
import SignupImage from "../assets/signup_image.jpg";

const Signup = () => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

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
        <SignupForm />
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
