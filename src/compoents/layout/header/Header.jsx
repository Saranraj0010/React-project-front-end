import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import { useLoginStore } from "../store/useLoginStore";
import light from "../../../assets/LightMode.png";
import dark from "../../../assets/darkMode.png";
import { useEffect } from "react";

const Header = () => {
  const { darkMode, setDarkMode } = useLoginStore();

  // ✅ Persist dark mode
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      setDarkMode(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <header
      className={`flex items-center justify-between px-4 py-2 shadow-md transition-all duration-300
      ${
        darkMode
          ? "bg-black/80 text-white shadow-white"
          : "bg-blue-800 text-white"
      }`}
    >
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <img src={Logo} alt="logo" className="w-10 sm:w-14 md:w-16" />
        <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold">
          School Site
        </h1>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 sm:gap-5">

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="cursor-pointer hover:scale-110 transition"
        >
          <img
            src={darkMode ? light : dark}
            alt="mode"
            className="w-7 sm:w-9 md:w-10"
          />
        </button>

        {/* Auth Buttons */}
        <div className="flex gap-2 sm:gap-3">
          <Link
            to="/login"
            className={`px-3 py-1 rounded-lg text-sm sm:text-base font-semibold transition-all
            ${
              darkMode
                ? "bg-white text-black hover:bg-gray-300"
                : "bg-white text-blue-700 hover:bg-blue-100"
            }`}
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;