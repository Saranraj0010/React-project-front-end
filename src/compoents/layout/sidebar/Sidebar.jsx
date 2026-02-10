import { useState } from "react";

const sidebar = [
    { id: 1, name: "Dashboard", page: "dashboard" },
    { id: 2, name: "Add Student", page: "student" },
    { id: 3, name: "Student Details", page: "studentDetails" },
    {id:4,name:"Add Staff",page:"staff"},
    {id:5,name:"Staff Details",page:"staffDetails"},
    {id:6,name:"Student Admission",page:"studentAdmission"},
    {id:7,name:"Standard",page:"standard"},
];
const[style,setStyle]=useState(false)
const Style = () => {
    
}

const Sidebar = ({ setActivePage }) => {
    return (
        <div className="bg-blue-800 h-full text-white">
            <h1 className="text-center p-3 border-b ">Admin Pannel</h1>
            <ol className="w-full p-2 flex flex-col gap-2">
                {sidebar.map((item) => (
                    <li key={item.id} onClick={() => {setActivePage(item.page)}} className="bg-white text-blue-600 rounded-md p-2 text-lg font-serif cursor-pointer duration-500 hover:bg-blue-600 hover:text-white ">
                        {item.name}
                    </li>
                ))}
            </ol>
        </div>
    );
};

export default Sidebar;
