import { FormLabel, Input } from "@chakra-ui/react";

interface VerifyPasswordInputData {
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  verifyPassword: string;
  id: string;
}

const VerifyPasswordInput: React.FC<VerifyPasswordInputData> = ({
  handleInput,
  verifyPassword,
  id,
}) => {
  return (
    <>
      <FormLabel htmlFor={id}>VERIFY PASSWORD</FormLabel>
      <Input
        id={id}
        name="verifyPassword"
        type="password"
        minLength={8}
        maxLength={32}
        placeholder="Password"
        onChange={handleInput}
        value={verifyPassword}
        className="mb-4"
      />
    </>
  );
};

export { VerifyPasswordInput };
