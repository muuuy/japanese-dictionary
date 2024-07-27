import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import useUserStore from "../../stores/store";
import Errors from "../Errors/Errors";
import { ErrorBannerData } from "../../interfaces";

interface Form {
  name: string;
  roomCode: string;
}

const CreateRoomForm = () => {
  const [errorBanners, setErrorBanners] = useState<ErrorBannerData[]>([]);
  const [formData, setFormData] = useState<Form>({
    name: "",
    roomCode: "",
  });
  const auth = useUserStore((state) => state.auth);

  useEffect(() => {
    if (errorBanners.length > 0) {
      const timer = setTimeout(
        () => setErrorBanners((prev) => prev.slice(1)),
        5000
      );

      return () => clearTimeout(timer);
    }
  }, [errorBanners]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleGenerate = () => {
    setFormData({ ...formData, roomCode: uuidv4() });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formData.roomCode);
  };

  const addErrorBanner = (title: string, description: string) => {
    setErrorBanners((prev) => [
      ...prev,
      { title: title, description: description },
    ]);
  };

  return (
    <>
      <FormControl maxW="60%" isRequired>
        <FormLabel>NAME</FormLabel>
        <Input
          name="name"
          placeholder="Enter your FULL name"
          type="text"
          autoComplete="true"
          mb={4}
          onChange={handleChange}
          focusBorderColor="black"
          isRequired
        />
      </FormControl>
      <FormControl maxW="60%" isRequired>
        <FormLabel>ROOM CODE</FormLabel>
        <div className="flex flex-row gap-2">
          <Input
            name="roomCode"
            placeholder="Generate room code"
            type="text"
            onChange={handleChange}
            focusBorderColor="black"
            value={formData.roomCode}
            isRequired
          />
          <ButtonGroup spacing={0}>
            <Button colorScheme="red" rounded="none" onClick={handleGenerate}>
              GENERATE
            </Button>
            <Button
              colorScheme="red"
              variant="outline"
              rounded="none"
              onClick={handleCopy}
            >
              COPY
            </Button>
          </ButtonGroup>
        </div>

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
                `Log in here: <a href="http://localhost:5173/login">http://localhost:5173/login</a>`
              )
            }
          >
            <span className="font-black">GENERATE ROOM</span>
          </Button>
        )}
      </FormControl>
      <Errors errorBanners={errorBanners} />
    </>
  );
};

export default CreateRoomForm;
