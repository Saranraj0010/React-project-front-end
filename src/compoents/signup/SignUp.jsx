import { useLoginStore } from "../layout/store/useLoginStore";
import BackGroundImage from "../../assets/background.jpg";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const API = import.meta.env.VITE_API;

const SignUp = () => {
    const [error, setError] = useState({});
    const {
        signUpUser,
        showPassword,
        showConfirmPassword,
        eyeShow,
        eyeHide,
        setSignUpUser,
        ShowPassword,
        ConfirmShowPassword
    } = useLoginStore();

    const navigate = useNavigate();

    const Add = async (e) => {
        try {
            e.preventDefault();
            const add = await axios.post(`${API}addSignUp`, signUpUser);

            if (add) {
                navigate("/homePage");
            }
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
        <div className="relative min-h-screen flex items-center justify-center">

            {/* Background */}
            <img
                src={BackGroundImage}
                alt="bg"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Form */}
            <form
                onSubmit={Add}
                className="relative z-10 bg-white w-[90%] sm:w-[380px] p-6 rounded-xl shadow-2xl grid gap-3"
            >
                <h1 className="text-center text-2xl font-bold font-mono">
                    Register Form
                </h1>

                {/* Username */}
                <div>
                    <label className="text-gray-600">User Name</label>
                    <input
                        name="UserName"
                        placeholder="Enter User Name"
                        onChange={(e) => {
                            setSignUpUser("UserName", e.target.value);
                            setError({ ...error, UserName: "" });
                        }}
                        className="w-full h-10 pl-3 border rounded-lg focus:outline-blue-600"
                    />
                    {error.UserName && (
                        <p className="text-red-600 text-xs">{error.UserName}</p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label className="text-gray-600">Phone Number</label>
                    <input
                        name="PhoneNumber"
                        placeholder="Enter Phone Number"
                        onChange={(e) => {
                            setSignUpUser("PhoneNumber", e.target.value);
                            setError({ ...error, PhoneNumber: "" });
                        }}
                        className="w-full h-10 pl-3 border rounded-lg focus:outline-blue-600"
                    />
                    {error.PhoneNumber && (
                        <p className="text-red-600 text-xs">{error.PhoneNumber}</p>
                    )}
                </div>

                {/* Password */}
                <div className="relative">
                    <label className="text-gray-600">Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        onChange={(e) => {
                            setSignUpUser("Password", e.target.value);
                            setError({ ...error, Password: "" });
                        }}
                        className="w-full h-10 pl-3 border rounded-lg focus:outline-blue-600"
                    />

                    <button
                        type="button"
                        className="absolute right-2 top-8"
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

                {/* Confirm Password */}
                <div className="relative">
                    <label className="text-gray-600">Confirm Password</label>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm Password"
                        onChange={(e) => {
                            setSignUpUser("ConfirmPassword", e.target.value);
                            setError({ ...error, ConfirmPassword: "" });
                        }}
                        className="w-full h-10 pl-3 border rounded-lg focus:outline-blue-600"
                    />

                    <button
                        type="button"
                        className="absolute right-2 top-8"
                        onClick={ConfirmShowPassword}
                    >
                        <img
                            width={20}
                            src={showConfirmPassword ? eyeHide : eyeShow}
                        />
                    </button>

                    {error.ConfirmPassword && (
                        <p className="text-red-600 text-xs">
                            {error.ConfirmPassword}
                        </p>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex justify-center gap-3 mt-2">
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
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;