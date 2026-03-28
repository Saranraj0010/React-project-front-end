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
        role: "",
        address: "",
        state: "",
        country: "",
        pincode: "",
        email: "",
        phoneNumber: ""
    })
    const [error, setError] = useState({})
    const [data, setData] = useState({})
    const [role, setRole] = useState([])
    const Validation = () => {
        let newError = {};
        if (staff.userName.trim() === "") newError.userName = "First Name requird"
        if (staff.firstName.trim() === "") newError.firstName = "First Name requird"
        if (staff.lastName.trim() === "") newError.lastName = "Last Name requird"
        if (staff.dateOfBirth.trim() === "") newError.dateOfBirth = "DOB requird"
        if (staff.role.trim() === "") newError.role = "Role requird"
        if (staff.address.trim() === "") newError.address = "Address requird"
        if (staff.state.trim() === "") newError.state = "State requird"
        if (staff.pincode.trim() === "") newError.pincode = "Pincode requird"
        if (staff.country.trim() === "") newError.country = "Country requird"
        if (staff.email.trim() === "") { newError.email = "Email requird" }
        else if (!/^\S+@\S+\.\S+$/.test(staff.email)) { newError.email = "Invalid email" }
        if (staff.phoneNumber.trim() === "") newError.phoneNumber = "Phone Number requird"


        setError(newError)
        if (Object.keys(newError).length > 0) {
            const firstErrorKey = Object.keys(newError)[0];
            inputRef.current[firstErrorKey].focus();
        }

    }
    const AddFrom = async (e) => {
        try {
            e.preventDefault();
            if (Validation()) return
            const add = await axios.post(`${API}addStaff`, staff)
            console.log(add,"hello")
            setStaff({
                userName: "",
                firstName: "",
                lastName: "",
                dateOfBirth: "",
                role: "",
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
        }
    }
    const GetData = async () => {
        try {
            const get = await axios.get(`${API}getStaff`)
            const staffs = await axios.get(`${API}getRole`)
            setData(get.data.data)
            setRole(staffs.data.data)
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
            <div className="min-h-screen px-2">
                <CommenHeader title={"Add Staff"} logo={logo} />
                <div className="flex justify-center items-center my-5 p-10 bg-white rounded-2xl shadow-2xl">
                    <form className={`p-5 w-full border rounded-lg flex flex-col gap-4`} onSubmit={(e) => AddFrom(e)}>
                        <h1 className="font-bold text-center underline text-2xl">STAFF REGISTER FORM</h1>
                        <h1 className="font-semibold text-lg">Staff Information</h1>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            <div className="flex flex-col gap-2">
                                <label>User Name:</label>
                                <input name="userName" value={staff.userName} placeholder="User Name" className="pl-5 focus:outline-blue-600 text-sm md:text-lg max-w-full h-10 p-1 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStaff({ ...staff, userName: e.target.value }), setError({ ...error, userName: "" }) }} />
                                {error.userName && (
                                    <p className="text-red-600 text-[10px]">{error.userName}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>First Name:</label>
                                <input name="firstName" value={staff.firstName} placeholder="First Name" className="pl-5 focus:outline-blue-600 max-w-full text-sm md:text-lg h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStaff({ ...staff, firstName: e.target.value }), setError({ ...error, firstName: "" }) }} />
                                {error.firstName && (
                                    <p className="text-red-600 text-[10px]">{error.firstName}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>Last Name:</label>
                                <input name="lastName" value={staff.lastName} placeholder="Last Name" className="pl-5 max-w-full focus:outline-blue-600 text-sm md:text-lg h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStaff({ ...staff, lastName: e.target.value }), setError({ ...error, lastName: "" }) }} />
                                {error.lastName && (
                                    <p className="text-red-600 text-[10px]">{error.lastName}</p>
                                )}
                            </div>
                            <div className="flex flex-col col-span-2 gap-2">
                                <label>Date Of Birth:</label>
                                <input name="dateOfBirth" value={staff.dateOfBirth} placeholder="Enter the Date Of Birth" className="pl-5 max-w-full focus:outline-blue-600 text-sm md:text-lg h-10 p-1 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStaff({ ...staff, dateOfBirth: e.target.value }), setError({ ...error, dateOfBirth: "" }) }} />
                                {error.dateOfBirth && (
                                    <p className="text-red-600 text-[10px]">{error.dateOfBirth}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>Role:</label>
                                <select name="standard" value={staff.role} placeholder="Role" className="pl-5  focus:outline-blue-600 text-sm md:text-lg max-w-full p-2 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStaff({ ...staff, role: e.target.value }), setError({ ...error, role: "" }) }} >
                                    <option value="">Select Role</option>
                                    {role.map((item) => (
                                        <option key={item.role} value={item.role}>{item.role}</option>
                                    ))}
                                </select>
                                {error.role && (
                                    <p className="text-red-600 text-[10px]">{error.role}</p>
                                )}
                            </div>
                        </div>
                        <h1 className="font-semibold text-lg">Address</h1>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col col-span-2 gap-2">
                                <label>Address:</label>
                                <input name="address" value={staff.address} placeholder="Address" className="pl-5 max-w-full focus:outline-blue-600 text-sm md:text-lg h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStaff({ ...staff, address: e.target.value }), setError({ ...error, address: "" }) }} />
                                {error.address && (
                                    <p className="text-red-600 text-[10px]">{error.address}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>State:</label>
                                <input name="state" value={staff.state} placeholder="State" className="pl-5 max-w-full text-sm focus:outline-blue-600 md:text-lg h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStaff({ ...staff, state: e.target.value }), setError({ ...error, state: "" }) }} />
                                {error.state && (
                                    <p className="text-red-600 text-[10px]">{error.state}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>Country:</label>
                                <input name="country" value={staff.country} placeholder="Country" className="pl-5 max-w-full focus:outline-blue-600 text-sm md:text-lg h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStaff({ ...staff, country: e.target.value }), setError({ ...error, country: "" }) }} />
                                {error.country && (
                                    <p className="text-red-600 text-[10px]">{error.country}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>Pincode:</label>
                                <input name="pincode" value={staff.pincode} placeholder="Pincode" maxLength={6} className="max-w-full focus:outline-blue-600 text-sm md:text-lg pl-5 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStaff({ ...staff, pincode: e.target.value }), setError({ ...error, pincode: "" }) }} />
                                {error.pincode && (
                                    <p className="text-red-600 text-[10px]">{error.pincode}</p>
                                )}
                            </div>
                        </div>
                        <h1 className="font-semibold text-lg">Contact Info</h1>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="flex flex-col gap-2">
                                <label>E-mail:</label>
                                <input name="email" value={staff.email} placeholder="E-mail" className="pl-5 max-w-full text-sm focus:outline-blue-600 md:text-lg h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStaff({ ...staff, email: e.target.value }), setError({ ...error, email: "" }) }} />
                                {error.email && (
                                    <p className="text-red-600 text-[10px]">{error.email}</p>
                                )}
                            </div>
                            <div className="flex flex-col gap-2">
                                <label>Phone Number:</label>
                                <input name="phoneNumber" value={staff.phoneNumber} placeholder="Phone Number" maxLength={10} className="pl-5 focus:outline-blue-600 max-w-full text-sm md:text-lg h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStaff({ ...staff, phoneNumber: e.target.value }), setError({ ...error, phoneNumber: "" }) }} />
                                {error.phoneNumber && (
                                    <p className="text-red-600 text-[10px]">{error.phoneNumber}</p>
                                )}
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