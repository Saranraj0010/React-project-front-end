import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import CommenHeader from "../../commenHeader/CommenHeader";
import logo from "../../../assets/profile4.jpg"
import Delimage from "../../../assets/trash.png"
import EditImg from "../../../assets/edit.png"
import close from "../../../assets/close.png"
import Input from "../../../Elaments/Input";
const API = import.meta.env.VITE_API;
const AdmissionDetails = () => {
    const [student, setStudent] = useState([])
    const [editStudent, setEditStudent] = useState({})
    const [viewData, setViewData] = useState([]);
    const [standard, setStandard] = useState([])
    const [section, setSection] = useState([])
    const [filter, setFilter] = useState({
        filterStandard: "",
        filterSection: "",
        filterText: ""
    })
    const [id, setId] = useState("");
    const [show, setShow] = useState(false);
    const [view, setView] = useState(false);
    const [shows, setShows] = useState(false);
    const [error, setError] = useState({})
    const input = "pl-5 focus:outline-blue-600 text-sm md:text-lg max-w-full h-10 border rounded-lg hover:border-blue-500 shadow-xl"
    const GetForm = async () => {
        try {
            const get = await axios.get(`${API}getStudent`)
            setStudent(get.data.data)
            const standard = await axios.get(`${API}getStandard`)
            setStandard(standard.data.data)
            const section = await axios.get(`${API}getSection`)
            setSection(section.data.data)
        }
        catch (err) {
            console.log(err, "hello")
        }
    }
    useEffect(() => {
        GetForm()
    }, [])
    const filterData = student.filter((item) => {
        return (
            (filter.filterStandard === "" || filter.filterStandard === "no" || item.standard === filter.filterStandard) &&
            (filter.filterSection === "" || item.section === filter.filterSection) &&
            (filter.filterText === "" || item.firstName.toLowerCase().includes(filter.filterText.toLowerCase()))
        );
    });

    const OnEdit = (id) => {
        const selected = student.find((items) => items.id === id)
        console.log(selected)
        if (selected) {
            setShow(true)
            setEditStudent({
                userName: selected.userName,
                firstName: selected.firstName,
                lastName: selected.lastName,
                gender: selected.gender,
                dateOfBirth: selected.dateOfBirth,
                aaadharno: selected.aaadharno,
                standard: selected.standard,
                bloodGroup: selected.bloodGroup,
                language: selected.language,
                section: selected.section,
                address: selected.address,
                state: selected.state,
                nationality: selected.nationality,
                pincode: selected.pincode,
                email: selected.email,
                studentMobileNo: selected.studentMobileNo,
                fatherName: selected.fatherName,
                fatherOccupation: selected.fatherOccupation,
                fatherNumber: selected.fatherNumber,
                motherName: selected.motherName,
                motherOccupation: selected.motherOccupation,
                motherNumber: selected.motherNumber,
                id: selected.id
            })

        }
    }
    const UpdateForm = async (e) => {
        try {
            e.preventDefault();
            console.log("hello")
            const result = await axios.patch(`${API}updateStudent`, editStudent)
            setEditStudent(
                {
                    userName: "",
                    firstName: "",
                    lastName: "",
                    gender: "",
                    dateOfBirth: "",
                    aaadharno: "",
                    standard: "",
                    bloodGroup: "",
                    language: "",
                    section: "",
                    address: "",
                    state: "",
                    nationality: "",
                    pincode: "",
                    email: "",
                    studentMobileNo: "",
                    fatherName: "",
                    fatherOccupation: "",
                    fatherNumber: "",
                    motherName: "",
                    motherOccupation: "",
                    motherNumber: ""
                }
            )
            GetForm()
            setShow(false)
        }
        catch (err) {
            console.log(err)
        }
    }
    const OnView = (id) => {
        const selected = student.find((items) => items.id === id)
        setViewData(selected)
        console.log(viewData)
        setView(!view)
    }
    const Del = (id) => {
        console.log(id)
        setShows(true)
        setId(id)
    }
    const DeleteForm = async () => {
        try {
            const result = await axios.patch(`${API}deleteStudent`, { id: id })
            GetForm()
            setShows(false)
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="">
            <CommenHeader title={"Admission Details"} logo={logo} />
            <div className="bg-white rounded-2xl shadow flex justify-end gap-3 items-center m-5 p-4">
                <Input value={filter.filterText} placeholder={"Enter Student Name"} onchange={(e) => { setFilter({ ...filter, filterText: e.target.value }) }} />
                <select name="standard" id="" value={filter.filterStandard} placeholder="Standard" className={input} onChange={(e) => { setFilter({ ...filter, filterStandard: e.target.value }) }}>
                    <option value="no">Select Standard</option>
                    {standard.map((item) => (
                        <option key={item.standard} value={item.standard}>{item.standard}</option>
                    ))}
                </select>
                <select name="section" value={filter.filterSection} placeholder="Section" className={input} onChange={(e) => { setFilter({ ...filter, filterSection: e.target.value }) }} >
                    <option value="">Select Section</option>
                    {section.map((item) => (
                        <option key={item.section} value={item.section}>{item.section}</option>
                    ))}
                </select>
                    <button className="bg-green-400 rounded-lg p-1 cursor-pointer" onClick={() => setFilter({ filterSection:"",filterStandard:"",filterText:"" })}>Reset</button>
            </div>
            <div className="bg-white rounded-2xl shadow flex justify-center items-center m-5 p-4">
                <table className="w-full border shadow-lg">
                    <thead className="">
                        <tr className="bg-blue-600 text-white uppercase text-sm">
                            <th className="border p-3">Name</th>
                            <th className="border p-3">Date Of Birth</th>
                            <th className="border p-3">Standard</th>
                            <th className="border p-3">Section</th>
                            <th className="border p-3">Mobile Number</th>
                            <th className="border p-3">View</th>
                            <th className="border p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterData.map((item) => (
                            <tr key={item.id} className={`bg-white hover:bg-gray-300 hover:text-black`}>
                                <td className="border p-3 font-medium">{item.firstName} {item.lastName}</td>
                                <td className="border p-3">{item.dateOfBirth}</td>
                                <td className="border p-3">{item.standard}</td>
                                <td className="border p-3">{item.section}</td>
                                <td className="border p-3">{item.studentMobileNo}</td>
                                <td className="border p-3">
                                    <button className="bg-blue-500 cursor-pointer text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition" onClick={() => OnView(item.id)}>
                                        View
                                    </button>
                                </td>
                                <td className="p-3 flex gap-3 border-b mt-2">
                                    <button className="bg-green-500 cursor-pointer text-white p-2 rounded-lg hover:bg-green-600 transition" onClick={() => OnEdit(item.id)}>
                                        Edit
                                    </button>
                                    <button className="bg-red-500 cursor-pointer text-white p-2 rounded-lg hover:bg-red-600 transition" onClick={() => Del(item.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* update Form */}
            {show && (
                <div className="absolute bg-black/50 flex items-center justify-center inset-0 h-screen w-screen">
                    <div className=" relative flex justify-center h-full rounded-2xl z-50 bg-white items-center gap-3 overflow-y-scroll  [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-5">
                        <form className={`w-full p-5 rounded-lg h-full flex flex-col gap-4`} onSubmit={(e) => UpdateForm(e)}>
                            <div className="w-fit absolute right-3 top-3">
                                <img src={close} width={20} onClick={() => { setShow(false) }} alt="" />
                            </div>
                            <h1 className="font-bold text-center underline text-2xl">ADMISSION FORM UPDATE</h1>
                            <h1 className="font-semibold text-lg">Student Information</h1>
                            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                                <div className="flex flex-col gap-2">
                                    <label>User Name:</label>
                                    <input name="userName" value={editStudent.userName} placeholder="User Name" className={input} onChange={(e) => { setEditStudent({ ...editStudent, userName: e.target.value }), setError({ ...error, userName: "" }) }} />
                                    {/* {error.userName && (
                                        <p className="text-red-600 text-[10px]">{error.userName}</p>
                                    )} */}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label>First Name:</label>
                                    <input name="firstName" value={editStudent.firstName} placeholder="First Name" className={input} onChange={(e) => { setEditStudent({ ...editStudent, firstName: e.target.value }), setError({ ...error, firstName: "" }) }} />
                                    {/* {error.firstName || error.Duplicate && (
                                        <p className="text-red-600 text-[10px]">{error.firstName || error.Duplicate}</p>
                                    )} */}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label>Last Name:</label>
                                    <input name="lastName" value={editStudent.lastName} placeholder="Last Name" className={input} onChange={(e) => { setEditStudent({ ...editStudent, lastName: e.target.value }), setError({ ...error, lastName: "" }) }} />
                                    {/* {error.lastName && (
                                        <p className="text-red-600 text-[10px]">{error.lastName}</p>
                                    )} */}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label>Gender:</label>
                                    <select name="gender" value={editStudent.gender} placeholder="First Name" className={input} onChange={(e) => { setEditStudent({ ...editStudent, gender: e.target.value }), setError({ ...error, gender: "" }) }}>
                                        <option value="">Select the Gender</option>
                                        <option value="male">Male</option>
                                        <option value="feMale">FeMale</option>
                                        <option value="others">Others</option>
                                    </select>
                                    {/* {error.gender && (
                                        <p className="text-red-600 text-[10px]">{error.gender || error.Duplicate}</p>
                                    )} */}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label>Date Of Birth:</label>
                                    <input name="dateOfBirth" value={editStudent.dateOfBirth} placeholder="Enter DateofBirth" className={input} onChange={(e) => { setEditStudent({ ...editStudent, dateOfBirth: e.target.value }), setError({ ...error, dateOfBirth: "" }) }} />
                                    {/* {error.dateOfBirth && (
                                        <p className="text-red-600 text-[10px]">{error.dateOfBirth}</p>
                                    )} */}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label>Aaadhar No:</label>
                                    <input name="aaadharno" value={editStudent.aaadharno} placeholder="Aaadhar No" className={input} onChange={(e) => { setEditStudent({ ...editStudent, aaadharno: e.target.value }), setError({ ...error, aaadharno: "" }) }} />
                                    {/* {error.aaadharno && (
                                        <p className="text-red-600 text-[10px]">{error.aaadharno}</p>
                                    )} */}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label>Standard:</label>
                                    <select name="standard" value={editStudent.standard} placeholder="Standard" className={input} onChange={(e) => { setEditStudent({ ...editStudent, standard: e.target.value }), setError({ ...error, standard: "" }) }} >
                                        <option value="">Select Standard</option>
                                        {standard.map((item) => (
                                            <option key={item.standard} value={item.standard}>{item.standard}</option>
                                        ))}
                                    </select>
                                    {/* {error.standard && (
                                        <p className="text-red-600 text-[10px]">{error.standard}</p>
                                    )} */}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label>Blood Group:</label>
                                    <input name="bloodGroup" value={editStudent.bloodGroup} placeholder="Blood Group" className={input} onChange={(e) => { setEditStudent({ ...editStudent, bloodGroup: e.target.value }), setError({ ...error, bloodGroup: "" }) }} />
                                    {/* {error.bloodGroup && (
                                        <p className="text-red-600 text-[10px]">{error.bloodGroup}</p>
                                    )} */}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label>Language:</label>
                                    <input name="language" value={editStudent.language} placeholder="Language" className={input} onChange={(e) => { setEditStudent({ ...editStudent, language: e.target.value }), setError({ ...error, language: "" }) }} />
                                    {/* {error.language && (
                                        <p className="text-red-600 text-[10px]">{error.language}</p>
                                    )} */}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label>Section:</label>
                                    <select name="section" value={student.section} placeholder="Section" className={input} onChange={(e) => { setStudent({ ...student, section: e.target.value }), setError({ ...error, section: "" }) }} >
                                        <option value="">Select Section</option>
                                        {section.map((item) => (
                                            <option key={item.section} value={item.section}>{item.section}</option>
                                        ))}
                                    </select>
                                    {/* {error.section && (
                                        <p className="text-red-600 text-[10px]">{error.section}</p>
                                    )} */}
                                </div>
                            </div>
                            <h2 className="text-blue-700 font-bold text-xl border-b pb-2">Address</h2>
                            <div className="grid grid-cols-2 gap-1">
                                <div className="flex flex-col gap-2">
                                    <label>Address:</label>
                                    <input name="address" value={editStudent.address} placeholder="Address" className={input} onChange={(e) => { setEditStudent({ ...editStudent, address: e.target.value }), setError({ ...error, address: "" }) }} />
                                    {/* {error.address && (
                                        <p className="text-red-600 text-[10px]">{error.address}</p>
                                    )} */}
                                </div>

                                <div className="flex flex-col gap-2">
                                    <label>State:</label>
                                    <input name="state" value={editStudent.state} placeholder="State" className={input} onChange={(e) => { setEditStudent({ ...editStudent, state: e.target.value }), setError({ ...error, state: "" }) }} />
                                    {/* {error.state && (
                                        <p className="text-red-600 text-[10px]">{error.state}</p>
                                    )} */}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label>Nationality:</label>
                                    <input name="nationality" value={editStudent.nationality} placeholder="Nationality" className={input} onChange={(e) => { setEditStudent({ ...editStudent, nationality: e.target.value }), setError({ ...error, nationality: "" }) }} />
                                    {/* {error.city && (
                                        <p className="text-red-600 text-[10px]">{error.nationality}</p>
                                    )} */}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label>Pincode:</label>
                                    <input name="pincode" value={editStudent.pincode} placeholder="Pincode" maxLength={6} className={input} onChange={(e) => { setEditStudent({ ...editStudent, pincode: e.target.value }), setError({ ...error, pincode: "" }) }} />
                                    {/* {error.pincode && (
                                        <p className="text-red-600 text-[10px]">{error.pincode}</p>
                                    )} */}
                                </div>
                            </div>
                            <h1 className="font-semibold text-lg">Contact Info</h1>
                            <div className="md:grid lg:grid-cols-2">
                                <div className="flex flex-col gap-2">
                                    <label>E-mail:</label>
                                    <input name="email" value={editStudent.email} placeholder="E-mail" className={input} onChange={(e) => { setEditStudent({ ...editStudent, email: e.target.value }), setError({ ...error, email: "" }) }} />
                                    {/* {error.email && (
                                        <p className="text-red-600 text-[10px]">{error.email}</p>
                                    )} */}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label>Student Mobilno:</label>
                                    <input name="studentMobileNo" value={editStudent.studentMobileNo} placeholder="Student MobileNo " maxLength={10} className={input} onChange={(e) => { setEditStudent({ ...editStudent, studentMobileNo: e.target.value }), setError({ ...error, studentMobileNo: "" }) }} />
                                    {/* {error.studentMobileNo && (
                                        <p className="text-red-600 text-[10px]">{error.studentMobileNo}</p>
                                    )} */}
                                </div>
                            </div>
                            <h1 className="font-semibold text-lg">Parants Details</h1>
                            <div className="md:grid lg:grid-cols-3">
                                <div className="flex flex-col gap-2">
                                    <label>Father Name:</label>
                                    <input name="fatherName" value={editStudent.fatherName} placeholder="Father Name" className={input} onChange={(e) => { setEditStudent({ ...editStudent, fatherName: e.target.value }), setError({ ...error, fatherName: "" }) }} />
                                    {/* {error.fatherName && (
                                        <p className="text-red-600 text-[10px]">{error.fatherName}</p>
                                    )} */}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label>Father Occupation:</label>
                                    <input name="fatherOccupation" value={editStudent.fatherOccupation} placeholder="Father Occupation" className={input} onChange={(e) => { setEditStudent({ ...editStudent, fatherOccupation: e.target.value }), setError({ ...error, fatherOccupation: "" }) }} />
                                    {/* {error.fatherOccupation && (
                                        <p className="text-red-600 text-[10px]">{error.fatherOccupation}</p>
                                    )} */}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label>Father Number:</label>
                                    <input name="fatherNumber" value={editStudent.fatherNumber} placeholder="Father Number" className={input} onChange={(e) => { setEditStudent({ ...editStudent, fatherNumber: e.target.value }), setError({ ...error, fatherNumber: "" }) }} />
                                    {/* {error.fatherNumber && (
                                        <p className="text-red-600 text-[10px]">{error.fatherNumber}</p>
                                    )} */}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label>Mother Name:</label>
                                    <input name="motherName" value={editStudent.motherName} placeholder="Mother Name" className={input} onChange={(e) => { setEditStudent({ ...editStudent, motherName: e.target.value }), setError({ ...error, motherName: "" }) }} />
                                    {/* {error.motherName && (
                                        <p className="text-red-600 text-[10px]">{error.motherName}</p>
                                    )} */}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label>Mother Occupation:</label>
                                    <input name="motherOccupation" value={editStudent.motherOccupation} placeholder="Mother Occupation" className={input} onChange={(e) => { setEditStudent({ ...editStudent, motherOccupation: e.target.value }), setError({ ...error, motherOccupation: "" }) }} />
                                    {/* {error.motherOccupation && (
                                        <p className="text-red-600 text-[10px]">{error.motherOccupation}</p>
                                    )} */}
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label>Mother Number:</label>
                                    <input name="motherNumber" value={editStudent.motherNumber} placeholder="Mother Number" className={input} onChange={(e) => { setEditStudent({ ...editStudent, motherNumber: e.target.value }), setError({ ...error, motherNumber: "" }) }} />
                                    {/* {error.motherNumber && (
                                        <p className="text-red-600 text-[10px]">{error.motherNumber}</p>
                                    )} */}
                                </div>
                            </div>
                            <button type="submit" className="bg-blue-500 mt-2 text-white p-2 max-w-full rounded-lg cursor-pointer ">Register</button>
                        </form>
                    </div>
                </div>
            )}
            {/* student View */}
            {
                view && viewData && (
                    <div className="flex justify-center items-center inset-0 absolute left-20 ">
                        <div className="bg-blue-500 p-6 relative rounded-lg text-center text-white">
                            <p className=" absolute top-1 right-1 " onClick={() => setView(false)}><img src={close} className="" /></p>
                            <div className="text-4xl font-serif rounded-lg h-20 bg-blue-300 text-center"><h1 className="pt-5">Student Details</h1></div>
                            <div className="grid grid-cols-2 gap-3 p-5 text-lg text-left">
                                <div className="col-span-2">Name:{viewData.firstName}{viewData.lastName}</div>
                                <div className="col-span-2">Date Of Birth:{viewData.dateOfBirth}</div>
                                <div className="col-span-2">Address:{viewData.address}{viewData.city}{viewData.statee}</div>
                                <div className="">PinCode:{viewData.pincode}</div>
                                <div className="">Country:{viewData.nationality}</div>
                                <div className="">Email:{viewData.email}</div>
                                <div className="">Phone Number:{viewData.studentMobileNo}</div>
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
                                <button onClick={() => { setShows(false) }} className="bg-blue-700 cursor-pointer p-1 rounded-lg" >Cancel</button>
                                <button onClick={DeleteForm} className="bg-red-700 cursor-pointer p-1 rounded-lg">Delete</button>
                            </div>

                        </div>
                    </div>
                )
            }
        </div>
    )
}
export default AdmissionDetails