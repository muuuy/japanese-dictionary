import JoinRoom from "../components/WhiteboardFormComponents/JoinRoom";
import CreateRoom from "../components/WhiteboardFormComponents/CreateRoom";

const WhiteboardForm = () => {
  return (
    <>
      <div className="flex flex-1 flex-col justify-center">
        <div className="flex flex-col items-center mb-20 -mt-20">
          <h1 className="page--header">WHITEBOARD</h1>
          <h2 className="page--header-description">
            Practice writing characters by yourself or with others!
          </h2>
        </div>
        <div className="flex flex-row order-4">
          <CreateRoom />
          <JoinRoom />
        </div>
      </div>
    </>
  );
};

export default WhiteboardForm;
