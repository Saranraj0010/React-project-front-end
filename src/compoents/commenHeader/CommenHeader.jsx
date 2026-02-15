const CommenHeader = ({title,logo}) => {
    return(
        <>
        <div className="flex gap-3 md:gap-10 lg:gap-80 items-center px-5 m-5 bg-white h-25 max-w-full rounded-2xl shadow-2xl">
            <div className=""><img src={logo} width={70} alt="" className=" rounded-full" /></div>
            <div className="text-4xl font-semibold">{title}</div>
        </div>
        </>
    )
}
export default CommenHeader