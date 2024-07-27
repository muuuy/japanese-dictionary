import { useState } from "react";
import { nanoid } from "nanoid";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import SubmitButton from "./SubmitButton";
import { FormData } from "../../interfaces";
import { WhiteBoardFormData } from "../../interfaces";

const CreateRoomForm: React.FC<WhiteBoardFormData> = ({ addErrorBanner }) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    roomCode: "",
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleGenerate = () => {
    setFormData({ ...formData, roomCode: nanoid() });
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

        <SubmitButton formData={formData} addErrorBanner={addErrorBanner} />
      </FormControl>
    </>
  );
};

export default CreateRoomForm;
