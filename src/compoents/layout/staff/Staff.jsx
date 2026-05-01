import axios from "axios";
import { useEffect, useState, useRef } from "react";
import logo from "../../../assets/profile4.jpg";
import CommenHeader from "../../commenHeader/CommenHeader";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API;

const Staff = () => {
  const [staff, setStaff] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    role: "",
    address: "",
    state: "",
    country: "",
    pincode: "",
    email: "",
    phoneNumber: ""
  });

  const [error, setError] = useState({});
  const [data, setData] = useState([]); // ✅ fixed
  const [role, setRole] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const inputRef = useRef({}); // ✅ fixed

  // 🔹 Validation
  const Validation = () => {
    let newErrory = {};

    if (!staff.userName.trim()) newError.userName = "User Name required";
    if (!staff.firstName.trim()) newError.firstName = "First Name required";
    if (!staff.lastName.trim()) newError.lastName = "Last Name required";
    if (!staff.dateOfBirth) newError.dateOfBirth = "DOB required";
    if (!staff.role) newError.role = "Role required";
    if (!staff.address.trim()) newError.address = "Address required";
    if (!staff.state.trim()) newError.state = "State required";
    if (!staff.country.trim()) newError.country = "Country required";
    if (!staff.pincode.trim()) newError.pincode = "Pincode required";

    if (!staff.email.trim()) newError.email = "Email required";
    else if (!/^\S+@\S+\.\S+$/.test(staff.email))
      newError.email = "Invalid email";

    if (!staff.phoneNumber.trim())
      newError.phoneNumber = "Phone Number required";

    setError(newError);

    if (Object.keys(newError).length > 0) {
      const firstKey = Object.keys(newError)[0];
      inputRef.current[firstKey]?.focus();
      return false; // ❗ important
    }

    return true; // ❗ important
  };

  // 🔹 Add Staff
  const AddFrom = async (e) => {
    e.preventDefault();

    if (!Validation()) return;

    try {
      await axios.post(`${API}v1/addStaff`, staff);

      toast.success("Staff added successfully ✅");

      setStaff({
        userName: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        role: "",
        address: "",
        state: "",
        country: "",
        pincode: "",
        email: "",
        phoneNumber: ""
      });

    } catch (err) {
      console.log(err);
      toast.error("Failed to add staff ❌");
    }
  };

  // 🔹 Fetch Data
  const GetData = async () => {
    try {
      setIsLoading(true);

      const [staffRes, roleRes] = await Promise.all([
        axios.get(`${API}v1/getStaff`),
        axios.get(`${API}v1/getRole`)
      ]);

      setData(staffRes.data.data);
      setRole(roleRes.data.data);

    } catch (err) {
      console.log(err);
      toast.error("Failed to fetch data ❌");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  return (
    <>
      {isLoading ? (
        // 🔄 Loader
        <div className="flex justify-center items-center h-screen">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="min-h-screen px-2">
          <CommenHeader title={"Add Staff"} logo={logo} />

          <div className="flex justify-center items-center my-5 p-10 bg-white rounded-2xl shadow-2xl">
            <form
              className="p-5 w-full border rounded-lg flex flex-col gap-4"
              onSubmit={AddFrom}
            >
              <h1 className="font-bold text-center underline text-2xl">
                STAFF REGISTER FORM
              </h1>

              {/* 🔹 Basic Info */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">

                <input
                  ref={(el) => (inputRef.current.userName = el)}
                  value={staff.userName}
                  placeholder="User Name"
                  className="input"
                  onChange={(e) => {
                    setStaff({ ...staff, userName: e.target.value });
                    setError({ ...error, userName: "" });
                  }}
                />
                <p className="error">{error.userName}</p>

                <input
                  ref={(el) => (inputRef.current.firstName = el)}
                  value={staff.firstName}
                  placeholder="First Name"
                  className="input"
                  onChange={(e) => {
                    setStaff({ ...staff, firstName: e.target.value });
                    setError({ ...error, firstName: "" });
                  }}
                />
                <p className="error">{error.firstName}</p>

                <input
                  ref={(el) => (inputRef.current.lastName = el)}
                  value={staff.lastName}
                  placeholder="Last Name"
                  className="input"
                  onChange={(e) => {
                    setStaff({ ...staff, lastName: e.target.value });
                    setError({ ...error, lastName: "" });
                  }}
                />
                <p className="error">{error.lastName}</p>

                <input
                  type="date"
                  ref={(el) => (inputRef.current.dateOfBirth = el)}
                  value={staff.dateOfBirth}
                  className="input"
                  onChange={(e) => {
                    setStaff({ ...staff, dateOfBirth: e.target.value });
                    setError({ ...error, dateOfBirth: "" });
                  }}
                />
                <p className="error">{error.dateOfBirth}</p>

                <select
                  ref={(el) => (inputRef.current.role = el)}
                  value={staff.role}
                  className="input"
                  onChange={(e) => {
                    setStaff({ ...staff, role: e.target.value });
                    setError({ ...error, role: "" });
                  }}
                >
                  <option value="">Select Role</option>
                  {role.map((r) => (
                    <option key={r.id} value={r.role}>
                      {r.role}
                    </option>
                  ))}
                </select>
                <p className="error">{error.role}</p>
              </div>

              {/* 🔹 Submit */}
              <button className="bg-blue-500 text-white p-2 rounded-lg">
                Register
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Staff;