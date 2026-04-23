import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import { useLoginStore } from "../store/useLoginStore";
import { useState, useEffect } from "react";
import light from "../../../assets/LightMode.png";
import dark from "../../../assets/darkMode.png";
import setting from "../../../assets/settings.png";
import Input from "../../../Elaments/Input";
import { LabelName } from "../../../Elaments/LabelName";
import axios from "axios";
import close from "../../../assets/close.png";
import menu from "../../../assets/menu.png"
import { useLocation } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";

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
const API = import.meta.env.VITE_API;

const AdminLayoutHeader = ({ setActivePage }) => {
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const [profileData, setProfileData] = useState({});
  const path = useLocation()
  const [password, setPassword] = useState(false);
  const { darkMode, setDarkMode } = useLoginStore();
  const [data, setData] = useState([]);
  const [mobile, setMobile] = useState(false)
  const [settings, setSettings] = useState(false)
  const [active, setActive] = useState("dashboard");
  const modalStyle = darkMode
    ? "bg-gray-900 text-white border border-gray-700"
    : "bg-gray-300 text-black";

  const popupStyle = darkMode
    ? "bg-gray-800 text-white border border-gray-700"
    : "bg-white text-black";

  const overlayStyle =
    "absolute bg-black/50 flex items-center justify-center inset-0 h-screen w-screen";

  const GetData = async () => {
    try {
      const get = await axios.get(`${API}v1/getStaff`);
      setData(get.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetData();

    const storedData = localStorage.getItem("adminProfile");
    setProfileData(storedData ? JSON.parse(storedData) : {});
  }, []);
  path.pathname === "/homePage/adminlayout"
  return (
    <>
      <div
        className={`flex justify-between items-center shadow p-2.5 ${darkMode
          ? "bg-gray-950 text-white border-b border-gray-800"
          : "bg-blue-800 text-white"
          }`}
      >
        <div className="flex items-center gap-5">
          <img width={60} src={Logo} alt="logo" />
          <h1 className="text-2xl md:text-3xl font-extrabold">
            School Site
          </h1>
        </div>


        <div className=" hidden md:block">
          <div className=" flex gap-5 items-center">
            <div
              className="cursor-pointer"
              onClick={() => setDarkMode(!darkMode)}
            >
              <img width={40} src={darkMode ? light : dark} alt="mode" />
            </div>

            <img
              src={setting}
              className="cursor-pointer w-7"
              onClick={() => setPassword(!password)}
              alt="settings"
            />
            <div className="flex gap-4 items-center">
              <div
                className="hover:underline cursor-pointer"
                onClick={() => setProfile(true)}
              >
                Profile
              </div>
              <button
                className="hover:text-red-400"
                onClick={() => setShow(true)}
              >
                Logout
              </button>
            </div>
          </div>
        </div>


        <div className="flex md:hidden items-center gap-4">
          <div
            className="cursor-pointer"
            onClick={() => setDarkMode(!darkMode)}
          >
            <img width={40} src={darkMode ? light : dark} alt="mode" />
          </div>

          <img
            src={setting}
            className="cursor-pointer w-7"
            onClick={() => setSettings(!settings)}
            alt="settings"
          />
          <img className=" cursor-pointer" onClick={() => setMobile(!mobile)} src={menu} alt="" />
        </div>
      </div>
      {
        mobile && (
          <div className={`p-5 rounded-lg absolute -right-5 top-15`}>
            <div className={`w-70 h-150 md:h-full overflow-y-auto font-semibold transition-all duration-300 ${darkMode ? "bg-gray-950 text-white border-r border-gray-800" : "bg-blue-800 text-white"}`} style={{ scrollbarWidth: "none" }}>
              <ol className="p-3 flex flex-col gap-2">
                {sidebar.map((item) => {
                  const isActive = active === item.page;

                  return (
                    <li
                      key={item.id}
                      onClick={() => {
                        setActive(item.page);
                        setActivePage(item.page);
                        setMobile(!mobile)
                      }}
                      className={`rounded-lg px-3 py-2 text-[15px] cursor-pointer transition-all duration-300 ${isActive? darkMode? "bg-blue-600 text-white shadow-md scale-[1.02]": "bg-white text-blue-700 shadow-md scale-[1.02]": darkMode ? "text-gray-300 hover:bg-gray-800 hover:text-white" : "bg-blue-700 hover:bg-white hover:text-blue-700" }`}>
                      {item.name}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        )
      }
      {
        settings && (
          <div className="relative justify-center items-center">
            <div className={`p-7 shadow-2xl rounded-lg bg-white absolute top-2 right-10`}>
              <div className="flex flex-col gap-5">
                <div
                  className="hover:underline cursor-pointer"
                  onClick={() => setProfile(true)}
                >
                  Profile
                </div>

                <button
                  className="hover:text-red-400"
                  onClick={() => setShow(true)}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        )
      }
      {password && (
        <div className="absolute top-20 right-10 z-50">
          <div
            className={`p-5 rounded-lg flex flex-col gap-3 shadow-lg ${popupStyle}`}
          >
            <LabelName>Update Password:</LabelName>

            <Input
              placeholder="Enter new password"
              className={`p-2 rounded ${darkMode
                ? "bg-gray-700 text-white border border-gray-600"
                : "border"
                }`}
            />

            <button className="bg-blue-500 px-3 py-1 rounded text-white hover:bg-blue-700">
              Update
            </button>
          </div>
        </div>
      )}

      {profile && (
        <div className={overlayStyle}>
          <div
            className={`p-6 rounded-lg relative flex flex-col gap-3 ${modalStyle}`}
          >
            <div
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => setProfile(false)}
            >
              <img src={close} alt="close" width={20} />
            </div>

            <div className="flex font-bold">
              UserName:
              <span className="font-light ml-2">
                {profileData?.UserName}
              </span>
            </div>

            <div className="flex font-bold">
              Role:
              <span className="font-light ml-2">Admin</span>
            </div>

            <div className="flex font-bold">
              Phone:
              <span className="font-light ml-2">
                {profileData?.PhoneNumber}
              </span>
            </div>
          </div>
        </div>
      )}

      {show && (
        <div className={overlayStyle}>
          <div
            className={`p-6 rounded-lg flex flex-col items-center gap-4 ${modalStyle}`}
          >
            <h1 className="text-lg font-semibold">
              Do you want to logout?
            </h1>

            <div className="flex gap-3">
              <button
                onClick={() => setShow(false)}
                className="bg-blue-500 px-4 py-1 rounded text-white hover:bg-blue-700"
              >
                Cancel
              </button>

              <Link to="/homePage">
                <button className="bg-red-500 px-4 py-1 rounded text-white hover:bg-red-700">
                  Yes, Logout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminLayoutHeader;