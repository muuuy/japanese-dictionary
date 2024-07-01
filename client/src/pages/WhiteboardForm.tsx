import JoinRoomForm from "../components/WhiteboardFormComponents/JoinRoomForm";
import CreateRoomForm from "../components/WhiteboardFormComponents/CreateRoomForm";

const WhiteboardForm = () => {
  return (
    <>
      <div className="inset-0 top-60  absolute flex flex-col items-center">
        <h1 className="text-5xl font-black">WHITEBOARD</h1>
        <h2 className="text-2xl font-semibold italic">
          Practice writing characters by yourself or with others!
        </h2>
      </div>
      <div className="flex flex-row flex-1">
        <div className="flex flex-col w-1/2 h-screen justify-center items-center">
          <h3 className="text-4xl font-black">CREATE ROOM</h3>
          <p className="text-center mb-2 italic">
            Create a room to play by yourself or share the generated code with
            friends to practice together!
          </p>
          <CreateRoomForm />
        </div>
        <div className="flex flex-col w-1/2 h-screen justify-center items-center">
          <h3 className="text-4xl font-black">JOIN ROOM</h3>
          <p className="text-center mb-2 italic">
            Join an existing room to practice with others!
          </p>
          <JoinRoomForm />
        </div>
      </div>
    </>
  );
};

export default WhiteboardForm;
