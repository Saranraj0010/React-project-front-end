import axios from "axios";
import BackGroundImage from"../../../assets/background.jpg"
import { useLoginStore } from "../store/useLoginStore"
import { useEffect } from "react";
const API = import.meta.env.VITE_API;

const Login = () => {
    const{user,setUser,Login}=useLoginStore()
    // console.log(user)
 const Get = async ()=>{
        try{
            const get=await axios.get(`${API}getSignUp`)
            console.log(get)
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
    Get()

},[])
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

            <form action="" onSubmit={Login} className="bg-white p-4 grid grid-cols-1 gap-2 rounded-xl shadow-2xl z-50" >
                <h1 className="text-center text-2xl font-mono font-bold">User Login</h1>
                <div className="grid grid-cols-1">
                    <label>User Number</label>
                    <input name="UserId" placeholder="Enter the Number" onChange={(e)=>setUser("UserId",e.target.value)} className="pl-5 focus:outline-blue-600 text-sm md:text-lg md:w-60 h-10 border rounded-lg hover:border-blue-500 shadow-xl" />
                </div>
                <div className="grid grid-cols-1">
                    <label>Password</label>
                    <input name="Password" placeholder="Enter the Password" onChange={(e)=>setUser("Password",e.target.value)} className="pl-5 focus:outline-blue-600 text-sm md:text-lg md:w-60 h-10 border rounded-lg hover:border-blue-500 shadow-xl"/>
                </div>
                <div className="text-center">
                <button type="submit" className="bg-blue-500 text-white p-1.5 rounded-lg cursor-pointer">Login</button>
                </div>
            </form>
        </div>
        </>
    )
}
export default Login