import Logo from "../../assets/homeLogo.png"
import backGround from "../../assets/backGround.jpg"
import StudentAdmission from "../student/StudentAdmission"
import { useNavigate } from "react-router-dom"
const HomeContainer = () => {
    const navigate=useNavigate()
    return (
        <>
            <div className="flex justify-between relative max-w-screen max-h-screen overflow-hidden">
                <div className="max-h-screen overflow-hidden">
                <img src={backGround} alt="" className="absolute inset-0 o" />
                </div>
                <div className=" m-2 z-50 flex">
                <div className="m-25">
                    <h1 className="text-6xl font-bold">Welcome To School Site🎓</h1>
                    <h1 className="bg-blue-500 w-fit rounded-lg p-2 m-5 cursor-pointer" onClick={()=>{navigate("/admission")}}>Apply For Adimission</h1>
                </div>
                <div className="flex m-10">
                    <img src={Logo} alt="" width={300} />
                </div>
            </div></div>
        </>
    )
}
export default HomeContainer