const Dashboard = () => {

    const currentDate = new Date();
    let time = currentDate.toLocaleTimeString()
    let date = currentDate.toLocaleDateString()

    return (
        <>
            <div className="">
                <div className="bg-blue-400 m-2 rounded-2xl p-2 flex gap-3">
                    <div className=""></div>
                    <div className="text-white font-mono">{time}</div>
                    <div className="text-white font-mono">{date}</div>
                </div>
            </div>
        </>
    )
}
export default Dashboard