const Button = ({ children, onClick, className = "", disabled = false, type = "button" }) => {
    const baseClasses = `bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition duration-200${disabled ? "opacity-50 cursor-not-allowed" : ""}`;
    return (
        <button type={type} onClick={onClick} disabled={disabled} className={`${baseClasses} ${className}`}>
            {children}
        </button>
    );
};
export default Button;
