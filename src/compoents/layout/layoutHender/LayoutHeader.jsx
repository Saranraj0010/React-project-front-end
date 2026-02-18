import { Link } from "react-router-dom"
import Logo from "../../../assets/logo.png"
import { useLoginStore } from "../store/useLoginStore"
import { useState } from "react"
import light from "../../../assets/LightMode.png"
import dark from "../../../assets/darkMode.png"
import Settings from "../../../assets/settings.png"
import Input from "../../../Elaments/Input"
import { LabelName } from "../../../Elaments/LabelName"
import axios from "axios"
import { useEffect } from "react"
const API = import.meta.env.VITE_API;

const LayoutHeader = () => {
    const [show, setShow] = useState(false)
    const [profile, setProfile] = useState(false)
    const [password, setPassword] = useState(false)
    const {profileData, darkMode, setDarkMode } = useLoginStore();
    const [data, setData] = useState([])
     const AddFrom = async (e) => {
        try {
            e.preventDefault();
            if (!Validation()) return
            const add = await axios.post(`${API}addStaff`, staff)
            console.log(add)
        }
        catch (err) {
            console.log(err)
        }
    }
    const fullData=data.filter((item)=>item.id===profileData.id)
    const GetData = async () => {
        try {
            const get = await axios.get(`${API}getStaff`)
            setData(get.data.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        GetData()
    }, [])
    return (
        <>
            <div className={`flex justify-between items-center shadow ${darkMode ? "bg-black text-white shadow shadow-white" : "bg-blue-800"}`}>
                <div className="flex justify-center items-center gap-5 mx-5">
                    {/* <RouterProvider router={Form}/> */}
                    <div className="m-2"><img width={70} src={Logo} /></div>
                    <div className="text-4xl font-extrabold"><h1>School Site</h1></div>
                </div>
                <div className="flex items-center gap-4 w-fit m-1 mx-5">
                    <div className="m-2 cursor-pointer" onClick={() => { setDarkMode(!darkMode) }}>{darkMode ? <img width={70} src={light} /> : <img width={70} src={dark} />}</div>
                    <div className="cursor-pointer" onClick={()=>{}}>
                        <img src={Settings} onClick={()=>setPassword(!password)} className=" cursor-pointer"  />
                    </div>
                    <div className=" flex gap-4 items-center m-1 mx-5">
                        <div className=" hover:underline  hover:text-white cursor-pointer" onClick={() => setProfile(true)}>Profile</div>
                        <button className="hover:underline hover:text-red-500 cursor-pointer" onClick={() => { setShow(true) }} >Logout</button>
                    </div>
                </div>
                {
                    password&&(
                        <div className=" absolute top-15 right-50">
                            <div className="bg-white w-fit h-fit flex justify-center items-center gap-5 border border-gray-500 rounded-lg p-5">
                                <LabelName>Update the Password:</LabelName>
                                <Input value={data.password} />
                            </div>
                        </div>
                    )
                }
                {
                    profile && (
                        <div className=" absolute top-15 right-25">
                            <div className="bg-white w-fit h-fit flex justify-center items-center gap-5 border rounded-lg">
                                hello{
                                    profileData.map((item) => (<div className="px-2 py-5" key={item.UserName}>hello
                                        <img src={close} alt="" onClick={() => setProfile(false)} />
                                        <p>User Name:  {item.UserName}</p>
                                        <p>User Number:  {item.PhoneNumber}</p>
                                    </div>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
                {
                    show && (
                        <div className=" absolute bg-black/50 flex items-center justify-center inset-0 h-screen w-screen">
                            <div className=" bg-gray-300 p-5 flex flex-col justify-center items-center gap-3 border rounded-lg">
                                <h1>You Want To Logout?</h1>
                                <div className="flex gap-3">
                                    <button onClick={() => setShow(!show)} className="bg-blue-400 p-1 h-fit rounded-sm  hover:bg-blue-700 text-white">Cancel</button>
                                    <button className="bg-red-400 p-1 h-fit rounded-sm text-white hover:bg-red-700"><Link to="/homePage">Yes,Logout</Link></button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div></>
    )
}
export default LayoutHeader