import { Link } from "react-router-dom";
import Logo from "../../../assets/logo.png";
import { useLoginStore } from "../store/useLoginStore";
import { useState, useEffect } from "react";
import light from "../../../assets/LightMode.png";
import dark from "../../../assets/darkMode.png";
import settings from "../../../assets/settings.png";
import close from "../../../assets/close.png";
import menu from "../../../assets/menu.png";

const LayoutHeader = () => {
  const [show, setShow] = useState(false);
  const [profile, setProfile] = useState(false);
  const [password, setPassword] = useState(false);
  const [profileData, setProfileData] = useState(null);

  const { darkMode, setDarkMode } = useLoginStore();

  // ✅ Load profile + dark mode
  useEffect(() => {
    const storedData = localStorage.getItem("staffProfile");
    if (storedData) {
      setProfileData(JSON.parse(storedData));
    }

    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme !== null) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <>
      {/* HEADER */}
      <div
        className={`flex justify-between items-center px-4 py-2 shadow-md transition-all
        ${
          darkMode
            ? "bg-black/80 text-white shadow-white"
            : "bg-blue-800 text-white"
        }`}
      >
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <img src={Logo} className="w-12 md:w-14" />
          <h1 className="text-xl md:text-3xl font-extrabold">
            School Site
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">

          {/* DARK MODE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="hover:scale-110 transition"
          >
            <img
              src={darkMode ? light : dark}
              className="w-7 md:w-9"
            />
          </button>

          {/* MENU (for future mobile use) */}
          <img src={menu} className="w-6 cursor-pointer md:hidden" />

          {/* SETTINGS */}
          <img
            src={settings}
            className="w-6 cursor-pointer"
            onClick={() => setPassword(true)}
          />

          {/* PROFILE */}
          <button
            onClick={() => setProfile(true)}
            className="hover:underline"
          >
            Profile
          </button>

          {/* LOGOUT */}
          <button
            onClick={() => setShow(true)}
            className="hover:text-red-500"
          >
            Logout
          </button>
        </div>
      </div>

      {/* PROFILE MODAL */}
      {profile && profileData && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div
            className={`p-6 rounded-xl w-80 relative ${
              darkMode ? "bg-gray-900 text-white" : "bg-white"
            }`}
          >
            <img
              src={close}
              className="absolute top-3 right-3 w-5 cursor-pointer"
              onClick={() => setProfile(false)}
            />

            <h2 className="text-lg font-bold mb-3 text-center text-blue-500">
              Profile
            </h2>

            <p><b>Username:</b> {profileData.userName}</p>
            <p><b>Name:</b> {profileData.firstName} {profileData.lastName}</p>
            <p><b>Role:</b> {profileData.role}</p>
            <p><b>Email:</b> {profileData.email}</p>
            <p><b>Phone:</b> {profileData.phoneNumber}</p>
            <p><b>Address:</b> {profileData.address}</p>
          </div>
        </div>
      )}

      {/* LOGOUT MODAL */}
      {show && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div
            className={`p-6 rounded-lg text-center ${
              darkMode ? "bg-gray-900 text-white" : "bg-white"
            }`}
          >
            <h2 className="mb-4">You want to logout?</h2>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShow(false)}
                className="bg-gray-500 px-3 py-1 rounded text-white"
              >
                Cancel
              </button>

              <Link
                to="/homePage"
                className="bg-red-600 px-3 py-1 rounded text-white"
              >
                Yes, Logout
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* PASSWORD MODAL (basic UI) */}
      {password && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div
            className={`p-6 rounded-lg w-80 ${
              darkMode ? "bg-gray-900 text-white" : "bg-white"
            }`}
          >
            <h2 className="mb-3 font-bold text-center">
              Update Password
            </h2>

            <input
              type="password"
              placeholder="Enter new password"
              className="w-full border p-2 rounded mb-3 text-black"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setPassword(false)}
                className="bg-gray-500 px-3 py-1 rounded text-white"
              >
                Cancel
              </button>

              <button className="bg-blue-600 px-3 py-1 rounded text-white">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LayoutHeader;