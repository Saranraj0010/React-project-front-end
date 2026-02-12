// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Link } from "react-router-dom"
import Logo from "../../../assets/logo.png"
import { useLoginStore } from "../store/useLoginStore"
import light from "../../../assets/LightMode.png"
import dark from "../../../assets/darkMode.png"
const Header = () => {
    const { bg, setBg,darkMode,setDarkMode } = useLoginStore()
    return (
        <>
            <div className={`flex justify-between items-center shadow ${darkMode ? "bg-black text-white shadow shadow-white" : "bg-blue-800"}`}>
                {/* <RouterProvider router={Form}/> */}
                <div className=" flex justify-center items-center">
                    <div className="m-2"><img width={70} src={Logo} /></div>
                    <div className="text-4xl font-extrabold"><h1>School Site</h1></div>
                </div>
                <div className="flex gap-2 m-1">
                    <div className="m-2" onClick={() => { setDarkMode(!darkMode) }}>{darkMode ? <img width={70} src={light} /> : <img width={70} src={dark} />}</div>
                    <div className=" flex gap-4 items-center m-1 mx-5">
                        <button className={`${darkMode?"text-black bg-white hover:bg-gray-500 hover:text-white":"bg-blue-500 text-white hover:bg-red-700"} p-1 rounded-lg `} ><Link to="/login">Login</Link></button>
                        <button className={`${darkMode?"text-black hover:bg-gray-500 hover:text-white bg-white":"bg-blue-500 text-white hover:bg-red-700"} p-1 rounded-lg `}><Link to="/signUp">Signup</Link></button>
                    </div>

                </div>
            </div></>
    )
}
export default Header