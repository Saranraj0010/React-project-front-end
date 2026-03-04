import axios from "axios";
import BackGroundImage from "../../../assets/background.jpg";
import { useLoginStore } from "../store/useLoginStore";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API;
const Login = () => {
    const { user, setUser, showPassword, ShowPassword, eyeShow, eyeHide } = useLoginStore();
    const [users, setUsers] = useState([]);
    const [admin, setAdmin] = useState([])
    const [staff, setStaff] = useState([])
    const [student, setStudent] = useState([])
    const navigate = useNavigate();
    const [error, setError] = useState({})
    const getUsers = async () => {
        try {
            const user = await axios.get(`${API}getSignUp`);
            const staff = await axios.get(`${API}getStaff`);
            const student = await axios.get(`${API}getStudent`);
            setUsers(user.data.data);
            setStaff(staff.data.data);
            setStudent(student.data.data);
            console.log(staff)
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);
    const Validation = () => {
        let newError = {};
        if (user.UserId.trim() === "") newError.UserId = "UserId requird"
        // if(user.UserId ===)
        if (user.Password.trim() === "") newError.Password = "Password requird"
        if (user.Password.length > 5) newError.Password = "Invalid Password"
        setError(newError)
        console.log(error)
        return Object.keys(newError).length === 0;
    }
    const Login = (e) => {
        e.preventDefault();
        // console.log(user)
        if (!Validation()) return
        const userResult = users.find(
            (item) =>
                item.UserName === user.UserId &&
                item.Password === user.Password
        );
        console.log(userResult, "admin")
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
        console.log(counsller, "staff")
        const studentResult = student.find(
            (item) =>
                item.userName === user.UserId &&
                item.password === user.Password
        );
        console.log(studentResult, "student")
        if (userResult) {
            console.log("User login success");
            navigate("/homePage/adminlayout");
            localStorage.setItem('counsllerProfile', JSON.stringify(""));
            localStorage.setItem('adminProfile', JSON.stringify(userResult));
            localStorage.setItem('staffProfile', JSON.stringify(""));
            localStorage.setItem('studentProfile', JSON.stringify(""));
        }
        else if (counsller) {
            // setProfileData(counsller);
            console.log("Counsller login success");
            navigate("/counsllerlayout");
            localStorage.setItem('adminProfile', JSON.stringify(""));
            localStorage.setItem('counsllerProfile', JSON.stringify(counsller));
            localStorage.setItem('staffProfile', JSON.stringify(""));
            localStorage.setItem('studentProfile', JSON.stringify(""));
        }
        else if (staffResult) {
            // setProfileData(staffResult);
            console.log("Staff login success");
            navigate("/homePage/stafflayout");
            localStorage.setItem('adminProfile', JSON.stringify(""));
            localStorage.setItem('counsllerProfile', JSON.stringify(""));
            localStorage.setItem('staffProfile', JSON.stringify(staffResult));
            localStorage.setItem('studentProfile', JSON.stringify(""));
        }
        else if (studentResult) {
            // setProfileData(studentResult);
            console.log("Student login success");
            navigate("/homePage/studentlayout");
            localStorage.setItem('adminProfile', JSON.stringify(""));
            localStorage.setItem('counsllerProfile', JSON.stringify(""));
            localStorage.setItem('staffProfile', JSON.stringify(""));
            localStorage.setItem('studentProfile', JSON.stringify(studentResult));

        }
        else {
            console.log("Invalid username or password");
        }
    };

    return (
        <div className="bg-gray-200/80">
            <div className="absolute inset-0">
                <img src={BackGroundImage} alt="bg" className="w-full h-full object-cover" />
            </div>

            <form onSubmit={Login} className="bg-white absolute top-24 flex flex-col right-35 p-6 rounded-xl shadow-2xl z-50">
                <h1 className="text-center text-2xl font-bold mb-4">User Login</h1>
                <div className=" flex flex-col">
                    <label>User Number</label>
                    <input className="w-60 h-10 border rounded-lg pl-3 mb-3" onChange={(e) => { setUser("UserId", e.target.value), setError({ ...error, UserId: "" }) }} />
                    {error.UserId && (
                        <p className="text-red-600 text-[10px]">{error.UserId}</p>
                    )}</div>
                <div className="relative flex flex-col">
                    <label>Password</label>
                    <div className="">
                        <input type={showPassword ? "text" : "password"} className="w-60 h-10 border rounded-lg pl-3 mb-4" onChange={(e) => { setUser("Password", e.target.value), setError({ ...error, Password: "" }) }} />
                        <button className=" absolute right-0 h-10 p-2" type="button" onClick={ShowPassword}><img width={20} src={showPassword ? eyeHide : eyeShow} /></button></div></div>
                {error.Password && (
                    <p className="text-red-600 text-[10px]">{error.Password}</p>
                )}

                <div className="flex gap-4 justify-center">
                    <Link to="/homePage" className="bg-red-500 text-white p-1.5 rounded-lg">Close</Link>
                    <button type="submit" className="bg-blue-500 text-white p-1.5 rounded-lg">Login</button>
                </div>
            </form>
        </div>
    );
};

export default Login;