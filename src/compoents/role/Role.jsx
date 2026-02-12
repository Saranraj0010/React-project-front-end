import CommenHeader from "../commenHeader/CommenHeader"
import logo from "../../assets/profile4.jpg"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"
const API = import.meta.env.VITE_API;

const Role = () => {
    const [user, setUser] = useState({
        role:""
    })
    const [data, setData] = useState([])
    // console.log(user)
    const Submit = async (e) => {
        try {
            e.preventDefault();
            // console.log(user)
            const add = await axios.post(`${API}addRole`, user)
            setUser({standard:""})
            // console.log(add)
            GetForm()
        }
        catch (err) {
            console.log(err)
        }

    }
    const GetForm = async () => {
        try {
            const get = await axios.get(`${API}getRole`)
            // console.log(get)
            setData(get.data.data)
        }
        catch (err) {
            console.log(err, "hello")
        }
    }
    useEffect(() => {
        GetForm()
    }, [])
    // console.log(data)
    return (
        <>
            <div className="bg-white rounded-lg shadow p-1 m-2">
                <CommenHeader title={"Role"} logo={logo} />
                <div className="bg-white p-5 m-5 shadow-2xl rounded-2xl">
                    <form action="" className="flex flex-col" onSubmit={(e) => Submit(e)}>
                        <label>Role:</label>
                        <input type="text" value={user.role} className="pl-5 focus:outline-blue-600  text-sm md:text-lg max-w-full h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => {setUser({...user,role:e.target.value})}} />
                        <button className="bg-blue-500 mt-2 text-white p-2 max-w-full rounded-lg cursor-pointer" type="Submit">Submit</button>
                    </form>
                </div>
                <div className="bg-white p-5 m-5 shadow-2xl flex justify-center items-center rounded-2xl">
                    <table className="text-center">
                        <thead>
                            <tr>
                                <td className="p-2 border">S.No</td>
                                <td className="p-2 border">Role</td>
                                <td className="p-2 border">Action</td>
                            </tr>

                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr className="p-2 border" key={item.id}>
                                    <td className="p-2 border">{index + 1}</td>
                                    <td className="p-2 border" >{item.role}</td>
                                    <td className="p-2 border">
                                        <button className="bg-blue-700 m-1 p-1 rounded-lg text-white">edit</button>
                                        <button className="bg-red-700 m-1 p-1 rounded-lg text-white">Update</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default Role