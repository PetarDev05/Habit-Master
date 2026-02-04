import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="flex flex-row items-center gap-10 p-5">
      <Link to="/table" className="border bg-gray-200 px-3">
        Table of progress
      </Link>
      <Link to="/" className="border bg-gray-200 px-3">
        Dashboard
      </Link>
      <Link to="/statistics" className="border bg-gray-200 px-3">
        Statistics
      </Link>
      <Link to="/settings" className="border bg-gray-200 px-3">
        Settings
      </Link>
    </nav>
  );
};

export default Navigation;
