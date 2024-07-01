import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Input, Button } from "@chakra-ui/react";

const AddFlashcard = () => {
  return (
    <div className="bg-white border-2 border-teal p-8 rounded-xl">
      <FormControl>
        <FormLabel>CHARACTER / PHRASE</FormLabel>
        <Input />
      </FormControl>
      <FormControl>
        <FormLabel>DESCRIPTION / DEFINITION</FormLabel>
        <Input />
      </FormControl>
      <Button>CREATE</Button>
    </div>
  );
};

export default AddFlashcard;
