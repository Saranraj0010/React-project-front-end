import Logo from "../../assets/homeLogo.png"
import backGround from "../../assets/backGround.jpg"
const HomeContainer = () => {
    return (
        <>
            <div className="flex justify-between relative max-w-screen max-h-screen">
                <div className="max-h-screen overflow-hidden">
                <img src={backGround} alt="" className="absolute inset-0 o" />
                </div>
                <div className="m-10 z-50 flex">
                <div className="m-15">
                    <h1 className="text-6xl font-bold">Welcome To School Site🎓</h1>
                    <h1 className="bg-blue-500 w-fit rounded-lg p-2 m-5">Apply For Adimission</h1>
                </div>
                <div className="flex m-10">
                    <img src={Logo} alt="" width={300} />
                </div>
            </div></div>
        </>
    )
}
export default HomeContainer