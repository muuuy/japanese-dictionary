const Quiz = () => {
  return (
    <div className="flex flex-1 flex-row justify-center items-center gap-12">
      <div className="quiz--section-container">
        <h2 className="font-black text-5xl text-center absolute bottom-20">
          FILL IN THE BLANK
        </h2>
      </div>
      <div className="quiz--section-container">
        <h2 className="font-black text-5xl text-center absolute bottom-20">
          MATCHING
        </h2>
      </div>
    </div>
  );
};

export default Quiz;
