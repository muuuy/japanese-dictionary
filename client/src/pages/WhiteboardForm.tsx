import JoinRoomForm from "../components/WhiteboardFormComponents/JoinRoomForm";
import CreateRoomForm from "../components/WhiteboardFormComponents/CreateRoomForm";

const WhiteboardForm = () => {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-1/2 h-screen justify-center items-center">
        <h1 className="text-4xl font-black">CREATE ROOM</h1>
        <CreateRoomForm />
      </div>
      <div className="flex flex-col w-1/2 h-screen justify-center items-center">
        <h1 className="text-4xl font-black">JOIN ROOM</h1>
        <JoinRoomForm />
      </div>
    </div>
  );
};

export default WhiteboardForm;
