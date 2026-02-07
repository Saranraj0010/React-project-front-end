import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import Delimage from "../../assets/trash.png"
import EditImg from "../../assets/edit.png"
const API = import.meta.env.VITE_API;

const TotalStaff = () => {
    const[data,setData]=useState([])
     const GetData = async() => {
            try{
                const get=await axios.get(`${API}getStaff`)
                console.log(get.data.data)
                setData(get.data.data)
            }
            catch(err){
                console.log(err)
            }
        }
        useEffect(()=>{
            GetData()
        },[])
    return (
        <>
            <table border={1} className="p-2 m-2 text-center">
                <thead className="bg-gray-200">
                    <tr className="border text-black">
                        <td className="border border-gray-400">Employee.No</td>
                        <td className="border border-gray-400">Name</td>
                        <td className="border border-gray-400">Date of Birth</td>
                        <td className="border border-gray-400">E-mail</td>
                        <td className="border border-gray-400">Phone Number</td>
                        <td className="border border-gray-400">View</td>
                        <td className="border border-gray-400">Action</td>
                    </tr>
                </thead>
                {data.map((staff) => (
                    <tbody key={staff.id} className="p-2 border">
                        <tr>
                            <td className="p-2 px-4 border border-gray-400">{staff.id}</td>
                            <td className="p-2 px-4 border border-gray-400">{staff.firstName}{staff.lastName}</td>
                            <td className="p-2 px-4 border border-gray-400">{staff.dateOfBirth}</td>
                            <td className="p-2 px-4 border border-gray-400">{staff.email}</td>
                            <td className="p-2 px-4 border border-gray-400">{staff.phoneNumber}</td>
                            <td className="p-2 px-4 border border-gray-400">
                                <button className="bg-blue-700 p-1 rounded-lg text-white" onClick={() => OnView(staff.UserName)}>View</button>
                            </td>
                            <td className="p-1 border border-gray-400">
                                <button className="bg-blue-700 p-1 rounded-lg text-white" onClick={() => OnEdit(staff.UserName)}><img width={20} src={EditImg} /></button>
                                <button className="bg-red-700 p-1 rounded-lg text-white" onClick={() => Del(staff.UserName)}><img width={20} src={Delimage} /></button>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </table></>
    )
}
export default TotalStaff