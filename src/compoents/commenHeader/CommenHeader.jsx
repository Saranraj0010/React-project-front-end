const CommenHeader = ({ title, logo }) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 m-5 bg-white rounded-2xl shadow-xl">
      {/* Left Side - Logo */}
      <div className="flex items-center gap-4">
        <img
          src={logo}
          alt="Logo"
          className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-blue-500"
        />
      </div>
      {/* Center - Title */}
      <div className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-800 text-center flex-1">
        {title}
      </div>
    </div>
  );
};
export default CommenHeader;