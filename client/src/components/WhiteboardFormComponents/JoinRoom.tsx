import JoinRoomForm from "./JoinRoomForm";

const JoinRoom = () => {
  return (
    <div className="flex flex-col w-1/2 justify-center items-center">
      <h3 className="text-4xl font-black">JOIN ROOM</h3>
      <p className="text-center mb-2 italic">
        Join an existing room to practice with others!
      </p>
      <JoinRoomForm />
    </div>
  );
};

export default JoinRoom;
