import { useState } from "react";
import { useLoginStore } from "../store/useLoginStore";

const sidebar = [
    { id: 1, name: "Dashboard", page: "dashboard" },
    { id: 2, name: "Staff Allocation", page: "staffAllocation" },
    { id: 3, name: "Circular", page: "circular" },
    { id: 4, name: "Add Staff", page: "staff" },
    { id: 5, name: "Staff Details", page: "staffDetails" },
    { id: 6, name: "Student Admission", page: "studentAdmission" },
    { id: 7, name: "Admission Details", page: "admissionDetails" },
    { id: 8, name: "Fees", page: "fees" },
    { id: 9, name: "Subject", page: "subject" },
    { id: 10, name: "Standard", page: "standard" },
    { id: 11, name: "Role", page: "role" },
    { id: 12, name: "Section", page: "section" },
    { id: 13, name: "Calendar", page: "calendar" }
];

const Sidebar = ({ setActivePage }) => {
    const { darkMode } = useLoginStore();
    const [style, setStyle] = useState(false)

    return (
        <div className={`${darkMode ? "bg-black" : "bg-blue-800"} overflow-y-scroll  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] font-semibold w-64 h-[570px] text-white`}>
            <h1 className="text-center p-3 border-b ">Admin Pannel</h1>
            <ol className="w-full p-2 flex flex-col gap-2">
                {sidebar.map((item) => (
                    <li key={item.id} onClick={() => { setActivePage(item.page) }} className={`${darkMode ? "bg-gray-400 text-black hover:bg-gray-800 hover:text-white" : "bg-white text-blue-600 hover:bg-blue-600 hover:text-white"} rounded-md p-2 text-lg font-serif cursor-pointer`} >
                        {item.name}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Sidebar;
