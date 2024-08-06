import { useEffect, useState } from "react";
import { ErrorBannerData } from "../interfaces";
import { Errors } from "../components/Errors/Errors";
import { Skeleton } from "@chakra-ui/react";
import { LoginForm } from "../components/UserFormComponents/LoginForm";
import { UserFormContainer } from "../components/UserFormComponents/UserFormContainer";
import LoginImage from "../assets/login_image.jpg";

const Login = () => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [errorBanners, setErrorBanners] = useState<ErrorBannerData[]>([]);

  useEffect(() => {
    if (errorBanners.length > 0) {
      const timer = setTimeout(
        () => setErrorBanners((prev) => prev.slice(1)),
        5000
      );

      return () => clearTimeout(timer);
    }
  }, [errorBanners]);

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
      isLoaded={imageLoaded}
      fadeDuration={1}
    >
      <UserFormContainer>
        <LoginForm addErrorBanner={addErrorBanner} />
        <img
          src={LoginImage}
          className="user-form--image"
          onLoad={handleImageLoaded}
          alt="Osaka's Dotonbori"
          loading="lazy"
        />
      </UserFormContainer>
      <Errors errorBanners={errorBanners} />
    </Skeleton>
  );
};

export default Login;
