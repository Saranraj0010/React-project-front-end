import { useLoginStore } from "../store/useLoginStore"
import BackGroundImage from "../../../assets/background.jpg"
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
const API = import.meta.env.VITE_API;

const SignUp = () => {
    const [error, setError] = useState({})
    const { signUpUser, showPassword, showConfirmPassword, eyeShow, eyeHide, setSignUpUser, ShowPassword, ConfirmShowPassword } = useLoginStore();
    const navigate=useNavigate()
    const Validation = () => {
        let newerror={};
        if(signUpUser.UserName.trim()==="")newerror.UserName="UserName requird"
        if(signUpUser.PhoneNumber.trim()==="")newerror.PhoneNumber="Phone Number requird"
        if(signUpUser.Password.trim()==="")newerror.Password="Password requird"
        if(signUpUser.ConfirmPassword.trim()==="")newerror.ConfirmPassword="Confirm Password requird"
        if(signUpUser.Password.length===signUpUser.ConfirmPassword.length) newerror.Match="Password Mismatch"
        setError(newerror)
        if(Object.keys(newerror).length>0){
            setTimeout(()=>{ setError(Object.keys(newerror).length>0)},1000*1000)
        }
    }
    const Add = async (e) => {
        try {
            e.preventDefault();
            // if (!Validation()) return
            const add = await axios.post(`${API}addSignUp`, signUpUser)
            console.log("hello")
            console.log(add, "add")
            console.log(signUpUser, "hello")
            if(add){
            navigate("/homePage")
            }
            

        }
        catch (err) {
            e.preventDefault();
            console.log(err, "Error")
        }
    }
    const Get = async () => {
        try {
            const get = await axios.get(`${API}getSignUp`)
            // console.log(get.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        Get()
    })

    return (
        <>
            <div className=" bg-gray-200/80">
                <div className="absolute inset-0">
                    <img
                        src={BackGroundImage}
                        alt="bg"
                        className="w-full h-screen object-cover"
                    />
                </div>

                <form action="" onSubmit={(e)=>Add(e)} className=" absolute top-15 left-100 bg-white p-6 grid grid-cols-1 gap-2 rounded-xl shadow-2xl z-50" >
                    <h1 className="text-center text-2xl font-mono font-bold">Register Form</h1>
                    <div className="grid grid-cols-1">
                        <label className="text-md text-gray-600">User Name:</label>
                        <input name="UserName" placeholder="Enter the UserName" onChange={(e) =>{ setSignUpUser("UserName", e.target.value),setError({...error,UserName:""}) }}className="pl-5 focus:outline-blue-600 text-sm md:text-md md:w-60 h-10 border rounded-lg hover:border-blue-500 shadow-xl" />
                        {
                            error.UserName && (
                                <p className="text-red-600 text-[10px]">{error.UserName}</p>

                            )
                        }
                    </div>
                    <div className="grid grid-cols-1">
                        <label className="text-md text-gray-600">Phone Number:</label>
                        <input name="PhoneNumber" placeholder="Enter the Phone Number" onChange={(e) =>{ setSignUpUser("PhoneNumber", e.target.value),setError({...error,PhoneNumber:""})}} className="pl-5 focus:outline-blue-600 text-sm md:text-md md:w-60 h-10 border rounded-lg hover:border-blue-500 shadow-xl" />
                         {
                            error.PhoneNumber && (
                                <p className="text-red-600 text-[10px]">{error.PhoneNumber}</p>

                            )
                        }
                    </div>
                    <div className="grid grid-cols-1 relative">
                        <label className="text-md text-gray-600">Password:</label>
                        <input name="Password" type={showPassword ? "text" : "password"} placeholder="Enter the Password" onChange={(e) => {setSignUpUser("Password", e.target.value),setError({...error,Password:""})}} className="pl-5 focus:outline-blue-600 text-sm md:text-md md:w-60 h-10 border rounded-lg hover:border-blue-500 shadow-xl" />
                         <button className=" absolute right-0 h-10 top-6  p-2" type="button" onClick={ShowPassword}><img width={20} src={showPassword ? eyeHide : eyeShow} /></button>
                        {
                            error.Password && (
                                <p className="text-red-600 text-[10px]">{error.Password}</p>

                            )
                        }
                         {
                            error.Match && (
                                <p className="text-red-600 text-[10px]">{error.Match}</p>

                            )
                        }
                       
                    </div>
                    <div className="grid grid-cols-1 relative">
                        <label className="text-md text-gray-600">Confirm Password:</label>
                        <input name="ConfirmPassword" type={showConfirmPassword ? "text" : "password"} placeholder="Enter the Confirm Password" onChange={(e) =>{ setSignUpUser("ConfirmPassword", e.target.value),setError({...error,ConfirmPassword:""})}} className="pl-5 focus:outline-blue-600 text-sm md:text-md md:w-60 h-10 border rounded-lg hover:border-blue-500 shadow-xl" />
                        <button className=" absolute right-0 h-10 top-6 p-2" type="button" onClick={ConfirmShowPassword}><img width={20} src={showConfirmPassword ? eyeHide : eyeShow} /></button>
                        {
                            error.ConfirmPassword && (
                                <p className="text-red-600 text-[10px]">{error.ConfirmPassword}</p>

                            )
                        }
                        
                    </div>
                    <div className="flex gap-3 justify-center">
                        <Link to="/homePage" className="bg-red-500 text-white p-1.5 rounded-lg cursor-pointer">Close</Link>
                        <button type="submit" className="bg-blue-500 text-white p-1.5 rounded-lg cursor-pointer">Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default SignUp