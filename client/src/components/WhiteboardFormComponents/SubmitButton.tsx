import useUserStore from "../../stores/store";
import { FormData } from "../../interfaces";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";

interface SubmitButtonData {
  formData: FormData;
  addErrorBanner: (title: string, description: string, link?: string) => void;
}

const SubmitButton: React.FC<SubmitButtonData> = ({
  formData,
  addErrorBanner,
}) => {
  const auth = useUserStore((state) => state.auth);

  return (
    <>
      {auth ? (
        formData.roomCode && formData.name ? (
          <Link
            to={"/whiteboard"}
            state={{
              roomCode: formData.roomCode,
              connectionType: "create_room",
              name: formData.name,
            }}
          >
            <Button minW="100%" colorScheme="red" mt={8}>
              <span className="font-black">GENERATE ROOM</span>
            </Button>
          </Link>
        ) : (
          <Button minW="100%" colorScheme="red" mt={8}>
            <span className="font-black">GENERATE ROOM</span>
          </Button>
        )
      ) : (
        <Button
          minW="100%"
          colorScheme="red"
          mt={8}
          onClick={() =>
            addErrorBanner(
              "Not logged in!",
              `Log in `,
              "http://localhost:5173/login"
            )
          }
        >
          <span className="font-black">GENERATE ROOM</span>
        </Button>
      )}
    </>
  );
};

export default SubmitButton;
