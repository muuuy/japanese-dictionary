import Typewriter from "../Typewriter";

interface TutorialButtonData {
  handleTutorial: () => void;
}

const TutorialButton: React.FC<TutorialButtonData> = ({ handleTutorial }) => {
  return (
    <button
      onClick={handleTutorial}
      className="border-2 border-black h-28 w-full -skew-x-6 bg-white relative transition text-red-600 duration-500 ease-in-out hover:bg-slate-300"
    >
      <span className="font-black text-5xl tracking-widest items-center mx-8">
        TUTORIAL
      </span>
      <Typewriter
        text="ルール"
        speed={100}
        style="font-semibold text-xs tracking-widest absolute left-1/2 bottom-2 -translate-x-1/2"
      />
      <div className="w-10 h-10 border-2 border-black bg-red-500 absolute -right-4 -top-4 rounded-full flex items-center justify-center z-5 skew-x-0">
        <p className="text-white font-black text-xl">T</p>
      </div>
    </button>
  );
};

export default TutorialButton;
