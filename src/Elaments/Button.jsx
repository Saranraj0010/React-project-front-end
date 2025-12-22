const Button = ({children,
    // onclick,
    className,
    disableed=false,
    type="button",
}) =>{
    const classlist="bg-red-600 text-white p-1 rounded-xl"


    return(
        <>
        <button
        className={classlist}
        type={type}
        // onclick={onclick}
        disabled={disableed}
        >{children}</button>
        </>
    )
}
export default Button