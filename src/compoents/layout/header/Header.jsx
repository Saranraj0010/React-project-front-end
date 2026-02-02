// import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Logo from "../../../assets/icon.png"
const Header = () => {
//     let router = createBrowserRouter([
//   {
//     path: "/",
//     Component: Root,
//     loader: loadRootData,
//   },
// ]);
    return(
        <>
        <div className="flex justify-between items-center">
            {/* <RouterProvider router={Form}/> */}
            <div className="m-2"><img width={70} src={Logo}/></div>
            <div className="text-4xl font-extrabold"><h1>React Project</h1></div>
            <div className="flex gap-2 m-1">
                <button className="p-1 bg-blue-500 rounded-lg text-white" >Signin</button>
                <button className="p-1 bg-blue-500 rounded-lg text-white">SignUp</button>
            </div>
        </div></>
    )
}
export default Header