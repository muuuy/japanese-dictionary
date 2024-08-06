import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FormControl } from "@chakra-ui/react";
import { EmailInput } from "../components/UserFormComponents/FormInputs/EmailInput";
import { UserFormButton } from "../components/UserFormComponents/UserFormButton";
import { fetchInfo } from "../util/handleSubmit";
import ForgotImage from "../assets/forgot_image.jpg";
import { UserFormContainer } from "../components/UserFormComponents/UserFormContainer";
import { ForgotForm } from "../components/UserFormComponents/ForgotForm";
import { ErrorBannerData } from "../interfaces";
import { Skeleton } from "@chakra-ui/react";

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
    </Skeleton>
  );
};

export default ForgotPassword;
