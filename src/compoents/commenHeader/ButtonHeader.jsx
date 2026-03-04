const ButtonHeader = ({ title, button, logo, onclick }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 m-5 bg-white rounded-2xl shadow-xl">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="Logo"
          className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-blue-500"
        />
      </div>
      {/* Title */}
      <div className="flex-1 text-center text-xl md:text-3xl lg:text-4xl font-bold text-gray-800">
        {title}
      </div>
      {/* Button */}
      <div>
        <button
          onClick={onclick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-medium transition duration-300 shadow-md hover:shadow-lg active:scale-95"
        >
          {button}
        </button>
      </div>
    </div>
  );
};
export default ButtonHeader;