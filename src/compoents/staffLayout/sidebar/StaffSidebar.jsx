const sidebar = [
    { id: 1, name: "Dashboard", page: "dashboard" },
    { id: 2, name: "Student Details", page: "studentDetails" },
]

const StaffSidebar = ({ setActivePage }) => {
    return (
        <div>
            <ol className="w-full p-2 flex flex-col gap-2">
                {sidebar.map((item) => (
                    <li key={item.id} onClick={() => setActivePage(item.page)} className="bg-gray-400 rounded-md p-1 text-lg text-white font-serif cursor-pointer hover:bg-gray-600">
                        {item.name}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default StaffSidebar;