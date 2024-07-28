import { FormLabel, Input } from "@chakra-ui/react";

interface EmailInputData {
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  email: string;
  id: string;
}

const EmailInput: React.FC<EmailInputData> = ({
  handleInput,
  email,
  id, //login--email
}) => {
  return (
    <>
      <FormLabel htmlFor={id}>EMAIL</FormLabel>
      <Input
        id={id}
        name="email"
        type="email"
        placeholder="Email"
        autoComplete="email"
        minLength={2}
        maxLength={254}
        onChange={handleInput}
        className="mb-4"
        value={email}
      />
    </>
  );
};

export default EmailInput;
