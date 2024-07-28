import { Skeleton } from "@chakra-ui/react";
import { ReactNode, useState } from "react";

interface UserFormData {
  children: ReactNode;
}

const UserForm: React.FC<UserFormData> = ({ children }) => {
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const handleImageLoaded = () => {
    setImageLoaded(true);
  };

  return (
    <Skeleton
      className="flex flex-1 justify-center items-center text-center"
      isLoaded={imageLoaded}
      fadeDuration={1}
    >
      <div className="flex flex-row justify-center items-center border-2 border-black max-h-2xl max-w-5xl rounded-xl overflow-hidden shadow-2xl">
        {children}
      </div>
    </Skeleton>
  );
};

export default UserForm;
