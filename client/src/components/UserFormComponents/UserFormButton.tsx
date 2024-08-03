import { Button } from "@chakra-ui/react";

interface UserFormButtonData {
  handleSubmit: () => void;
  loading: boolean;
}

const UserFormButton: React.FC<UserFormButtonData> = ({
  handleSubmit,
  loading,
}) => {
  return (
    <Button
      colorScheme="red"
      className="mt-8 mb-2"
      type="submit"
      onClick={handleSubmit}
      isLoading={loading}
      width={"80%"}
    >
      <span className="font-black text-2xl tracking-widest">SUBMIT</span>
    </Button>
  );
};

export { UserFormButton };
