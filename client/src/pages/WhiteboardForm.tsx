import JoinRoomForm from "../components/WhiteboardFormComponents/JoinRoomForm";
import CreateRoomForm from "../components/WhiteboardFormComponents/CreateRoomForm";

const WhiteboardForm = () => {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="flex flex-col items-center mb-20 -mt-20">
        <h1 className="page--header">WHITEBOARD</h1>
        <h2 className="page--header-description">
          Practice writing characters by yourself or with others!
        </h2>
      </div>
      <div className="flex flex-row order-4">
        <div className="flex flex-col w-1/2 justify-center items-center">
          <h3 className="text-4xl font-black">CREATE ROOM</h3>
          <p className="text-center mb-2 italic">
            Create a room to play by yourself or share the generated code with
            friends to practice together!
          </p>
          <CreateRoomForm />
        </div>
        <div className="flex flex-col w-1/2 justify-center items-center">
          <h3 className="text-4xl font-black">JOIN ROOM</h3>
          <p className="text-center mb-2 italic">
            Join an existing room to practice with others!
          </p>
          <JoinRoomForm />
        </div>
      </div>
    </div>
  );
};

export default WhiteboardForm;
