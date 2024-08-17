import { useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@chakra-ui/react";
import { UserFormContainer } from "../components/UserRegistrationComponents/UserFormContainer";
import { ResetForm } from "../components/UserRegistrationComponents/ResetForm";
import ResetPasswordImage from "../assets/reset_password.jpg";
import { ErrorBannerData } from "../interfaces";
import { Errors } from "../components/Errors/Errors";

const ResetPassword = () => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const { token } = useParams<{ token: string }>();
  const [errorBanners, setErrorBanners] = useState<ErrorBannerData[]>([]);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  const addErrorBanner = (title: string, description: string) => {
    setErrorBanners((prev) => [
      ...prev,
      { title: title, description: description },
    ]);
  };

  return (
    <>
      {token !== undefined ? (
        <Skeleton
          className="page--container"
          fadeDuration={1}
          isLoaded={imageLoaded}
        >
          <UserFormContainer>
            <ResetForm token={token} addErrorBanner={addErrorBanner} />
            <img
              src={ResetPasswordImage}
              className="user-form--image"
              onLoad={handleImageLoaded}
            />
          </UserFormContainer>
          <Errors errorBanners={errorBanners} />
        </Skeleton>
      ) : (
        <div className="flex-1">
          <p className="font-black font-2xl text-black">No token</p>
          <p>AHHHHHHHHHHHHHHHHHHH</p>
        </div>
      )}
    </>
  );
};

export { ResetPassword };
