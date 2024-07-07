import Functionality from "../components/HomeComponents/Functionality";
import Header from "../components/HomeComponents/Header";

const Home = () => {
  return (
    <div className="flex flex-1 flex-col max-h-screen w-full bg-black overflow-hidden">
      <Header />
      <Functionality />
    </div>
  );
};

export default Home;
