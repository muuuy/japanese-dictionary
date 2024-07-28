import { FormLabel, Input } from "@chakra-ui/react";

interface PasswordInputData {
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  password: string;
  id: string;
}

const PasswordInput: React.FC<PasswordInputData> = ({
  handleInput,
  password,
  id,
}) => {
  return (
    <>
      <FormLabel htmlFor={id}>PASSWORD</FormLabel>
      <Input
        id={id}
        name="password"
        type="password"
        placeholder="Password"
        minLength={8}
        maxLength={32}
        onChange={handleInput}
        value={password}
      />
    </>
  );
};

export default PasswordInput;
