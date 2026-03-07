import axios from "axios";
import BackGroundImage from "../../assets/background.jpg";
import { useLoginStore } from "../layout/store/useLoginStore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API;

const Login = () => {
    const { user, setUser, showPassword, ShowPassword, eyeShow, eyeHide } = useLoginStore();

    const [users, setUsers] = useState([]);
    const [staff, setStaff] = useState([]);
    const [student, setStudent] = useState([]);
    const [error, setError] = useState({});

    const navigate = useNavigate();

    const getUsers = async () => {
        try {
            const user = await axios.get(`${API}getSignUp`);
            const staff = await axios.get(`${API}getStaff`);
            const student = await axios.get(`${API}getStudent`);

            setUsers(user.data.data);
            setStaff(staff.data.data);
            setStudent(student.data.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const Validation = () => {
        let newError = {};

        if (user.UserId.trim() === "") newError.UserId = "UserId required";
        if (user.Password.trim() === "") newError.Password = "Password required";

        setError(newError);
        return Object.keys(newError).length === 0;
    };

    const Login = (e) => {
        e.preventDefault();

        if (!Validation()) return;

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

            {/* Background */}
            <img
                src={BackGroundImage}
                alt="bg"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Login Form */}
            <form
                onSubmit={Login}
                className="relative z-10 bg-white w-[90%] sm:w-[380px] p-6 rounded-xl shadow-2xl flex flex-col gap-3"
            >
                <h1 className="text-center text-2xl font-bold">User Login</h1>

                {/* UserId */}
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

                {/* Password */}
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

                {/* Buttons */}
                <div className="flex justify-center gap-4 mt-2">
                    <Link
                        to="/homePage"
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