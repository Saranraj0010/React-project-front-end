import axios from "axios"
import { useEffect } from "react";
import { useState } from "react"
import logo from "../../assets/profile4.jpg"
import CommenHeader from "../commenHeader/CommenHeader";
const API = import.meta.env.VITE_API;
const Staff = () => {
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
    const [error, setError] = useState({})
    const[data,setData]=useState({})

    const AddFrom = async (e) => {
        try {
            e.preventDefault();
            const add = await axios.post(`${API}addStaff`, staff)
            console.log(add)
            setStaff({
                userName: "",
                firstName: "",
                lastName: "",
                dateOfBirth: "",
                password: "",
                role: "to",
                address: "",
                state: "",
                country: "",
                pincode: "",
                email: "",
                phoneNumber: ""
            })
        }
        catch (err) {
            console.log(err)
        }}
        const GetData = async() => {
            try{
                const get=await axios.get(`${API}getStaff`)
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
            <div className="">
                <CommenHeader title={"Add Staff"} logo={logo}/>
                <div className="flex justify-center items-center m-10 p-10 bg-white rounded-2xl shadow-2xl">
                    <form className={`p-5 w-full border rounded-lg flex flex-col gap-4`} onSubmit={(e) => AddFrom(e)}>
                        <h1 className="font-bold text-center underline text-2xl">STAFF REGISTER FORM</h1>
                        <h1 className="font-semibold text-lg">Staff Information</h1>
                        <div className="grid grid-cols-3 gap-5">
                            <div className="flex flex-col gap-2">
                                <label>User Name:</label>
                                <input name="userName" value={staff.userName} placeholder="User Name" className="pl-5 w-25 focus:outline-blue-600 text-sm md:text-lg md:w-50 h-10 p-1 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStaff({ ...staff, userName: e.target.value })} />
                                {/* {error.studentId && (
                                <p className="text-red-600 text-[10px]">{error.studentId}</p>
                            )} */}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>First Name:</label>
                                <input name="firstName" value={staff.firstName} placeholder="First Name" className="pl-5 focus:outline-blue-600 w-25 text-sm md:text-lg md:w-50 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStaff({ ...staff, firstName: e.target.value }), setError({ ...error, firstName: "" }) }} />
                                {/* {error.firstName && (
                                <p className="text-red-600 text-[10px]">{error.firstName}</p>
                            )} */}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>Last Name:</label>
                                <input name="lastName" value={staff.lastName} placeholder="Last Name" className="pl-5 w-25 focus:outline-blue-600 text-sm md:text-lg md:w-50 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStaff({ ...staff, lastName: e.target.value })} />
                                {/* {error.lastName && (
                                <p className="text-red-600 text-[10px]">{error.lastName}</p>
                            )} */}
                            </div>
                            <div className="flex flex-col col-span-2 gap-2">
                                <label>Date Of Birth:</label>
                                <input name="dateOfBirth" value={staff.dateOfBirth} placeholder="Enter the Date Of Birth" className="pl-5 w-45 focus:outline-blue-600 text-sm md:text-lg  md:w-115 h-10 p-1 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStaff({ ...staff, dateOfBirth: e.target.value })} />
                                {/* {error.dateOfBirth && (
                                <p className="text-red-600 text-[10px]">{error.dateOfBirth}</p>
                            )} */}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>Password:</label>
                                <input name="password" value={staff.studentId} placeholder="Password" className="pl-5 w-25 focus:outline-blue-600 text-sm md:text-lg md:w-50 h-10 p-1 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStaff({ ...staff, password: e.target.value })} />
                                {/* {error.studentId && (
                                <p className="text-red-600 text-[10px]">{error.studentId}</p>
                            )} */}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>Role:</label>
                                <select name="role" value={staff.studentId} placeholder="Role" className="pl-5 w-25 focus:outline-blue-600 text-sm md:text-lg md:w-50 h-10 p-1 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStaff({ ...staff, role: e.target.value })} >
                                    <option value="to">Select the Role</option>
                                    <option value="subjectTeacher">Subject Teacher</option>
                                    <option value="classTeacher">Class Teacher</option>
                                </select>
                                {/* {error.studentId && (
                                <p className="text-red-600 text-[10px]">{error.studentId}</p>
                            )} */}
                            </div>
                        </div>
                        <h1 className="font-semibold text-lg">Address</h1>
                        <div className="grid grid-cols-2 gap-1">
                            <div className="flex flex-col col-span-2 gap-2">
                                <label>Address:</label>
                                <input name="address" value={staff.address} placeholder="Address" className="pl-5 w-84 focus:outline-blue-600 text-sm md:text-lg md:w-192px h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStaff({ ...staff, address: e.target.value })} />
                                {/* {error.streetAddress && (
                                <p className="text-red-600 text-[10px]">{error.streetAddress}</p>
                            )} */}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>State:</label>
                                <input name="state" value={staff.state} placeholder="State" className="pl-5 w-40 text-sm focus:outline-blue-600 md:text-lg md:w-85 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStaff({ ...staff, state: e.target.value })} />
                                {/* {error.statee && (
                                <p className="text-red-600 text-[10px]">{error.statee}</p>
                            )} */}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>Country:</label>
                                <input name="country" value={staff.country} placeholder="Country" className="pl-5 w-40 focus:outline-blue-600 text-sm md:text-lg md:w-85 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStaff({ ...staff, country: e.target.value })} />
                                {/* {error.country && (
                                <p className="text-red-600 text-[10px]">{error.country}</p>
                            )} */}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>Pincode:</label>
                                <input name="pincode" value={staff.pincode} placeholder="Pincode" maxLength={6} className="w-40 focus:outline-blue-600 text-sm md:text-lg md:w-85 pl-5 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStaff({ ...staff, pincode: e.target.value })} />
                                {/* {error.pincode && (
                                <p className="text-red-600 text-[10px]">{error.pincode}</p>
                            )} */}
                            </div>
                        </div>
                        <h1 className="font-semibold text-lg">Contact Info</h1>
                        <div className="grid grid-cols-2">
                            <div className="flex flex-col gap-2">
                                <label>E-mail:</label>
                                <input name="email" value={staff.email} placeholder="E-mail" className="pl-5 w-40 text-sm focus:outline-blue-600 md:text-lg md:w-85 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStaff({ ...staff, email: e.target.value })} />
                                {/* {error.email && (
                                <p className="text-red-600 text-[10px]">{error.email}</p>
                            )} */}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>Phone Number:</label>
                                <input name="phoneNumber" value={staff.phoneNumber} placeholder="Phone Number" maxLength={10} className="pl-5 focus:outline-blue-600 w-40 text-sm md:text-lg md:w-85 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStaff({ ...staff, phoneNumber: e.target.value })} />
                                {/* {error.phoneNumber && (
                                <p className="text-red-600 text-[10px]">{error.phoneNumber}</p>
                            )} */}
                            </div>
                        </div>
                        <button type="submit" className="bg-blue-500 mt-2 text-white p-2 w-full rounded-lg cursor-pointer ">Register</button>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Staff