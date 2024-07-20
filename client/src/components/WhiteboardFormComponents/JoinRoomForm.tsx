import React, { useState } from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const JoinRoomForm = () => {
  interface Form {
    name: string;
    roomCode: string;
  }

  const [formData, setFormData] = useState<Form>({
    name: "",
    roomCode: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <>
      <FormControl maxW="60%" isRequired>
        <FormLabel>NAME</FormLabel>
        <Input
          name="name"
          placeholder="Enter your FULL name"
          type="text"
          mb={4}
          autoComplete="true"
          onChange={handleChange}
          focusBorderColor="black"
        />
      </FormControl>
      <FormControl maxW="60%" isRequired>
        <FormLabel>ROOM CODE</FormLabel>
        <Input
          name="roomCode"
          placeholder="Enter room code"
          type="text"
          onChange={handleChange}
          focusBorderColor="black"
        />
        <Link
          to="/whiteboard"
          state={{
            roomCode: formData.roomCode,
            connectionType: "join_room",
            name: formData.name,
          }}
        >
          <Button minW="100%" colorScheme="red" mt={8}>
            <span className="font-black">JOIN ROOM</span>
          </Button>
        </Link>
      </FormControl>
    </>
  );
};

export default JoinRoomForm;
