const InputBox = ({ type = "text",
    id,
    placeholder,
    name,
    value,
    // onchange,
    className,
}) => {
    let inputClasses = `w-60 border-2 text-center h-10 rounded-xl placeholder-text-gray-400`;
    return (
        <>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                // onchange={onchange}
                className={inputClasses}
            />
        </>
    )
}
export default InputBox