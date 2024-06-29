import React, { useEffect, useState } from "react";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";

const CreateRoomForm = () => {
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

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {};

  const handleGenerate = (event: React.ChangeEvent<HTMLInputElement>) => {};

  const handleCopy = (event: React.ChangeEvent<HTMLInputElement>) => {};

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
          />
          <ButtonGroup spacing={0}>
            <Button colorScheme="teal" rounded="none">
              GENERATE
            </Button>
            <Button colorScheme="red" variant="outline" rounded="none">
              COPY
            </Button>
          </ButtonGroup>
        </div>
        <Button minW="100%" colorScheme="teal" mt={8}>
          <span className="font-black">GENERATE ROOM</span>
        </Button>
      </FormControl>
    </>
  );
};

export default CreateRoomForm;
