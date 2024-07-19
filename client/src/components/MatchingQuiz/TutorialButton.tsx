import Typewriter from "../Typewriter";

interface TutorialButtonData {
  handleTutorial: () => void;
}

const TutorialButton: React.FC<TutorialButtonData> = ({ handleTutorial }) => {
  return (
    <button
      onClick={handleTutorial}
      className="border-2 border-black h-28 w-full -skew-x-6 bg-white relative transition text-red-600 duration-500 ease-in-out hover:bg-red-500"
    >
      <div>
        <span className="font-black text-5xl tracking-widest flex flex-row items-center gap-16 ml-4">
          TUTORIAL
        </span>
      </div>
      <Typewriter
        text="始まりました"
        speed={100}
        style="font-semibold text-xs tracking-widest absolute left-1/2 bottom-2 -translate-x-1/2"
      />
    </button>
  );
};

export default TutorialButton;
