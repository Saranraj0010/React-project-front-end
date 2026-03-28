import { useLoginStore } from "../layout/store/useLoginStore";

const ButtonHeader = ({ title, button, logo, onclick }) => {
  const { darkMode } = useLoginStore();

  return (
    <div
      className={`flex items-center justify-between px-6 py-4 rounded-2xl shadow-xl transition-all duration-300
      ${
        darkMode
          ? "bg-gray-900 text-white border border-gray-800"
          : "bg-white text-gray-800"
      }`}
    >
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="Logo"
          className={`w-10 h-10 md:w-16 md:h-16 rounded-full object-cover border-2
          ${darkMode ? "border-blue-400" : "border-blue-500"}`}
        />
      </div>

      <div
        className={`flex-1 text-center text-[15px] md:text-3xl lg:text-4xl font-bold
        ${darkMode ? "text-gray-100" : "text-gray-800"}`}
      >
        {title}
      </div>

      <div>
        <button
          onClick={onclick}
          className={`px-2 py-1 md:px-4 md:py-2 rounded-xl font-medium transition duration-300 shadow-md hover:shadow-lg active:scale-95
          
          ${
            darkMode
              ? "bg-blue-500 hover:bg-blue-600 text-white"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {button}
        </button>
      </div>
    </div>
  );
};

export default ButtonHeader;