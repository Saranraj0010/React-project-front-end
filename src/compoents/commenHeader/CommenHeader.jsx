import { useLoginStore } from "../layout/store/useLoginStore";

const CommenHeader = ({ title, logo }) => {
  const { darkMode } = useLoginStore();

  return (
    <div
      className={`flex items-center justify-between px-6 w-full py-4 rounded-2xl shadow-xl transition-all duration-300
      ${
        darkMode
          ? "bg-gray-900 text-white border border-gray-800"
          : "bg-white text-gray-800"
      }`}
    >
      {/* LEFT - LOGO */}
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="Logo"
          className={`w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2
          ${
            darkMode
              ? "border-blue-400"
              : "border-blue-500"
          }`}
        />
      </div>

      {/* CENTER - TITLE */}
      <div
        className={`text-xl md:text-3xl lg:text-4xl font-bold text-center flex-1
        ${darkMode ? "text-gray-100" : "text-gray-800"}`}
      >
        {title}
      </div>
    </div>
  );
};

export default CommenHeader;