const Input = ({ type = "text",
    id,
    placeholder,
    name,
    value,
    onchange,
    className="",
    onclick
}) => {
    let inputClasses = `pl-5 focus:outline-blue-600 w-25 placeholder:opacity-40 text-sm md:text-lg md:w-60 h-10 border rounded-lg hover:border-blue-500 shadow-sm ${className}`
    return (
        <>
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                name={name}
                value={value}
                className={inputClasses}
                onChange={onchange}
                onClick={onclick}
            />
        </>
    )
}
export default Input