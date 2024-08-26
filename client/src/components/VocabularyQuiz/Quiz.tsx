import { QuestionBox } from "./QuestionBox";
import { AnswerBar } from "./AnswerBar";
import { SubmitButton } from "./SubmitButton";
import { SkipButton } from "./SkipButton";

const Quiz = () => {
  return (
    <>
      <h1 className="page--header mb-16 mt-8">VOCAB QUIZ</h1>
      <QuestionBox
        currentQuestion={unAnsweredQuestions[currentQuestionIndex]}
      />
      <AnswerBar handleSubmit={handleSubmit} />
      <div className="flex flex-row justify-between items-center w-full absolute bottom-4 px-4">
        <div className="flex flex-row gap-4 my-2 text-xl">
          <p className="flex flex-row justify-center items-center gap-2 font-black text-base">
            <span className="text-red-500 bg-slate-200 p-1 rounded-full">
              {answeredQuestions.length}
            </span>{" "}
            of{" "}
            <span className="text-red-500 bg-slate-200 p-1 rounded-full">
              {flashcards.length}
            </span>
          </p>
        </div>
        <div className="flex flex-row gap-4">
          <SubmitButton />
          <SkipButton />
        </div>
      </div>
    </>
  );
};

export { Quiz };
