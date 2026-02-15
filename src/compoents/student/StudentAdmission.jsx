import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CommenHeader from "../commenHeader/CommenHeader";
import logo from "../../assets/profile4.jpg"
import { useEffect } from "react";
import { useRef } from "react";

const API = import.meta.env.VITE_API;

const StudentAdmission = () => {
    const [student, setStudent] = useState({
        userName: "",
        firstName: "",
        lastName: "",
        gender: "",
        dateOfBirth: "",
        aaadharno: "",
        standard: "",
        bloodGroup: "",
        language: "",
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
    })
    const [error, setError] = useState({})
    const [standard, setStandard] = useState([])
    const inputRef = useRef({})

    const Validation = () => {
        let newError = {};
        if (student.userName.trim() === "") newError.userName = "User Name requird"
        if (student.firstName.trim() === "") newError.firstName = "First Name requird"
        if (student.lastName.trim() === "") newError.lastName = "Last Name requird"
        if (student.gender.trim() === "") newError.gender = "First Name requird"
        if (student.dateOfBirth.trim() === "") newError.dateOfBirth = "DOB requird"
        if (student.aaadharno.trim() === "") newError.aaadharno = "Aaadharno requird"
        if (student.standard.trim() === "") newError.standard = "Standard requird"
        if (student.bloodGroup.trim() === "") newError.bloodGroup = "BloodGroup requird"
        if (student.language.trim() === "") newError.language = "Language requird"
        if (student.address.trim() === "") newError.address = "Address requird"
        if (student.state.trim() === "") newError.state = "State requird"
        if (student.pincode.trim() === "") newError.pincode = "Pincode requird"
        if (student.nationality.trim() === "") newError.nationality = "Nationality requird"
        if (student.email.trim() === "") { newError.email = "Email requird" }
        else if (!/^\S+@\S+\.\S+$/.test(student.email)) { newError.email = "Invalid email" }
        if (student.studentMobileNo.trim() === "") { newError.studentMobileNo = "Phone Number requird" }
        else if (!/^\+?[1-9]\d{6,14}$/.test(student.studentMobileNo)) { newError.studentMobileNo = "Invalid phone number format" }
        if (student.fatherName.trim() === "") { newError.fatherName = "Father Name requird" }
        if (student.fatherNumber.trim() === "") { newError.fatherNumber = "Father Number requird" }
        else if (!/^\+?[1-9]\d{6,14}$/.test(student.fatherNumber)) { newError.fatherNumber = "Invalid phone number format" }
        if (student.fatherOccupation.trim() === "") { newError.fatherOccupation = "Father Occupation requird" }
        if (student.motherName.trim() === "") { newError.motherName = "Mother Name requird" }
        if (student.motherNumber.trim() === "") { newError.motherNumber = "Mother Number requird" }
        else if (!/^\+?[1-9]\d{6,14}$/.test(student.motherNumber)) { newError.motherNumber = "Invalid phone number format" }
        if (student.motherOccupation.trim() === "") { newError.motherOccupation = "Mother Occupation requird" }


        setError(newError)
        if (Object.keys(newError).length > 0) {
        const firstErrorKey = Object.keys(newError)[0];
        inputRef.current[firstErrorKey].focus();
    }

    }
    const AddFrom = async (e) => {
        try {
            e.preventDefault();
            if (!Validation()) return
            console.log(student)
            const add = await axios.post(`${API}addStudent`, student)
            setStudent(
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
        }
        catch (err) {
            console.log(err, "helolo")
        }
    };
    const GetForm = async () => {
        try {
            const get = await axios.get(`${API}getStandard`)
            setStandard(get.data.data)
        }
        catch (err) {
            console.log(err, "hello")
        }
    }
    useEffect(() => {
        GetForm()
    }, [])
    return (
        <div className="bg-white rounded-lg shadow p-1 m-2">
            <CommenHeader title={"Student Admission"} logo={logo} button={"Add Student"} />
            {/* Student addForm  */}
            <div className="flex justify-center items-center m-5 p-5 bg-white rounded-2xl shadow-2xl max-w-full">
                <form className={`w-full p-5 border rounded-lg flex flex-col gap-4`} onSubmit={(e) => AddFrom(e)}>
                    <h1 className="font-bold text-center underline text-2xl">ADMISSION FORM</h1>
                    <h1 className="font-semibold text-lg">Student Information</h1>
                    <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <div className="flex flex-col gap-2">
                            <label>User Name:</label>
                            <input name="userName" ref={(el) => (inputRef.current["userName"] = el)} value={student.userName} placeholder="User Name" className="pl-5 focus:outline-blue-600  text-sm md:text-lg max-w-full h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStudent({ ...student, userName: e.target.value }), setError({ ...error, userName: "" }) }} />
                            {error.userName && (
                                <p className="text-red-600 text-[10px]">{error.userName}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>First Name:</label>
                            <input name="firstName" ref={(el) => (inputRef.current["firstName"] = el)} value={student.firstName} placeholder="First Name" className="pl-5 focus:outline-blue-600 text-sm md:text-lg max-w-full h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStudent({ ...student, firstName: e.target.value }), setError({ ...error, firstName: "" }) }} />
                            {error.firstName && (
                                <p className="text-red-600 text-[10px]">{error.firstName}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Last Name:</label>
                            <input name="lastName" ref={(el) => (inputRef.current["firstlastNameName"] = el)} value={student.lastName} placeholder="Last Name" className="pl-5 focus:outline-blue-600 text-sm md:text-lg max-w-full h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStudent({ ...student, lastName: e.target.value }), setError({ ...error, lastName: "" }) }} />
                            {error.lastName && (
                                <p className="text-red-600 text-[10px]">{error.lastName}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Gender:</label>
                            <select name="gender" ref={(el) => (inputRef.current["gender"] = el)} value={student.gender} placeholder="First Name" className="pl-5 focus:outline-blue-600 text-sm md:text-lg max-w-full h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStudent({ ...student, gender: e.target.value }), setError({ ...error, gender: "" }) }}>
                                <option value="">Select the Gender</option>
                                <option value="male">Male</option>
                                <option value="feMale">FeMale</option>
                                <option value="others">Others</option>
                            </select>
                            {error.gender && (
                                <p className="text-red-600 text-[10px]">{error.gender || error.Duplicate}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Date Of Birth:</label>
                            <input name="dateOfBirth" ref={(el) => (inputRef.current["dateOfBirth"] = el)} value={student.dateOfBirth} placeholder="Enter DateofBirth" className="pl-5 focus:outline-blue-600 text-sm md:text-lg  max-w-full h-10 p-1 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStudent({ ...student, dateOfBirth: e.target.value }), setError({ ...error, dateOfBirth: "" }) }} />
                            {error.dateOfBirth && (
                                <p className="text-red-600 text-[10px]">{error.dateOfBirth}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Aaadhar No:</label>
                            <input name="aaadharno" ref={(el) => (inputRef.current["aaadharno"] = el)} value={student.aaadharno} placeholder="Aaadhar No" className="pl-5 focus:outline-blue-600 text-sm md:text-lg max-w-full h-10 p-1 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStudent({ ...student, aaadharno: e.target.value }), setError({ ...error, aaadharno: "" }) }} />
                            {error.aaadharno && (
                                <p className="text-red-600 text-[10px]">{error.aaadharno}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Standard:</label>
                            <select name="standard" ref={(el) => (inputRef.current["standard"] = el)} value={student.standard} placeholder="Standard" className="pl-5  focus:outline-blue-600 text-sm md:text-lg max-w-fullh-10 p-1 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStudent({ ...student, standard: e.target.value }), setError({ ...error, standard: "" }) }} >
                                <option value="">Select Standard</option>
                                {standard.map((item) => (
                                    <option key={item.standard} value={item.standard}>{item.standard}</option>
                                ))}
                            </select>
                            {error.standard && (
                                <p className="text-red-600 text-[10px]">{error.standard}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Blood Group:</label>
                            <input name="bloodGroup" ref={(el) => (inputRef.current["bloodGroup"] = el)} value={student.bloodGroup} placeholder="Blood Group" className="pl-5 focus:outline-blue-600 text-sm md:text-lg max-w-full h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStudent({ ...student, bloodGroup: e.target.value }), setError({ ...error, bloodGroup: "" }) }} />
                            {error.bloodGroup && (
                                <p className="text-red-600 text-[10px]">{error.bloodGroup}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Language:</label>
                            <input name="language" ref={(el) => (inputRef.current["language"] = el)} value={student.language} placeholder="Language" className="pl-5 focus:outline-blue-600 text-sm md:text-lg max-w-full h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStudent({ ...student, language: e.target.value }), setError({ ...error, language: "" }) }} />
                            {error.language && (
                                <p className="text-red-600 text-[10px]">{error.language}</p>
                            )}
                        </div>
                    </div>
                    <h1 className="font-semibold text-lg">Address</h1>
                    <div className="grid grid-cols-2 gap-1">
                        <div className="flex flex-col gap-2">
                            <label>Address:</label>
                            <input name="address" ref={(el) => (inputRef.current["address"] = el)} value={student.address} placeholder="Address" className="pl-5 focus:outline-blue-600 text-sm md:text-lg max-w-full h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStudent({ ...student, address: e.target.value }), setError({ ...error, address: "" }) }} />
                            {error.address && (
                                <p className="text-red-600 text-[10px]">{error.address}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <label>State:</label>
                            <input name="state" ref={(el) => (inputRef.current["state"] = el)} value={student.state} placeholder="State" className="pl-5 text-sm focus:outline-blue-600 md:text-lg max-w-full h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStudent({ ...student, state: e.target.value }), setError({ ...error, state: "" }) }} />
                            {error.state && (
                                <p className="text-red-600 text-[10px]">{error.state}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Nationality:</label>
                            <input name="nationality" ref={(el) => (inputRef.current["nationality"] = el)} value={student.nationality} placeholder="Nationality" className="pl-5 text-sm md:text-lg focus:outline-blue-600 max-w-full h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStudent({ ...student, nationality: e.target.value }), setError({ ...error, nationality: "" }) }} />
                            {error.nationality && (
                                <p className="text-red-600 text-[10px]">{error.nationality}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Pincode:</label>
                            <input name="pincode" ref={(el) => (inputRef.current["pincode"] = el)} value={student.pincode} placeholder="Pincode" maxLength={6} className="focus:outline-blue-600 text-sm md:text-lg max-w-full pl-5 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStudent({ ...student, pincode: e.target.value }), setError({ ...error, pincode: "" }) }} />
                            {error.pincode && (
                                <p className="text-red-600 text-[10px]">{error.pincode}</p>
                            )}
                        </div>
                    </div>
                    <h1 className="font-semibold text-lg">Contact Info</h1>
                    <div className="md:grid lg:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <label>E-mail:</label>
                            <input name="email" ref={(el) => (inputRef.current["email"] = el)} value={student.email} placeholder="E-mail" className="pl-5 text-sm focus:outline-blue-600 md:text-lg max-w-full h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStudent({ ...student, email: e.target.value }), setError({ ...error, email: "" }) }} />
                            {error.email && (
                                <p className="text-red-600 text-[10px]">{error.email}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Student Mobilno:</label>
                            <input name="studentMobileNo" ref={(el) => (inputRef.current["studentMobileNo"] = el)} value={student.studentMobileNo} placeholder="Student MobileNo " className="pl-5 focus:outline-blue-600 text-sm md:text-lg max-w-full h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStudent({ ...student, studentMobileNo: e.target.value }), setError({ ...error, studentMobileNo: "" }) }} />
                            {error.studentMobileNo && (
                                <p className="text-red-600 text-[10px]">{error.studentMobileNo}</p>
                            )}
                        </div>
                    </div>
                    <h1 className="font-semibold text-lg">Parants Details</h1>
                    <div className="md:grid lg:grid-cols-3">
                        <div className="flex flex-col gap-2">
                            <label>Father Name:</label>
                            <input name="fatherName" ref={(el) => (inputRef.current["fatherName"] = el)} value={student.fatherName} placeholder="Father Name" className="pl-5 focus:outline-blue-600 text-sm md:text-lg max-w-full h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStudent({ ...student, fatherName: e.target.value }), setError({ ...error, fatherName: "" }) }} />
                            {error.fatherName && (
                                <p className="text-red-600 text-[10px]">{error.fatherName}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Father Occupation:</label>
                            <input name="fatherOccupation" ref={(el) => (inputRef.current["fatherOccupation"] = el)} value={student.fatherOccupation} placeholder="Father Occupation" className="pl-5 focus:outline-blue-600 text-sm md:text-lg max-w-full h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStudent({ ...student, fatherOccupation: e.target.value }), setError({ ...error, fatherOccupation: "" }) }} />
                            {error.fatherOccupation && (
                                <p className="text-red-600 text-[10px]">{error.fatherOccupation}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Father Number:</label>
                            <input name="fatherNumber" ref={(el) => (inputRef.current["fatherNumber"] = el)} value={student.fatherNumber} placeholder="Father Number" className="pl-5 focus:outline-blue-600 text-sm md:text-lg max-w-full h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStudent({ ...student, fatherNumber: e.target.value }), setError({ ...error, fatherNumber: "" }) }} />
                            {error.fatherNumber && (
                                <p className="text-red-600 text-[10px]">{error.fatherNumber}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Mother Name:</label>
                            <input name="motherName" ref={(el) => (inputRef.current["motherName"] = el)} value={student.motherName} placeholder="Mother Name" className="pl-5 focus:outline-blue-600 text-sm md:text-lg max-w-full h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStudent({ ...student, motherName: e.target.value }), setError({ ...error, motherName: "" }) }} />
                            {error.motherName && (
                                <p className="text-red-600 text-[10px]">{error.motherName}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Mother Occupation:</label>
                            <input name="motherOccupation" ref={(el) => (inputRef.current["motherOccupation"] = el)} value={student.motherOccupation} placeholder="Mother Occupation" className="pl-5 focus:outline-blue-600 text-sm md:text-lg max-w-full h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStudent({ ...student, motherOccupation: e.target.value }), setError({ ...error, motherOccupation: "" }) }} />
                            {error.motherOccupation && (
                                <p className="text-red-600 text-[10px]">{error.motherOccupation}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Mother Number:</label>
                            <input name="motherNumber" ref={(el) => (inputRef.current["motherNumber"] = el)} value={student.motherNumber} placeholder="Mother Number" className="pl-5 focus:outline-blue-600 text-sm md:text-lg max-w-full h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { setStudent({ ...student, motherNumber: e.target.value }), setError({ ...error, motherNumber: "" }) }} />
                            {error.motherNumber && (
                                <p className="text-red-600 text-[10px]">{error.motherNumber}</p>
                            )}
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-500 mt-2 text-white p-2 max-w-full rounded-lg cursor-pointer ">Register</button>
                </form>
            </div>
        </div>
    )
}
export default StudentAdmission;