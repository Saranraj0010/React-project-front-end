const CommenHeader = ({title,button,logo,onclick}) => {
    return(
        <>
        <div className="flex gap-60 items-center px-5 m-5 bg-white h-25 max-w-full rounded-2xl shadow-2xl">
            <div className=""><img src={logo} width={70} alt="" className=" rounded-full" /></div>
            <div className="text-4xl font-semibold">{title}</div>
            {/* <div className=""><button onClick={onclick} className="bg-red-700 text-white rounded-lg p-2">{button}</button></div> */}
        </div>
        </>
    )
}
export default CommenHeader