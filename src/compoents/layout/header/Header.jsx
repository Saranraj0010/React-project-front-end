import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import { useLoginStore } from "../store/useLoginStore";
import light from "../../../assets/LightMode.png";
import dark from "../../../assets/darkMode.png";

const Header = () => {
    const { darkMode, setDarkMode } = useLoginStore();

    return (
        <header
            className={`flex items-center justify-between px-4 py-2 shadow-md
            ${darkMode ? "bg-black text-white shadow-white" : "bg-blue-800 text-white"}`}
        >
            {/* Logo Section */}
            <div className="flex items-center gap-2">
                <img src={Logo} alt="logo" className="w-10 sm:w-14 md:w-16" />
                <h1 className="text-lg sm:text-2xl md:text-3xl font-extrabold">
                    School Site
                </h1>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2 sm:gap-4">

                {/* Dark Mode */}
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className="cursor-pointer"
                >
                    <img
                        src={darkMode ? light : dark}
                        alt="mode"
                        className="w-7 sm:w-9 md:w-10"
                    />
                </button>

                {/* Buttons */}
                <div className="flex gap-2 sm:gap-3">
                    <Link
                        to="/login"
                        className={`px-3 py-1 rounded-lg text-sm sm:text-base
                        ${darkMode
                                ? "bg-white text-black hover:bg-gray-500 hover:text-white"
                                : "bg-blue-500 hover:bg-red-700"
                            }`}
                    >
                        Login
                    </Link>

                    <Link
                        to="/signUp"
                        className={`px-3 py-1 rounded-lg text-sm sm:text-base
                        ${darkMode
                                ? "bg-white text-black hover:bg-gray-500 hover:text-white"
                                : "bg-blue-500 hover:bg-red-700"
                            }`}
                    >
                        Signup
                    </Link>
                </div>

            </div>
        </header>
    );
};

export default Header;