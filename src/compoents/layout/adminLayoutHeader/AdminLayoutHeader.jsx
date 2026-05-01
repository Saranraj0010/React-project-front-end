import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import { useLoginStore } from "../store/useLoginStore";
import { useState, useEffect } from "react";
import light from "../../../assets/LightMode.png";
import dark from "../../../assets/darkMode.png";
import setting from "../../../assets/settings.png";
import Input from "../../../Elaments/Input";
import { LabelName } from "../../../Elaments/LabelName";
import close from "../../../assets/close.png";
import menu from "../../../assets/menu.png";

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

const AdminLayoutHeader = ({ setActivePage }) => {
  const { darkMode, setDarkMode } = useLoginStore();

  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const [settings, setSettings] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [passwordPopup, setPasswordPopup] = useState(false);

  const [active, setActive] = useState("dashboard");
  const [profileData, setProfileData] = useState({});
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const storedData = localStorage.getItem("adminProfile");
    setProfileData(storedData ? JSON.parse(storedData) : {});
  }, []);

  const overlay = "fixed inset-0 bg-black/50 flex justify-center items-center z-50";

  return (
    <>
      {/* HEADER */}
      <div className={`flex justify-between items-center p-3 
      ${darkMode ? "bg-gray-950 text-white" : "bg-blue-800 text-white"}`}>

        <div className="flex items-center gap-4">
          <img src={Logo} width={50} />
          <h1 className="text-xl font-bold">School Site</h1>
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex items-center gap-5">
          <img
            src={darkMode ? light : dark}
            width={30}
            className="cursor-pointer"
            onClick={() => setDarkMode(!darkMode)}
          />

          <img
            src={setting}
            className="cursor-pointer w-6"
            onClick={() => setSettings(!settings)}
          />

          <p onClick={() => setProfile(true)} className="cursor-pointer hover:underline">
            Profile
          </p>

          <button onClick={() => setShow(true)} className="hover:text-red-400">
            Logout
          </button>
        </div>

        {/* MOBILE */}
        <div className="md:hidden flex items-center gap-3">
          <img
            src={darkMode ? light : dark}
            width={30}
            onClick={() => setDarkMode(!darkMode)}
          />
          <img src={setting} width={25} onClick={() => setSettings(!settings)} />
          <img src={menu} width={25} onClick={() => setMobile(!mobile)} />
        </div>
      </div>

      {/* MOBILE SIDEBAR */}
      {mobile && (
        <div className="fixed top-16 right-0 w-64 h-full bg-blue-800 text-white z-50">
          {sidebar.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                setActive(item.page);
                setActivePage(item.page);
                setMobile(false);
              }}
              className={`p-3 cursor-pointer ${
                active === item.page ? "bg-white text-blue-700" : ""
              }`}
            >
              {item.name}
            </div>
          ))}
        </div>
      )}

      {/* SETTINGS POPUP */}
      {settings && (
        <div className="fixed top-16 right-5 bg-white shadow-lg p-4 rounded z-50">
          <p className="cursor-pointer" onClick={() => setProfile(true)}>Profile</p>
          <p className="cursor-pointer" onClick={() => setPasswordPopup(true)}>Change Password</p>
          <p className="cursor-pointer text-red-500" onClick={() => setShow(true)}>Logout</p>
        </div>
      )}

      {/* PASSWORD */}
      {passwordPopup && (
        <div className={overlay}>
          <div className="bg-white p-5 rounded w-80">
            <LabelName>New Password</LabelName>
            <Input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter password"
            />
            <div className="flex justify-end gap-2 mt-3">
              <button onClick={() => setPasswordPopup(false)}>Cancel</button>
              <button className="bg-blue-600 text-white px-3 py-1 rounded">
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PROFILE */}
      {profile && (
        <div className={overlay}>
          <div className="bg-white p-5 rounded relative">
            <img src={close} className="absolute top-2 right-2 w-5 cursor-pointer"
              onClick={() => setProfile(false)}
            />

            <p><b>Username:</b> {profileData?.userName}</p>
            <p><b>Phone:</b> {profileData?.phoneNumber}</p>
            <p><b>Role:</b> Admin</p>
          </div>
        </div>
      )}

      {/* LOGOUT */}
      {show && (
        <div className={overlay}>
          <div className="bg-white p-5 rounded text-center">
            <p>Do you want to logout?</p>
            <div className="flex justify-center gap-3 mt-3">
              <button onClick={() => setShow(false)}>Cancel</button>
              <Link to="/homePage">
                <button className="bg-red-500 text-white px-3 py-1 rounded">
                  Logout
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