import useUserStore from "../stores/store";
import { LoginPromt } from "../components/LoginPrompt/LoginPrompt";
import { Quiz } from "../components/VocabularyQuiz/Quiz";
import { Timer } from "../components/Timer";

const Vocabulary = () => {
  const auth: boolean = useUserStore((state) => state.auth);

  return (
    <div className="flex flex-1 flex-col justify-center items-center">
      {!auth ? (
        <LoginPromt title="VOCAB QUIZ" />
      ) : (
        <>
          <Quiz />
          <Timer />
        </>
      )}
    </div>
  );
};

export { Vocabulary };
