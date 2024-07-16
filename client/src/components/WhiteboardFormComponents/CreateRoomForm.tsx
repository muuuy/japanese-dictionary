import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

import useUserStore from "../../stores/store";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";

interface Form {
  name: string;
  roomCode: string;
}

const CreateRoomForm = () => {
  const auth: boolean = useUserStore((state) => state.auth);
  const [error, setError] = useState<string>("");

  const [formData, setFormData] = useState<Form>({
    name: "",
    roomCode: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleGenerate = () => {
    if (auth) {
      if (error !== "") {
        setError("");
      }
      setFormData({ ...formData, roomCode: uuidv4() });
    } else setError("Not logged in.");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formData.roomCode);
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
        />
        <FormErrorMessage></FormErrorMessage>
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
        <Link
          to={"/whiteboard"}
          state={{ roomCode: formData.roomCode, connectionType: "create_room" }}
        >
          <Button minW="100%" colorScheme="red" mt={8}>
            <span className="font-black">GENERATE ROOM</span>
          </Button>
        </Link>
      </FormControl>
    </>
  );
};

export default CreateRoomForm;
