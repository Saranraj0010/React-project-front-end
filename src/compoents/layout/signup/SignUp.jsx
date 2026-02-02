import { useLoginStore } from "../store/useLoginStore"
import BackGroundImage from"../../../assets/background.jpg"
import axios from "axios";
import { useEffect } from "react";
const API = import.meta.env.VITE_API;

const SignUp = () => {
    const{ SignUpUser, showPassword, showConfirmPassword,eyeShow,eyeHide ,SignUp ,setSignUpUser,ShowPassword,ConfirmShowPassword }=useLoginStore();
    // console.log(show)
   
    const Get = async ()=>{
        try{
            const get=await axios.get(`${API}getSignUp`)
            console.log(get.data)
        }
        catch(err){
            console.log(err)
        }
    }
    Get()
     // useEffect(()=>(
    //     Get()
    // ),[])

    
    return(
        <>
        <div className="flex justify-center items-center bg-gray-200/80 h-screen">
                <div className="absolute inset-0">
                  <img
                    src={BackGroundImage}
                    alt="bg"
                    className="w-full h-full object-cover"
                  />
                </div>
        
                    <form action="" onSubmit={SignUp} className="bg-white p-6 grid grid-cols-1 gap-2 rounded-xl shadow-2xl z-50" >
                        <h1 className="text-center text-2xl font-mono font-bold">Register Form</h1>
                        <div className="grid grid-cols-1">
                            <label className="text-md text-gray-600">User Name:</label>
                            <input name="UserName" placeholder="Enter the UserName" onChange={(e)=>setSignUpUser("UserName",e.target.value)} className="pl-5 focus:outline-blue-600 text-sm md:text-md md:w-60 h-10 border rounded-lg hover:border-blue-500 shadow-xl" />
                        </div>
                        <div className="grid grid-cols-1">
                            <label className="text-md text-gray-600">Phone Number:</label>
                            <input name="PhoneNumber" placeholder="Enter the Phone Number" onChange={(e)=>setSignUpUser("PhoneNumber",e.target.value)} className="pl-5 focus:outline-blue-600 text-sm md:text-md md:w-60 h-10 border rounded-lg hover:border-blue-500 shadow-xl"/>
                        </div>
                        <div className="grid grid-cols-1 relative">
                            <label className="text-md text-gray-600">Password:</label>
                            <input name="Password" type={showPassword?"text":"password"} placeholder="Enter the Password" onChange={(e)=>setSignUpUser("Password",e.target.value)} className="pl-5 focus:outline-blue-600 text-sm md:text-md md:w-60 h-10 border rounded-lg hover:border-blue-500 shadow-xl"/>
                            <button className=" absolute right-0 h-10 border top-6 rounded-r-md bg-gray-300 p-2" type="button" onClick={ShowPassword}><img width={20} src={showPassword?eyeHide:eyeShow}/></button>
                        </div>
                        <div className="grid grid-cols-1 relative">
                            <label className="text-md text-gray-600">Confirm Password:</label>
                            <input name="ConfirmPassword" type={showConfirmPassword?"text":"password"} placeholder="Enter the Confirm Password" onChange={(e)=>setSignUpUser("ConfirmPassword",e.target.value)} className="pl-5 focus:outline-blue-600 text-sm md:text-md md:w-60 h-10 border rounded-lg hover:border-blue-500 shadow-xl"/>
                            <button className=" absolute right-0 h-10 border top-6 rounded-r-md bg-gray-300 p-2" type="button" onClick={ConfirmShowPassword}><img width={20} src={showConfirmPassword?eyeHide:eyeShow}/></button>
                        </div>
                        <div className="text-center">
                        <button type="submit"  className="bg-blue-500 text-white p-1.5 rounded-lg cursor-pointer">Register</button>
                        </div>
                    </form>
                </div>
        </>
    )
}
export default SignUp