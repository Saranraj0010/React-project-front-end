// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Link } from "react-router-dom"
import Logo from "../../../assets/icon.png"
import { useLoginStore } from "../store/useLoginStore"
const Header = () => {
    const{bg,setBg}=useLoginStore()
    return(
        <>
        <div className="flex justify-between items-center">
            {/* <RouterProvider router={Form}/> */}
            <div className="m-2"><img width={70} src={Logo}/></div>
            <div className="text-4xl font-extrabold"><h1>School Site</h1></div>
            <div className="flex gap-2 m-1">
                <button className="p-1 bg-blue-500 rounded-lg text-white" ><Link to="/login">Login</Link></button>
                <button className="p-1 bg-blue-500 rounded-lg text-white"><Link to="/signUp">Signup</Link></button>
            </div>
        </div></>
    )
}
export default Header