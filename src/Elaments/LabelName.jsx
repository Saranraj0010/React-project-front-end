export const LabelName = ({
    htmlFor,
    className = "",
    children
}) => {

    const baseClasses = "text-lg font-medium";

    return (
        <label
            htmlFor={htmlFor}
            className={`${baseClasses} ${className}`}
        >
            {children}
        </label>
    );
};
