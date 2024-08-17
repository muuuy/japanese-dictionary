import { Link } from "react-router-dom";
import { FaArrowRightToBracket } from "react-icons/fa6";
import useUserStore from "../../stores/store";

type PlayButtonData = {
  link: string;
};

const PlayButton: React.FC<PlayButtonData> = ({ link }) => {
  const auth = useUserStore((state) => state.auth);

  return (
    <Link to={link} className="w-full absolute bottom-0 bg-black">
      <div className="flex flex-row p-1 w-full justify-center items-center gap-4 p-2">
        <h2 className="font-black text-5xl text-white italic text-center">
          PLAY
        </h2>
        <FaArrowRightToBracket color="white" size={32} />
      </div>
    </Link>
  );
};

export { PlayButton };
