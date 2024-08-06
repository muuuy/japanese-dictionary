import { useState } from "react";
import { UserFormContainer } from "../components/UserFormComponents/UserFormContainer";
import { ForgotForm } from "../components/UserFormComponents/ForgotForm";
import { ErrorBannerData } from "../interfaces";
import { Skeleton } from "@chakra-ui/react";
import { Errors } from "../components/Errors/Errors";
import ForgotImage from "../assets/forgot_image.jpg";

const ForgotPassword = () => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [errorBanners, setErrorBanners] = useState<ErrorBannerData[]>([]);

  const addErrorBanner = (title: string, description: string) => {
    setErrorBanners((prev) => [
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
        <ForgotForm addErrorBanner={addErrorBanner} />
        <img
          src={ForgotImage}
          className="user-form--image"
          onLoad={handleImageLoaded}
        />
      </UserFormContainer>
      <Errors errorBanners={errorBanners} />
    </Skeleton>
  );
};

export default ForgotPassword;
