import CreateRoomForm from "./CreateRoomForm";

const CreateRoom = () => {
  return (
    <div className="flex flex-col w-1/2 justify-center items-center">
      <h3 className="text-4xl font-black">CREATE ROOM</h3>
      <p className="text-center mb-2 italic">
        Create a room to play by yourself or share the generated code with
        friends to practice together!
      </p>
      <CreateRoomForm />
    </div>
  );
};

export default CreateRoom;
