import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import Delimage from "../../assets/trash.png"
import EditImg from "../../assets/edit.png"
import CommenHeader from "../commenHeader/CommenHeader"
import logo from "../../assets/profile4.jpg"
const API = import.meta.env.VITE_API;

const TotalStaff = () => {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false);
    const [view, setView] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [shows, setShows] = useState(false);
    const [staff, setStaff] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        dateOfBirth: "",
        password: "",
        role: "",
        address: "",
        state: "",
        country: "",
        pincode: "",
        email: "",
        phoneNumber: ""
    })
    const GetData = async () => {
        try {
            const get = await axios.get(`${API}getStaff`)
            console.log(get.data.data)
            setData(get.data.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        GetData()
    }, [])
    const OnEdit = (UserName) => {
        const selected = data.find((items) => items.UserName === UserName)
        console.log(selected)
        if (selected) {
            setShow(true)
            setIsEdit(true)
            setStaff({
                UserName: selected.UserName,
                firstName: selected.firstName,
                lastName: selected.lastName,
                dateOfBirth: selected.dateOfBirth,
                password: selected.password,
                role: selected.role,
                address: selected.address,
                state: selected.state,
                country: selected.country,
                pincode: selected.pincode,
                email: selected.email,
                phoneNumber: selected.phoneNumber
            })
        }
    }
    const UpdateForm = async (e) => {
        try {
            e.preventDefault();
            console.log("hello")
            const result = await axios.patch(`${API}updateForm`, staff)
            setStaff({
                userName: "",
                firstName: "",
                lastName: "",
                dateOfBirth: "",
                password: "",
                role: "",
                address: "",
                state: "",
                country: "",
                pincode: "",
                email: "",
                phoneNumber: ""
            }
            )
            GetForm()
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <>
        <div className="">
            <CommenHeader title={"Staff Details"} logo={logo}/>
            <div className="flex  flex-col justify-center bg-white p-5 m-5 rounded-2xl shadow-2xl gap-5">
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
                </table>
                {show && (
                    <div className="">
                        <div className=" flex justify-center items-center">
                            <form className="w-fit p-5 border rounded-lg flex flex-col gap-2 " onSubmit={(e) => UpdateForm(e)}>
                                <h1 className="font-semibold text-lg">Staff Update Information</h1>
                                <div className="grid grid-cols-3 gap-2">

                                    <div className="flex flex-col gap-2">
                                        <label>First Name:</label>
                                        <input name="firstName" value={staff.firstName} placeholder="First Name" className="pl-5 focus:outline-blue-600 w-25 text-sm md:text-lg md:w-60 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStaff({ ...staff, firstName: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label>Last Name:</label>
                                        <input name="lastName" value={staff.lastName} placeholder="Last Name" className="pl-5 w-25 focus:outline-blue-600 text-sm md:text-lg md:w-60 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStaff({ ...staff, lastName: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label>Password:</label>
                                        <input name="password" value={staff.password} placeholder="Password" className="pl-5 w-25 focus:outline-blue-600 text-sm md:text-lg md:w-60 h-10 p-1 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStaff({ ...staff, password: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col col-span-2 gap-2">
                                        <label>Date Of Birth:</label>
                                        <input name="dateOfBirth" value={staff.dateOfBirth} placeholder="Date Of Birth" className="pl-5 w-45 focus:outline-blue-600 text-sm md:text-lg  md:w-125 h-10 p-1 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStaff({ ...staff, dateOfBirth: e.target.value })} />
                                    </div>
                                    
                                </div>
                                <h1 className="font-semibold text-lg">Address</h1>
                                <div className="grid grid-cols-2 gap-1">
                                    <div className="flex flex-col col-span-2 gap-2">
                                        <label>Address:</label>
                                        <input name="streetAddress" value={staff.address} placeholder="Address" className="pl-5 w-84 focus:outline-blue-600 text-sm md:text-lg md:w-192px h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStaff({ ...staff, address: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label>State:</label>
                                        <input name="statee" value={staff.state} placeholder="State" className="pl-5 w-40 text-sm focus:outline-blue-600 md:text-lg md:w-95 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStaff({ ...staff, state: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label>Country:</label>
                                        <input name="country" value={staff.country} placeholder="Country" className="pl-5 w-40 focus:outline-blue-600 text-sm md:text-lg md:w-95 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStaff({ ...staff, country: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label>Pincode:</label>
                                        <input name="pincode" value={staff.pincode} placeholder="Pincode" maxLength={6} className="w-40 focus:outline-blue-600 text-sm md:text-lg md:w-95 pl-5 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStaff({ ...staff, pincode: e.target.value })} />
                                    </div>
                                </div>
                                <h1 className="font-semibold text-lg">Contact Info</h1>
                                <div className="grid grid-cols-2">
                                    <div className="flex flex-col gap-2">
                                        <label>E-mail:</label>
                                        <input name="email" value={staff.email} placeholder="E-mail" className="pl-5 w-40 text-sm focus:outline-blue-600 md:text-lg md:w-95 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStaff({ ...staff, email: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label>Phone Number:</label>
                                        <input name="phoneNumber" value={staff.phoneNumber} placeholder="Phone Number" maxLength={10} className="pl-5 focus:outline-blue-600 w-40 text-sm md:text-lg md:w-95 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStaff({ ...staff, phoneNumber: e.target.value })} />
                                    </div>
                                </div>
                                <div className="flex gap-3 justify-center">
                                    <button onClick={() => setShow(false)} className="bg-red-500 mt-2 px-4 text-white p-2 rounded-lg cursor-pointer ">Close</button>
                                    <button type="submit" className="bg-blue-500 mt-2 px-4 text-white p-2 rounded-lg cursor-pointer ">Update</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
            </div>
        </>



    )
}
export default TotalStaff