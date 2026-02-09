import { Link } from "react-router-dom";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { SlGrid } from "react-icons/sl";
import { GoGear } from "react-icons/go";
import { BsBarChart } from "react-icons/bs";

const Navigation = () => {
  return (
    <nav className="fixed bottom-0 right-0 left-0 w-full flex flex-row items-center justify-center bg-(--white) shadow gap-10 p-5 z-50">
      <Link to="/table" className="p-3 rounded-lg text-3xl hover:bg-(--bg)">
        <SlGrid />
      </Link>
      <Link to="/" className="p-3 rounded-lg text-3xl hover:bg-(--bg)">
        <HiOutlineRocketLaunch />
      </Link>
      <Link to="/statistics" className="p-3 rounded-lg text-3xl hover:bg-(--bg)">
        <BsBarChart />
      </Link>
      <Link to="/settings" className="p-3 rounded-lg text-3xl hover:bg-(--bg)">
        <GoGear />
      </Link>
    </nav>
  );
};

export default Navigation;
