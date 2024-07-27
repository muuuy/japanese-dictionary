import { useState } from "react";
import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import SubmitButton from "./SubmitButton";
import { FormData } from "../../interfaces";
import { WhiteBoardFormData } from "../../interfaces";

const JoinRoomForm: React.FC<WhiteBoardFormData> = ({
  addErrorBanner,
}) => {
  const [formData, setFormData] = useState<FormData>({
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

        <SubmitButton formData={formData} addErrorBanner={addErrorBanner} />
      </FormControl>
    </>
  );
};

export default JoinRoomForm;
