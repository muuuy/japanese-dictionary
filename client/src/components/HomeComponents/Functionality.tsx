import HomePageImage from "../../assets/homepage_img.jpg";

const Functionality = () => {
  return (
    <section className="flex flex-row flex-1 border-t-2 border-black flex-1 h-2/5 gap-2 pb-2">
      <img src={HomePageImage} className="rounded-3xl" />
      <div className="flex flex-row justify-evenly bg-white rounded-3xl">
        <div className="flex flex-col ">
          <h3 className="text-3xl font-black">WHITEBOARD</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div>
          <h3>FLASHCARDS</h3>
        </div>
        <div>
          <h3>QUIZ</h3>
        </div>
      </div>
    </section>
  );
};

export default Functionality;
