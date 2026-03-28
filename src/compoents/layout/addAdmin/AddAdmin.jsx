import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useLoginStore } from "../store/useLoginStore";
import CommenHeader from "../../commenHeader/CommenHeader";
import logo from "../../../assets/profile4.jpg"

const API = import.meta.env.VITE_API;

const AddAdmin = () => {
    const [error, setError] = useState({});
    const {
        signUpUser,
        showPassword,
        showConfirmPassword,
        eyeShow,
        eyeHide,
        setSignUpUser,
        ShowPassword,
        ConfirmShowPassword,
        resetSignUp
    } = useLoginStore();

    const Validation = () => {
        let newError = {};

        if (signUpUser.UserName.trim() === "") {
            toast.error("UserId required")
            newError.UserName = "UserId required";
        }
        if (signUpUser.PhoneNumber.trim() === "") {
            toast.error("Phone Number required")
            newError.PhoneNumber = "Phone Number required";
        }
        else if (!/^[0-9]{10}$/.test(signUpUser.PhoneNumber)) {
            toast.error("Invalid Phone Number");
            newError.PhoneNumber = "Invalid Phone Number";
        }
        if (signUpUser.Password.trim() === "") {
            toast.error("Password required")
            newError.Password = "Password required";
        }
        if (!signUpUser.Password.value == signUpUser.ConfirmPassword.value) {
            toast.error("Password MisMatch")
            return
        }
        if (signUpUser.ConfirmPassword.trim() === "") {
            toast.error("Confirm Password required")
            newError.ConfirmPassword = "Confirm Password required";
        }
        setError(newError);
        return Object.keys(newError).length === 0;
    };

    const Add = async (e) => {
        try {
            e.preventDefault();
            if (!Validation()) return;
            const add = await axios.post(`${API}addSignUp`, signUpUser);
            resetSignUp()
        } catch (err) {
            console.log(err);
        }
    };

    const Get = async () => {
        try {
            await axios.get(`${API}getSignUp`);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        Get();
    }, []);

    return (
        <div className="flex flex-col px-2 justify-center items-center">
            <CommenHeader title={"Add Admin"} logo={logo} />
            <form onSubmit={Add} className="bg-white p-6 my-5 rounded-xl shadow-2xl flex flex-col gap-3">
                <h1 className="text-center text-2xl font-bold font-mono">
                    Add Admin
                </h1>
                <div>
                    <label className="text-gray-600">Admin User Name</label>
                    <input name="UserName" placeholder="Enter User Name" value={signUpUser.UserName}
                        onChange={(e) => {
                            setSignUpUser("UserName", e.target.value);
                            setError({ ...error, UserName: "" });
                        }} className="w-full h-10 pl-3 border rounded-lg focus:outline-blue-600" />
                    {error.UserName && (
                        <p className="text-red-600 text-xs">{error.UserName}</p>
                    )}
                </div>
                <div>
                    <label className="text-gray-600">Phone Number</label>
                    <input name="PhoneNumber" placeholder="Enter Phone Number" value={signUpUser.PhoneNumber}
                        onChange={(e) => {
                            setSignUpUser("PhoneNumber", e.target.value);
                            setError({ ...error, PhoneNumber: "" });
                        }} className="w-full h-10 pl-3 border rounded-lg focus:outline-blue-600" />
                    {error.PhoneNumber && (
                        <p className="text-red-600 text-xs">{error.PhoneNumber}</p>
                    )}
                </div>
                <div className="relative">
                    <label className="text-gray-600">Password</label>
                    <input value={signUpUser.Password} type={showPassword ? "text" : "password"} placeholder="Enter Password"
                        onChange={(e) => {
                            setSignUpUser("Password", e.target.value);
                            setError({ ...error, Password: "" });
                        }} className="w-full h-10 pl-3 border rounded-lg focus:outline-blue-600" />
                    <button type="button" className="absolute right-2 top-8" onClick={ShowPassword}>
                        <img width={20} className="cursor-pointer" src={showPassword ? eyeHide : eyeShow} />
                    </button>
                    {error.Password && (
                        <p className="text-red-600 text-xs">{error.Password}</p>
                    )}
                </div>
                <div className="relative">
                    <label className="text-gray-600">Confirm Password</label>
                    <input value={signUpUser.ConfirmPassword} type={showConfirmPassword ? "text" : "password"} placeholder="Confirm Password"
                        onChange={(e) => {
                            setSignUpUser("ConfirmPassword", e.target.value);
                            setError({ ...error, ConfirmPassword: "" });
                        }} className="w-full h-10 pl-3 border rounded-lg focus:outline-blue-600" />
                    <button type="button" className="absolute right-2 top-8" onClick={ConfirmShowPassword}>
                        <img width={20} className="cursor-pointer" src={showConfirmPassword ? eyeHide : eyeShow} />
                    </button>
                    {error.ConfirmPassword && (
                        <p className="text-red-600 text-xs">
                            {error.ConfirmPassword}
                        </p>
                    )}
                </div>
                <div className="flex justify-center gap-3 mt-2">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-1.5 rounded-lg">
                        Add Admin
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAdmin;