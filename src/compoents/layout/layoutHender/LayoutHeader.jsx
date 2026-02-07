// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Link } from "react-router-dom"
import Logo from "../../../assets/logo.png"
import { useLoginStore } from "../store/useLoginStore"
import { useState } from "react"
const LayoutHeader = () => {
    const [show, setShow] = useState(false)
    const [profile, setProfile] = useState(false)
    const { profileData } = useLoginStore();
    console.log(profileData,"profile")
    return (
        <>
            <div className="flex justify-between items-center">
                {/* <RouterProvider router={Form}/> */}
                <div className="m-2"><img width={70} src={Logo} /></div>
                <div className="text-4xl font-extrabold"><h1>School Site</h1></div>
                <div className="flex gap-2 m-1">
                    <div className="" onClick={() => setProfile(true)}>Profile</div>
                    <button className="text-black mr-4 hover:underline hover:text-red-500" onClick={() => { setShow(true) }} >Logout</button>
                </div>
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
                        <div className=" absolute top-15 right-5">
                            <div className=" bg-gray-300 w-50 h-20 flex justify-center items-center gap-5 border rounded-lg">
                                <button onClick={() => setShow(false)} className="bg-blue-500 p-1 h-fit rounded-sm  hover:bg-blue-700 text-white">Cancel</button>
                                <button className="bg-red-500 p-1 h-fit rounded-sm text-white hover:bg-red-700"><Link to="/homePage">Yes,Logout</Link></button>
                            </div>
                        </div>
                    )
                }
            </div></>
    )
}
export default LayoutHeader