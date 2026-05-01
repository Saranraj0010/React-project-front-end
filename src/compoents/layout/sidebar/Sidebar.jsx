import { useState, useEffect } from "react";
import { useLoginStore } from "../store/useLoginStore";

const sidebar = [
  { id: 1, name: "Dashboard", page: "dashboard" },
  { id: 2, name: "Staff Allocation", page: "staffAllocation" },
  { id: 3, name: "Circular", page: "circular" },
  { id: 4, name: "Add Staff", page: "staff" },
  { id: 5, name: "Staff Details", page: "staffDetails" },
  { id: 6, name: "Student Admission", page: "studentAdmission" },
  { id: 7, name: "Admission Details", page: "admissionDetails" },
  { id: 8, name: "Payment", page: "payment" },
  { id: 9, name: "Fees", page: "fees" },
  { id: 10, name: "Subject", page: "subject" },
  { id: 11, name: "Standard", page: "standard" },
  { id: 12, name: "Role", page: "role" },
  { id: 13, name: "Section", page: "section" },
  { id: 14, name: "AddAdmin", page: "addAdmin" },
  { id: 15, name: "Calendar", page: "calendar" }
];

const Sidebar = ({ setActivePage }) => {
  const { darkMode } = useLoginStore();

  const [active, setActive] = useState(
    localStorage.getItem("activePage") || "dashboard"
  );

  useEffect(() => {
    const saved = localStorage.getItem("activePage");
    if (saved) {
      setActive(saved);
      setActivePage(saved);
    }
  }, []);

  return (
    <div
      className={`w-64 hidden md:block h-142 overflow-y-auto font-semibold transition-all duration-300
      ${
        darkMode
          ? "bg-gray-950 text-white border-r border-gray-800"
          : "bg-blue-800 text-white"
      }`}
      style={{ scrollbarWidth: "none" }}
    >
      <h1 className="text-center p-4 text-xl font-bold border-b border-gray-700">
        Admin Panel
      </h1>

      <ol className="p-3 flex flex-col gap-2">
        {sidebar.map((item) => {
          const isActive = active === item.page;

          return (
            <li
              key={item.id}
              onClick={() => {
                setActive(item.page);
                setActivePage(item.page);
                localStorage.setItem("activePage", item.page);
              }}
              className={`rounded-lg px-3 py-2 text-[15px] cursor-pointer transition-all duration-300

              ${
                isActive
                  ? darkMode
                    ? "bg-white text-black border-r-8 border-gray-500 shadow-md scale-[1.02]"
                    : "bg-white border-r-8 border-blue-600 text-blue-700 shadow-md scale-[1.02]"
                  : darkMode
                  ? "text-gray-300 border-r-4 border-blue-500 hover:bg-gray-800 hover:text-white"
                  : "bg-blue-700 hover:bg-white hover:text-blue-700"
              }`}
            >
              {item.name}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default Sidebar;