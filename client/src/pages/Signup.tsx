import { useState } from "react";
import { Skeleton } from "@chakra-ui/react";
import { UserFormContainer } from "../components/UserFormComponents/UserFormContainer";
import { SignupForm } from "../components/UserFormComponents/SignupForm";
import { ErrorBannerData } from "../interfaces";
import { Errors } from "../components/Errors/Errors";
import SignupImage from "../assets/signup_image.jpg";

const Signup = () => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [errorBanners, setErrorBanner] = useState<ErrorBannerData[]>([]);

  const addErrorBanner = (title: string, description: string) => {
    setErrorBanner((prev) => [
      ...prev,
      { title: title, description: description },
    ]);
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
        <SignupForm addErrorBanner={addErrorBanner} />
        <img
          src={SignupImage}
          className="user-form--image"
          onLoad={handleImageLoaded}
          alt="Stairway to Japanese temple."
          loading="lazy"
        />
      </UserFormContainer>
      <Errors errorBanners={errorBanners} />
    </Skeleton>
  );
};

export { Signup };
