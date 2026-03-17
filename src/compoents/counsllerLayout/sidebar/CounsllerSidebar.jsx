import { useLoginStore } from "../../layout/store/useLoginStore";

const sidebar = [
    { id: 1, name: "Dashboard", page: "dashboard" },
    { id: 2, name: "Add Student", page: "studentAdmission" },
    { id: 3, name: "Student Details", page: "studentDetails" },
    { id: 4, name: "Circular", page: "circular" },
    { id: 5, name: "Class Student", page: "classStudent" }
]

const CounsllerSidebar = ({ setActivePage }) => {
    const { darkMode } = useLoginStore();
    return (
        <div className={`${darkMode ? "bg-black/80" : "bg-blue-800"} font-semibold w-64 h-full text-white`}>
            <h1 className="text-center p-3 border-b ">Staff Pannel</h1>
            <ol className="w-full p-2 flex flex-col gap-2">
                {sidebar.map((item) => (
                    <li key={item.id} onClick={() => setActivePage(item.page)} className={`${darkMode ? "bg-gray-400 text-black hover:bg-gray-800 hover:text-white    " : "bg-white text-blue-600 hover:bg-blue-600 hover:text-white"} rounded-md p-2 text-lg font-serif cursor-pointer duration-500  `}>
                        {item.name}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default CounsllerSidebar;