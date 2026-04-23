// import axios from "axios";
// import BackGroundImage from "../../assets/background.jpg";
// import { useLoginStore } from "../layout/store/useLoginStore";
// import { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// const API = import.meta.env.VITE_API;
// const Login = () => {
//     const { user, setUser, showPassword, ShowPassword, eyeShow, eyeHide } = useLoginStore();
//     const [users, setUsers] = useState([]);
//     const [staff, setStaff] = useState([]);
//     const [student, setStudent] = useState([]);
//     const [error, setError] = useState({});
//     const navigate = useNavigate();
//     const getUsers = async () => {
//         try {
//             const user = await axios.get(`${API}getSignUp`);
//             console.log(user)
//             const staff = await axios.get(`${API}getStaff`);
//             const student = await axios.get(`${API}getStudent`);

//             setUsers(user.data.data);
//             setStaff(staff.data.data);
//             setStudent(student.data.data);
//         } catch (err) {
//             console.error(err);
//         }
//     };
//     useEffect(() => {
//         getUsers();
//     }, []);
//     const Validation = () => {
//         let newError = {};
//         if (user.UserId.trim() === "") {
//             toast.error("UserId required")
//             newError.UserId = "UserId required";
//         }
//         if (user.Password.trim() === "") {
//             toast.error("Password required")
//             newError.Password = "Password required";
//         }
//         setError(newError);
//         return Object.keys(newError).length === 0;
//     };
//     const Login = async (e) => {
//         e.preventDefault();
//         if(!Validation()) return;
//         try {
//             const res = await axios.post(`${API}addLogin`, {
//                 UserName: user.UserId,
//                 Password: user.Password
//             });

//             const userData = res.data.data;
//             console.log(userData)
//             // Role-based navigation
//             if (userData.role === "admin") {
//                 navigate("/homePage/adminlayout");
//             } else if (userData.role === "staff") {
//                 navigate("/homePage/stafflayout");
//             } else if (userData.role === "student") {
//                 navigate("/homePage/studentlayout");
//             }

//             localStorage.setItem("user", JSON.stringify(userData));

//         } catch (err) {
//             toast.error(err.response?.data?.message || "Login failed");
//         }
//     };
//     return (
//         <div className="relative min-h-screen flex items-center justify-center">
//             <img
//                 src={BackGroundImage}
//                 alt="bg"
//                 className="absolute inset-0 w-full h-full object-cover"
//             />
//             <form
//                 onSubmit={Login}
//                 className="relative z-10 bg-white w-[90%] sm:w-95 p-6 rounded-xl shadow-2xl flex flex-col gap-3"
//             >
//                 <h1 className="text-center text-2xl font-bold">User Login</h1>
//                 <div className="flex flex-col">
//                     <label>User Number</label>
//                     <input
//                         className="w-full h-10 border rounded-lg pl-3"
//                         onChange={(e) => {
//                             setUser("UserId", e.target.value);
//                             setError({ ...error, UserId: "" });
//                         }}
//                     />
//                     {error.UserId && (
//                         <p className="text-red-600 text-xs">{error.UserId}</p>
//                     )}
//                 </div>
//                 <div className="flex flex-col relative">
//                     <label>Password</label>
//                     <input
//                         type={showPassword ? "text" : "password"}
//                         className="w-full h-10 border rounded-lg pl-3"
//                         onChange={(e) => {
//                             setUser("Password", e.target.value);
//                             setError({ ...error, Password: "" });
//                         }}
//                     />
//                     <button
//                         className="absolute right-2 top-8"
//                         type="button"
//                         onClick={ShowPassword}
//                     >
//                         <img
//                             width={20}
//                             src={showPassword ? eyeHide : eyeShow}
//                         />
//                     </button>
//                     {error.Password && (
//                         <p className="text-red-600 text-xs">{error.Password}</p>
//                     )}
//                 </div>
//                 <div className="flex justify-center gap-4 mt-2">
//                     <Link
//                         to="/homePage"
//                         className="bg-red-500 text-white px-4 py-1.5 rounded-lg"
//                     >
//                         Close
//                     </Link>
//                     <button
//                         type="submit"
//                         className="bg-blue-500 text-white px-4 py-1.5 rounded-lg"
//                     >
//                         Login
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };
// export default Login;

import axios from "axios";
import BackGroundImage from "../../../assets/background.jpg";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLoginStore } from "../../layout/store/useLoginStore";

const API = import.meta.env.VITE_API;

const Login = () => {
    const { user, setUser, showPassword, ShowPassword, eyeShow, eyeHide } = useLoginStore();

    const [users, setUsers] = useState([]);
    const [staff, setStaff] = useState([]);
    const [student, setStudent] = useState([]);
    const [error, setError] = useState({});

    const navigate = useNavigate();

   useEffect(() => {
    const fetchData = async () => {
        try {
            const userRes = await axios.get(`${API}getSignUp`);
            const staffRes = await axios.get(`${API}getStaff`);
            const studentRes = await axios.get(`${API}getStudent`);

            setUsers(userRes.data.data);
            setStaff(staffRes.data.data);
            setStudent(studentRes.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    fetchData();
}, []);

    const Validation = () => {
        let newError = {};

        if (user.UserId.trim() === ""){ 
            toast.error("UserId required")
            newError.UserId = "UserId required";

        }
        if (user.Password.trim() === ""){ 
            toast.error("Password required")
            newError.Password = "Password required";
}
        setError(newError);
        return Object.keys(newError).length === 0;
    };

    const Login = (e) => {
        e.preventDefault();

        // if (!Validation()) return;

        const userResult = users.find(
            (item) =>
                item.UserName === user.UserId &&
                item.Password === user.Password
        );

        const counsller = staff.find(
            (item) =>
                item.userName === user.UserId &&
                item.password === user.Password &&
                item.role === "Counsller"
        );

        const staffResult = staff.find(
            (item) =>
                item.userName === user.UserId &&
                item.password === user.Password
        );

        const studentResult = student.find(
            (item) =>
                item.userName === user.UserId &&
                item.password === user.Password
        );

        if (userResult) {
            navigate("/homePage/adminlayout");
            localStorage.setItem("adminProfile", JSON.stringify(userResult));
        } else if (counsller) {
            navigate("/counsllerlayout");
            localStorage.setItem("counsllerProfile", JSON.stringify(counsller));
        } else if (staffResult) {
            navigate("/homePage/stafflayout");
            localStorage.setItem("staffProfile", JSON.stringify(staffResult));
        } else if (studentResult) {
            navigate("/homePage/studentlayout");
            localStorage.setItem("studentProfile", JSON.stringify(studentResult));
        } else {
            alert("Invalid Username or Password");
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center">
            <img
                src={BackGroundImage}
                alt="bg"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <form
                onSubmit={Login}
                className="relative z-10 bg-white w-[90%] sm:w-95 p-6 rounded-xl shadow-2xl flex flex-col gap-3"
            >
                <h1 className="text-center text-2xl font-bold">User Login</h1>
                <div className="flex flex-col">
                    <label>User Number</label>
                    <input
                        className="w-full h-10 border rounded-lg pl-3"
                        onChange={(e) => {
                            setUser("UserId", e.target.value);
                            setError({ ...error, UserId: "" });
                        }}
                    />

                    {error.UserId && (
                        <p className="text-red-600 text-xs">{error.UserId}</p>
                    )}
                </div>
                <div className="flex flex-col relative">
                    <label>Password</label>

                    <input
                        type={showPassword ? "text" : "password"}
                        className="w-full h-10 border rounded-lg pl-3"
                        onChange={(e) => {
                            setUser("Password", e.target.value);
                            setError({ ...error, Password: "" });
                        }}
                    />

                    <button
                        className="absolute right-2 top-8"
                        type="button"
                        onClick={ShowPassword}
                    >
                        <img
                            width={20}
                            src={showPassword ? eyeHide : eyeShow}
                        />
                    </button>

                    {error.Password && (
                        <p className="text-red-600 text-xs">{error.Password}</p>
                    )}
                </div>

                <div className="flex justify-center gap-4 mt-2">
                    <Link
                        to="/"
                        className="bg-red-500 text-white px-4 py-1.5 rounded-lg"
                    >
                        Close
                    </Link>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-1.5 rounded-lg"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;