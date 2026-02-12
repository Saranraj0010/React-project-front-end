const Dashboard = () => {

    const currentDate = new Date();
    let time = currentDate.toLocaleTimeString()
    let date = currentDate.toLocaleDateString()

    return (
        <>
            <div className="bg-white rounded-lg shadow-2xl p-1 m-2">
                <div className="bg-blue-400 m-2 rounded-lg p-2 flex justify-between items-center px-5 gap-3">
                    <div className="text-white font-semibold text-lg">Welcome To School Site!</div>
                    <div className="flex">
                    <div className="text-white font-mono">{time}</div>
                    <div className="text-white font-mono">{date}</div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Dashboard