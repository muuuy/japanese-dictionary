import { useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "@chakra-ui/react";
import { UserFormContainer } from "../components/UserFormComponents/UserFormContainer";
import { ResetForm } from "../components/UserFormComponents/ResetForm";
import ResetPasswordImage from "../assets/reset_password.jpg";

const ResetPassword = () => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const { token } = useParams<{ token: string }>();

  const handleImageLoaded = () => {
    setImageLoaded(true);
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
            <ResetForm token={token} />
            <img
              src={ResetPasswordImage}
              className="user-form--image"
              onLoad={handleImageLoaded}
            />
          </UserFormContainer>
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

export default ResetPassword;
