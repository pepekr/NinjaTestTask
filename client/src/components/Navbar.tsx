import { Link } from "react-router-dom";

const Navbar: React.FC = () => (
  <nav className="w-full bg-white shadow-lg">
    <div className="px-6 py-4 flex justify-between items-center">
      <Link
        to="/"
        className="text-2xl font-bold text-gray-800 hover:text-blue-500 transition-colors duration-200"
      >
        HeroApp
      </Link>

      <div className="flex items-center gap-8">
        <Link
          to="/"
          className="text-gray-700 font-medium hover:text-blue-500 transition-colors duration-200"
        >
          Home
        </Link>
        <Link
          to="/create-hero"
          className="text-gray-700 font-medium hover:text-blue-500 transition-colors duration-200"
        >
          Create Hero
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;
 