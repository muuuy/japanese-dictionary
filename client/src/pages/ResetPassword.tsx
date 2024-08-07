import { useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@chakra-ui/react";
import { UserFormContainer } from "../components/UserFormComponents/UserFormContainer";
import { ResetForm } from "../components/UserFormComponents/ResetForm";
import ResetPasswordImage from "../assets/reset_password.jpg";

const ResetPassword = () => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const token = useParams().token;

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
        <ResetForm />
        <img
          src={ResetPasswordImage}
          className="user-form--image"
          onLoad={handleImageLoaded}
        />
      </UserFormContainer>
    </Skeleton>
  );
};

export default ResetPassword;
