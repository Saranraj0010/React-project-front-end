import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
const API = import.meta.env.VITE_API;
import Delimage from "../../../assets/trash.png"
import EditImg from "../../../assets/edit.png"
import close from "../../../assets/close.png"
import logo from "../../../assets/profile4.jpg"
import CommenHeader from "../../commenHeader/CommenHeader";

const StudentDetails = () => {
    const [data, setData] = useState([]);
    const [viewData, setViewData] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [show, setShow] = useState(false);
    const [view, setView] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [shows, setShows] = useState(false);
    const [student, setStudent] = useState({
        studentId: "",
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        streetAddress: "",
        city: "",
        statee: "",
        country: "",
        pincode: "",
        email: "",
        phoneNumber: ""
    })
    const [error, setError] = useState({})
    const GetForm = async () => {
        try {
            const get = await axios.get(`${API}getForm`)
            setData(get.data.data)
        }
        catch (err) {
            console.log(err, "hello")
        }
    }
    useEffect(() => {
        GetForm()
    }, [])

    const OnEdit = (id) => {
        const selected = data.find((items) => items.studentId === id)
        console.log(selected)
        if (selected) {
            setShow(true)
            setIsEdit(true)
            setStudent({
                studentId: selected.studentId,
                firstName: selected.firstName,
                middleName: selected.middleName,
                lastName: selected.lastName,
                dateOfBirth: selected.dateOfBirth,
                streetAddress: selected.streetAddress,
                city: selected.city,
                statee: selected.statee,
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
            const result = await axios.patch(`${API}updateForm`, student)
            setStudent(
                {
                    studentId: "",
                    firstName: "",
                    middleName: "",
                    lastName: "",
                    dateOfBirth: "",
                    streetAddress: "",
                    city: "",
                    statee: "",
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
    const OnView = (id) => {
        const selected = data.find((items) => items.studentId === id)
        setViewData(selected)
        console.log(viewData)
        setView(!view)
    }
     const Del = (id) => {
        console.log("hello")
        setShows(true)
        setSearchId(id)
    }
    const DeleteForm = async () => {
        try {
            const result = await axios.patch(`${API}deleteForm`, { studentId: searchId })
            GetForm()
            setShows(false)
        }
        catch (err) {
            console.log(err)
        }
    }

    const Validation = () => {
        let newError = {};
        if (student.firstName.trim() === "") newError.firstName = "First Name requird"
        if (student.middleName.trim() === "") newError.middleName = "Middle Name requird"
        if (student.lastName.trim() === "") newError.lastName = "Last Name requird"
        if (student.dateOfBirth.trim() === "") newError.dateOfBirth = "DOB requird"
        if (student.studentId.trim() === "") newError.studentId = "StudentId requird"
        if (student.streetAddress.trim() === "") newError.streetAddress = "Street Address requird"
        if (student.city.trim() === "") newError.city = "City requird"
        if (student.statee.trim() === "") newError.statee = "State requird"
        if (student.pincode.trim() === "") newError.pincode = "Pincode requird"
        if (student.country.trim() === "") newError.country = "Country requird"
        if (student.email.trim() === "") newError.email = "Email requird"
        if (student.phoneNumber.trim() === "") newError.phoneNumber = "Phone Number requird"


        setError(newError)
        if (Object.keys(newError).length > 0) {
            setTimeout(() => setError(Object.keys(newError).length > 0), 1000 * 1000)
        }
    }
    return (
        <>
            <div className="w-full">
                <CommenHeader title={"Student Details"} logo={logo}/>
                <div className="flex justify-center bg-white shadow-2xl rounded-2xl max-w-full m-5 p-5">
                    <table border={1} className="p-2 m-2 text-center">
                        <thead className="bg-gray-200">
                            <tr className="border text-black">
                                <td className="border border-gray-400">ID.No</td>
                                <td className="border border-gray-400">Name</td>
                                <td className="border border-gray-400">Date of Birth</td>
                                <td className="border border-gray-400">E-mail</td>
                                <td className="border border-gray-400">Phone Number</td>
                                <td className="border border-gray-400">View</td>
                                <td className="border border-gray-400">Action</td>
                            </tr>
                        </thead>
                        {data.map((id) => (
                            <tbody key={id.studentId} className="p-2 border">
                                <tr>
                                    <td className="p-2 px-4 border border-gray-400">{id.studentId}</td>
                                    <td className="p-2 px-4 border border-gray-400">{id.firstName} {id.middleName} {id.lastName}</td>
                                    <td className="p-2 px-4 border border-gray-400">{id.dateOfBirth}</td>
                                    <td className="p-2 px-4 border border-gray-400">{id.email}</td>
                                    <td className="p-2 px-4 border border-gray-400">{id.phoneNumber}</td>
                                    <td className="p-2 px-4 border border-gray-400">
                                        <button className="bg-blue-700 p-1 rounded-lg text-white" onClick={() => OnView(id.studentId)}>View</button>
                                    </td>
                                    <td className="p-1 border border-gray-400">
                                        <button className="bg-blue-700 p-1 rounded-lg text-white" onClick={() => OnEdit(id.studentId)}><img width={20} src={EditImg} /></button>
                                        <button className="bg-red-700 p-1 rounded-lg text-white" onClick={() => Del(id.studentId)}><img width={20} src={Delimage} /></button>
                                    </td>
                                </tr>
                            </tbody>
                        ))}
                    </table>
                </div>
                {/* update Form */}
                {show && (
                    <div className="p-3">
                        <div className=" flex justify-center items-center">
                            <form className="w-fit p-5 border rounded-lg flex flex-col gap-2 " onSubmit={(e) => UpdateForm(e)}>
                                <h1 className="font-bold text-center underline text-2xl">STUDENT REGISTER FORM</h1>
                                <h1 className="font-semibold text-lg">Student Information</h1>
                                <div className="grid grid-cols-3 gap-2">

                                    <div className="flex flex-col gap-2">
                                        <label>First Name:</label>
                                        <input name="firstName" value={student.firstName} placeholder="First Name" className="pl-5 focus:outline-blue-600 w-25 text-sm md:text-lg md:w-60 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, firstName: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label>Middle Name:</label>
                                        <input name="middleName" value={student.middleName} placeholder="Middle Name" className="pl-5 w-29 focus:outline-blue-600 text-sm md:text-lg md:w-60 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, middleName: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label>Last Name:</label>
                                        <input name="lastName" value={student.lastName} placeholder="Last Name" className="pl-5 w-25 focus:outline-blue-600 text-sm md:text-lg md:w-60 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, lastName: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col col-span-2 gap-2">
                                        <label>Date Of Birth:</label>
                                        <input name="dateOfBirth" value={student.dateOfBirth} placeholder="Date Of Birth" className="pl-5 w-45 focus:outline-blue-600 text-sm md:text-lg  md:w-125 h-10 p-1 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, dateOfBirth: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label>Student ID:</label>
                                        <input name="studentId" value={student.studentId} maxLength={3} placeholder="Student ID" className="pl-5 w-25 focus:outline-blue-600 text-sm md:text-lg md:w-60 h-10 p-1 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, studentId: e.target.value })} />
                                    </div>
                                </div>
                                <h1 className="font-semibold text-lg">Address</h1>
                                <div className="grid grid-cols-2 gap-1">
                                    <div className="flex flex-col col-span-2 gap-2">
                                        <label>Street Address:</label>
                                        <input name="streetAddress" value={student.streetAddress} placeholder="Street Address" className="pl-5 w-84 focus:outline-blue-600 text-sm md:text-lg md:w-192px h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, streetAddress: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label>City:</label>
                                        <input name="city" value={student.city} placeholder="City" className="pl-5 w-40 text-sm md:text-lg focus:outline-blue-600 md:w-95 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, city: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label>State:</label>
                                        <input name="statee" value={student.statee} placeholder="State" className="pl-5 w-40 text-sm focus:outline-blue-600 md:text-lg md:w-95 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, statee: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label>Country:</label>
                                        <input name="country" value={student.country} placeholder="Country" className="pl-5 w-40 focus:outline-blue-600 text-sm md:text-lg md:w-95 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, country: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label>Pincode:</label>
                                        <input name="pincode" value={student.pincode} placeholder="Pincode" maxLength={6} className="w-40 focus:outline-blue-600 text-sm md:text-lg md:w-95 pl-5 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, pincode: e.target.value })} />
                                    </div>
                                </div>
                                <h1 className="font-semibold text-lg">Contact Info</h1>
                                <div className="grid grid-cols-2">
                                    <div className="flex flex-col gap-2">
                                        <label>E-mail:</label>
                                        <input name="email" value={student.email} placeholder="E-mail" className="pl-5 w-40 text-sm focus:outline-blue-600 md:text-lg md:w-95 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, email: e.target.value })} />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label>Phone Number:</label>
                                        <input name="phoneNumber" value={student.phoneNumber} placeholder="Phone Number" maxLength={10} className="pl-5 focus:outline-blue-600 w-40 text-sm md:text-lg md:w-95 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, phoneNumber: e.target.value })} />
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


                {/* student View */}
                {
                    view && viewData && (
                        <div className="flex justify-center items-center inset-0 absolute top-20 left-20 ">
                            <div className="bg-blue-500 p-6 relative rounded-lg text-center text-white">
                                <p className=" absolute top-1 right-1 " onClick={() => setView(false)}><img src={close} className="" /></p>
                                <div className="text-4xl font-serif rounded-lg h-20 bg-blue-300 text-center"><h1 className="pt-5">Student Details</h1></div>
                                <div className="grid grid-cols-2 gap-3 p-5 text-lg text-left">
                                    <div className="col-span-2">Name:{viewData.firstName} {viewData.middleName} {viewData.lastName}</div>
                                    <div className="col-span-2">Date Of Birth:{viewData.dateOfBirth}</div>
                                    <div className="col-span-2">Address:{viewData.streetAddress}{viewData.city}{viewData.statee}</div>
                                    <div className="">PinCode:{viewData.pincode}</div>
                                    <div className="">Country:{viewData.country}</div>
                                    <div className="">Email:{viewData.email}</div>
                                    <div className="">Phone Number:{viewData.phoneNumber}</div>
                                </div>
                            </div>
                        </div>
                    )
                }
                {/* delete tab */}
                {
                            shows && (
                                <div className="flex justify-center items-center inset-0 absolute">
                                    <div className="bg-white w-fit p-3 border rounded-2xl text-center">
                                        <h1 className="text-xl m-1">Want to Delete Data</h1>
                                        <div className=" flex justify-center gap-3">
                                            <button onClick={() => { setShows(false) }} className="bg-blue-700 p-1 rounded-lg" >Cancel</button>
                                            <button onClick={() => DeleteForm()} className="bg-red-700 p-1 rounded-lg">Delete</button>
                                        </div>
            
                                    </div>
                                </div>
                            )
                        }
            </div>
        </>
    )
}
export default StudentDetails