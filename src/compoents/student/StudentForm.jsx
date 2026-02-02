import { useState } from "react";
import { VscChromeClose } from "react-icons/vsc";
import { useFormStatus } from "react-dom";
import axios from "axios";
import { useEffect } from "react";
import { X } from "lucide";
import { Trash } from "lucide";
import { Trash2 } from "lucide";
import Delimage from "../../assets/trash.png"
import EditImg from "../../assets/edit.png"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const API = import.meta.env.VITE_API;

const StudentForm = () => {
    // const { studentProfile, student, handleRegister, setData } = useStudentStore()
    // const { register,formState: { error } } = useFormStatus();
    const [show, setShow] = useState(false);
    const[birthDate,setBirthDate]=useState(null);
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
    // const [studentProfile, setStudentProfile] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [data, setData] = useState([]);
    const [isEdit, setIsEdit] = useState(false)
    const [shows, setShows] = useState(false)

    const AddFrom = async () => {
        try {
            const add = await axios.post(`${API}addForm`, student)
            resetForm();
            // console.log(add)
        }
        catch (err) {
            console.log(err, "helolo")
        }
        // setStudentProfile(student)
        // e.preventDefault();
        // const studentData = JSON.parse(localStorage.getItem("student")) || [];
        // studentData.push(student);
        // localStorage.setItem("student", JSON.stringify(studentData));
        // studentProfile={studentData};
        //   console.log(studentProfile)
        // e.target.reset();
    };
    const GetForm = async () => {
        try {
            const get = await axios.get(`${API}getForm`)
        //      const formattedData = get.data.data.map(item => ({
        //     ...item,
        //     dateOfBirth: new Date(item.dateOfBirth).toLocaleDateString("en-GB") 
        // }));
        
        // console.log(formattedData)
        //     setData(formattedData);
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
            setShow(!show)
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
    const UpdateForm = async () => {
        try {
            console.log("hello")
            const result = await axios.patch(`${API}updateForm`, student)
            resetForm();
            GetForm()
        }
        catch (err) {
            console.log(err)
        }
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
        }
        catch (err) {
            console.log(err)
        }
    }
    // const SearchId = () => {
    //     const result = studentProfile.filter((roleid) => roleid.studentId === searchId)
    //     setData(result);
    //     setShow(true)
    //     // console.log(data);
    // }
    return (
        <div>
            {/* <div className="hidden">
        // <StudentView studentProfile={studentProfile}/>
        </div>
            <div className="w-fit m-auto mt-15 p-5 border  rounded-lg flex flex-col gap-4">
                <h1 className="font-semibold text-lg text-center">Students Information</h1>
                <form>
                    <input type="text" placeholder="Search by Student ID" name="id" minLength={2} maxLength={3} required className="pl-5 w-40 text-sm md:text-lg md:w-60 focus:ring-2 focus:ring-blue-500 outline-none h-10 border rounded-lg hover:border-blue-500 shadow-xl mb-4" onChange={(e) => setSearchId(e.target.value)} />
                    <button type="button" onClick={SearchId} className="bg-blue-500 text-white  p-2 rounded-lg cursor-pointer mb-4">Search</button>
                </form>
            </div> */}

            {/* {
                show && (
            <div className="fixed inset-0 bg-black/50 cursor-context-menu flex justify-center items-center">
                        <div className="grid grid-cols-1 gap-6 relative bg-white h-fit mt-7 w-fit p-5 rounded-2xl ">

             <VscChromeClose
                                className="cursor-pointer self-end absolute top-3 right-3 text-2xl"
                                onClick={() => setShow(false)}
                            />
                            <div className="w-fit m-auto p-5 border rounded-lg flex flex-col gap-4"> */}
            <h1 className="font-bold text-xl text-center">Student Information</h1>
            <div className="flex justify-center">
                <table border={1} className="p-2 m-2 text-center">
                    <thead className="bg-gray-200">
                        <tr className="border text-black">
                            <td className="border border-gray-400">ID.No</td>
                            <td className="border border-gray-400">Name</td>
                            <td className="border border-gray-400">Date of Birth</td>
                            <td className="border border-gray-400">Street Address</td>
                            <td className="border border-gray-400">City</td>
                            <td className="border border-gray-400">State</td>
                            <td className="border border-gray-400">Country</td>
                            <td className="border border-gray-400">Pincode</td>
                            <td className="border border-gray-400">E-mail</td>
                            <td className="border border-gray-400">Phone Number</td>
                            <td className="border border-gray-400">Action</td>
                        </tr>
                    </thead>
                    {data.map((id) => (
                        <tbody key={id.studentId} className="p-2 border">
                            <tr>
                                <td className="p-1 border border-gray-400">{id.studentId}</td>
                                <td className="p-1 border border-gray-400">{id.firstName}.{id.middleName} {id.lastName}</td>
                                <td className="p-1 border border-gray-400">{id.dateOfBirth}</td>
                                <td className="p-1 border border-gray-400">{id.streetAddress}</td>
                                <td className="p-1 border border-gray-400">{id.city}</td>
                                <td className="p-1 border border-gray-400">{id.statee}</td>
                                <td className="p-1 border border-gray-400">{id.country}</td>
                                <td className="p-1 border border-gray-400">{id.pincode}</td>
                                <td className="p-1 border border-gray-400">{id.email}</td>
                                <td className="p-1 border border-gray-400">{id.phoneNumber}</td>
                                <td className="p-1 border border-gray-400">
                                    <button className="bg-blue-700 p-1 rounded-lg text-white" onClick={() => OnEdit(id.studentId)}><img width={20} src={EditImg} /></button>
                                    <button className="bg-red-700 p-1 rounded-lg text-white" onClick={() => Del(id.studentId)}><img width={20} src={Delimage} /></button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>

            {/* </div>
            </div>
                    </div>
             )
            } 
            {/* {show&&(
                <div className=" relative flex justify-center items-center inset-1">
                <div className="flex justify-center absolute  bg-white h-300 p-0 items-center overflow-y-auto custom-scrollbar ">
                <form className="w-fit p-5 border rounded-lg flex flex-col gap-2 ">
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
                    <button onClick={()=>UpdateForm()} className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer ">Register</button>
                </form>
                </div>
                </div>
            )} */}

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



            <div className="flex justify-center items-center mt-10 mb-10">
                <form className="w-fit p-5 border rounded-lg flex flex-col gap-4" onSubmit={isEdit ? UpdateForm : AddFrom}>
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
                            <input 
                            // showMonthDropdown
                            // showYearDropdown
                            //   dropdownMode="select"  placeholderText="Select the BirthDay"
                             name="dateOfBirth" value={student.dateOfBirth} placeholder="Enter the Date Of Birth" className="pl-5 w-45 focus:outline-blue-600 text-sm md:text-lg  md:w-125 h-10 p-1 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, dateOfBirth: e.target.value })} />
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
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer ">{isEdit ? "Update" : "Register"}</button>
                </form>
            </div>
        </div>
    )
}
export default StudentForm;