import { Link } from "react-router-dom"
import Logo from "../../../assets/logo.png"
import { useLoginStore } from "../store/useLoginStore"
import { useState } from "react"
import light from "../../../assets/LightMode.png"
import dark from "../../../assets/darkMode.png"
import settings from "../../../assets/settings.png"
import Input from "../../../Elaments/Input"
import { LabelName } from "../../../Elaments/LabelName"
import axios from "axios"
import close from "../../../assets/close.png"
import { useEffect } from "react"
import menu from "../../../assets/menu.png"
const API = import.meta.env.VITE_API;

const LayoutHeader = () => {
    const [show, setShow] = useState(false)
    const [profile, setProfile] = useState(false)
    const [profileData, setProfileData] = useState(false)
    const [password, setPassword] = useState(false)
    const { darkMode, setDarkMode } = useLoginStore();
    const [data, setData] = useState([])
    // const fullData=data.find((item)=>item.id===profileData.id)
    const GetData = async () => {
        try {
            const get = await axios.get(`${API}v1/getStaff`)
            setData(get.data.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        GetData()
        const storedData = localStorage.getItem('staffProfile');
        setProfileData(JSON.parse(storedData))
    }, [])
    return (
        <>
            <div className={`flex justify-between items-center shadow ${darkMode ? "bg-black/80 text-white shadow shadow-white" : "bg-blue-800"}`}>
                <div className="flex justify-center items-center gap-5 mx-5">
                    {/* <RouterProvider router={Form}/> */}
                    <div className="m-2"><img width={70} src={Logo} /></div>
                    <div className="text-4xl font-extrabold"><h1>School Site</h1></div>
                </div>
                <div className="flex items-center gap-4 w-fit m-1 mx-5">
                    <div className="m-2 cursor-pointer" onClick={() => { setDarkMode(!darkMode) }}>{darkMode ? <img width={70} src={light} /> : <img width={70} src={dark} />}</div>
                <img src={menu} alt="" />
                    <div className="cursor-pointer" onClick={() => { }}>
                        <img src={settings} onClick={() => setPassword(!password)} className=" cursor-pointer" />
                    </div>
                    <div className=" flex gap-4 items-center m-1 mx-5">
                        <div className=" hover:underline  hover:text-white cursor-pointer" onClick={() => setProfile(true)}>Profile</div>
                        <button className="hover:underline hover:text-red-500 cursor-pointer" onClick={() => { setShow(true) }} >Logout</button>
                    </div>
                </div>
                {
                    password && (
                        <div className=" absolute top-22 right-50">
                            <div className="bg-white w-fit h-fit flex justify-center items-center gap-5 border border-gray-500 rounded-lg p-5">
                                <LabelName>Update the Password:</LabelName>
                                <Input value={data.password} />
                            </div>
                        </div>
                    )
                }
                {
                    profile && (
                        <div className=" absolute bg-black/50 flex items-center justify-center inset-0 h-screen w-screen">
                            <div className=" bg-gray-300 p-5 flex relative flex-col justify-center items-center gap-3 border rounded-lg">
                                <div className="bg-red-500 absolute top-2 right-2" onClick={()=>{setProfile(false)}}><img src={close} alt="" /></div>
                                <div className="flex font-bold">
                                    UserName:<p className="font-light mx-3">{profileData.userName}</p>
                                </div>
                                <div className="flex font-bold">
                                    Name:<p className="font-light mx-3">{profileData.firstName}{profileData.lastName}</p>
                                </div>
                                <div className="flex font-bold">
                                    DateOfBirth:<p className="font-light mx-3">{profileData.dateOfBirth}</p>
                                </div>
                                <div className="flex font-bold">
                                    Role:<p className="font-light mx-3">{profileData.role}</p>
                                </div>
                                <div className="flex font-bold">
                                    Phone Number: <p className="font-light mx-3">{profileData.phoneNumber}</p>
                                </div>
                                <div className="flex font-bold">
                                    Email:<p className="font-light mx-3">{profileData.email}</p>
                                </div>
                                <div className="flex font-bold">
                                    Address:<p className="font-light mx-3">{profileData.address}{profileData.state}</p>
                                </div>
                                <div className="flex font-bold">
                                    Country:<p className="font-light mx-3">{profileData.country}</p>
                                </div>
                                <div className="flex font-bold">
                                    Pincode:<p className="font-light mx-3">{profileData.pincode}</p>
                                </div>
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