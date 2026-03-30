import { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CommenHeader from "../../commenHeader/CommenHeader";
import logo from "../../../assets/profile4.jpg"
import close from "../../../assets/close.png"
import { useEffect } from "react";
import { useRef } from "react";
import { LabelName } from "../../../Elaments/LabelName";
import { toast } from "react-toastify";
import { useStudentAdmissionStore } from "../../store/useStudentAdmissionStore";

const API = import.meta.env.VITE_API;

const StudentAdmission = () => {
    const { input, inputData, student, setStudent, error, setError, setErrors, standard, setStandard, section, setSection, price, setPrice, fees, setFees, data, setData, id, setId, Validation1, Validation2, payment, setPayment,resetStudent,resetPayment } = useStudentAdmissionStore()
    // const Validation1 = () => {
    //     let newError = {};
    //     let Email = /^\S+@\S+\.\S+$/
    //     let Number = /^\+?[1-9]\d{6,14}$/
    //     // if (student.roleNo.trim() === ""){
    //     //     toast.error("Role Number requird")
    //     //      newError.roleNo = "Role Number requird"
    //     // }
    //     if (student.userName.trim() === "") {
    //         toast.error("User Name requird")
    //         newError.userName = "User Name requird"
    //     }
    //     if (student.firstName.trim() === "") {
    //         toast.error("First Name requird")
    //         newError.firstName = "First Name requird"
    //     }
    //     if (student.lastName.trim() === "") {
    //         toast.error("Last Name requird")
    //         newError.lastName = "Last Name requird"
    //     }
    //     if (student.gender.trim() === "") {
    //         toast.error("Gender requird")
    //         newError.gender = "Gender requird"
    //     }
    //     if (student.dateOfBirth.trim() === "") {
    //         toast.error("DOB requird")
    //         newError.dateOfBirth = "DOB requird"
    //     }
    //     if (student.aaadharno.trim() === "") {
    //         toast.error("Aaadharno requird")
    //         newError.aaadharno = "Aaadharno requird"
    //     }
    //     if (student.standard.trim() === "") {
    //         toast.error("Standard requird")
    //         newError.standard = "Standard requird"
    //     }
    //     if (student.bloodGroup.trim() === "") {
    //         toast.error("BloodGroup requird")
    //         newError.bloodGroup = "BloodGroup requird"
    //     }
    //     if (student.language.trim() === "") {
    //         toast.error("Language requird")
    //         newError.language = "Language requird"
    //     }
    //     if (student.section.trim() === "") {
    //         toast.error("Section requird")
    //         newError.section = "Section requird"
    //     }
    //     if (student.address.trim() === "") {
    //         toast.error("Address requird")
    //         newError.address = "Address requird"
    //     }
    //     if (student.state.trim() === "") {
    //         toast.error("State requird")
    //         newError.state = "State requird"
    //     }
    //     if (student.pincode.trim() === "") {
    //         toast.error("Pincode requird")
    //         newError.pincode = "Pincode requird"
    //     }
    //     if (student.nationality.trim() === "") {
    //         toast.error("Nationality requird")
    //         newError.nationality = "Nationality requird"
    //     }
    //     if (student.email.trim() === "") {
    //         toast.error("Email requird")
    //         newError.email = "Email requird"
    //     }
    //     else if (!Email.test(student.email)) {
    //         toast.error("Invalid email")
    //         newError.email = "Invalid email"
    //     }
    //     if (student.studentMobileNo.trim() === "") {
    //         toast.error("Phone Number requird")
    //         newError.studentMobileNo = "Phone Number requird"
    //     }
    //     else if (!Number.test(student.studentMobileNo)) {
    //         toast.error("Invalid phone number format")
    //         newError.studentMobileNo = "Invalid phone number format"
    //     }
    //     if (student.fatherName.trim() === "") {
    //         toast.error("Father Name requird")
    //         newError.fatherName = "Father Name requird"
    //     }
    //     if (student.fatherNumber.trim() === "") {
    //         toast.error("Father Number requird")
    //         newError.fatherNumber = "Father Number requird"
    //     }
    //     else if (!Number.test(student.fatherNumber)) {
    //         toast.error("Invalid phone number format")
    //         newError.fatherNumber = "Invalid phone number format"
    //     }
    //     if (student.fatherOccupation.trim() === "") {
    //         toast.error("Father Occupation requird")
    //         newError.fatherOccupation = "Father Occupation requird"
    //     }
    //     if (student.motherName.trim() === "") {
    //         toast.error("Mother Name requird")
    //         newError.motherName = "Mother Name requird"
    //     }
    //     if (student.motherNumber.trim() === "") {
    //         toast.error("Mother Number requird")
    //         newError.motherNumber = "Mother Number requird"
    //     }
    //     else if (!Number.test(student.motherNumber)) {
    //         toast.error("Invalid phone number format")
    //         newError.motherNumber = "Invalid phone number format"
    //     }
    //     if (student.motherOccupation.trim() === "") {
    //         toast.error("Mother Occupation requird")
    //         newError.motherOccupation = "Mother Occupation requird"
    //     }
    //     setErrors(newError);
    //     if (Object.keys(newError).length > 0) {
    //         const firstErrorKey = Object.keys(newError)[0];
    //         inputRef.current[firstErrorKey]?.focus();
    //         return false;
    //     }
    //     return true;
    // }
    // const Validation2 = () =>{
    //     let newError = {};

    //     if (payment.downPayment.trim() === "") {
    //         toast.error("DownPayment requird")
    //         newError.downPayment = "DownPayment requird"
    //     }
    //     else if (payment.downPayment >= data.fees) {
    //         toast.error("DownPayment is grater than fees")
    //         newError.downPayment = "DownPayment is grater than fees"
    //     }
    //     setErrors(newError);
    //     if (Object.keys(newError).length > 0) {
    //         const firstErrorKey = Object.keys(newError)[0];
    //         inputRef.current[firstErrorKey]?.focus();
    //         return false;
    //     }
    //     return true;
    // }
    const AddFrom = async (e) => {
        e.preventDefault();
        if (!Validation1()) return;
        try {
            const selectedFees = price.find((item) => item.standard === student.standard);
            setData(selectedFees);
            setPayment("name", `${student.firstName} ${student.lastName}`);
            setPayment("standard", student.standard);
            setPayment("section", student.section);
            setPayment("fees", selectedFees?.fees || 0);
            setPayment("downPayment", "");
            setPayment("currentDownPayment", "");
            setPayment("balance", selectedFees?.fees || 0);
            setPayment("currentBalance", selectedFees?.fees || 0);
            setFees(true)
        }
        catch (err) {
            console.log(err)
        }
    }
    const downPayment = async (e) => {
        e.preventDefault();

        if (!Validation2()) return;

        try {

            const studentData = await axios.post(`${API}addStudent`,student);
            const paymentData = await axios.post(`${API}addPayment`,payment );
            resetStudent()
            resetPayment()
            setFees(false);

            GetForm();

        } catch (err) {
            console.log(err);
        }
    };
    const GetForm = async () => {
        try {
            const get = await axios.get(`${API}getStandard`)
            const section = await axios.get(`${API}getSection`)
            const fees = await axios.get(`${API}getFees`)
            setSection(section.data.data)
            setStandard(get.data.data)
            setPrice(fees.data.data)
        }
        catch (err) {
            console.log(err, "hello")
        }
    }
    useEffect(() => {
        GetForm()
    }, [])
    return (
        <div className="h-screen px-2">
            <CommenHeader title={"Student Admission"} logo={logo} button={"Add Student"} />
            <div className="bg-gray-50 my-5 rounded-2xl shadow-inner p-6">
                <form className={`w-full p-5 border rounded-lg flex flex-col gap-4`} onSubmit={(e) => AddFrom(e)}>
                    <h1 className="font-bold text-center underline text-2xl">ADMISSION FORM</h1>
                    <h1 className="font-semibold text-lg">Student Information</h1>
                    <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {/* <div className="flex flex-col gap-2">
                            <LabelName>User RoleNo:</LabelName>
                            <input name="roleNo"  value={`ADMISSION-${String(id).padStart(3, "0")}`} className={input} onChange={(e) => { setStudent("roleNo", e.target.value), setError("roleNo", "") }} />
                            {error.roleNo && (
                                <p className="text-red-600 text-[10px]">{error.roleNo}</p>
                            )}
                        </div> */}
                        <div className="flex flex-col gap-2">
                            <LabelName>User Name:</LabelName>
                            <input name="userName" value={student.userName} placeholder="User Name" className={input} onChange={(e) => { setStudent("userName", e.target.value), setError("userName", "") }} />
                            {error.userName && (
                                <p className="text-red-500 text-[10px]">{error.userName}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <LabelName>First Name:</LabelName>
                            <input name="firstName" value={student.firstName} placeholder="First Name" className={input} onChange={(e) => { setStudent("firstName", e.target.value), setError("firstName", "") }} />
                            {error.firstName && (
                                <p className="text-red-600 text-[10px]">{error.firstName}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <LabelName>Last Name:</LabelName>
                            <input name="lastName" value={student.lastName} placeholder="Last Name" className={input} onChange={(e) => { setStudent("lastName", e.target.value), setError("lastName", "") }} />
                            {error.lastName && (
                                <p className="text-red-600 text-[10px]">{error.lastName}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <LabelName>Gender:</LabelName>
                            <select name="gender" value={student.gender} placeholder="First Name" className={input} onChange={(e) => { setStudent("gender", e.target.value), setError("gender", "") }}>
                                <option value="">Select the Gender</option>
                                <option value="male">Male</option>
                                <option value="feMale">FeMale</option>
                                <option value="others">Others</option>
                            </select>
                            {error.gender && (
                                <p className="text-red-600 text-[10px]">{error.gender}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <LabelName>Date Of Birth:</LabelName>
                            <input name="dateOfBirth" value={student.dateOfBirth} placeholder="Enter DateofBirth" className={input} onChange={(e) => { setStudent("dateOfBirth", e.target.value), setError("dateOfBirth", "") }} />
                            {error.dateOfBirth && (
                                <p className="text-red-600 text-[10px]">{error.dateOfBirth}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <LabelName>Aaadhar No:</LabelName>
                            <input name="aaadharno" value={student.aaadharno} placeholder="Aaadhar No" className={input} onChange={(e) => { setStudent("aaadharno", e.target.value), setError("aaadharno", "") }} />
                            {error.aaadharno && (
                                <p className="text-red-600 text-[10px]">{error.aaadharno}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <LabelName>Standard:</LabelName>
                            <select name="standard" value={student.standard} placeholder="Standard" className={input} onChange={(e) => { setStudent("standard", e.target.value), setError("standard", "") }} >
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
                            <LabelName>Blood Group:</LabelName>
                            <input name="bloodGroup" value={student.bloodGroup} placeholder="Blood Group" className={input} onChange={(e) => { setStudent("bloodGroup", e.target.value), setError("bloodGroup", "") }} />
                            {error.bloodGroup && (
                                <p className="text-red-600 text-[10px]">{error.bloodGroup}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <LabelName>Language:</LabelName>
                            <input name="language" value={student.language} placeholder="Language" className={input} onChange={(e) => { setStudent("language", e.target.value), setError("language", "") }} />
                            {error.language && (
                                <p className="text-red-600 text-[10px]">{error.language}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <LabelName>Section:</LabelName>
                            <select name="section" value={student.section} placeholder="Section" className={input} onChange={(e) => { setStudent("section", e.target.value), setError("section", "") }} >
                                <option value="">Select Section</option>
                                {section.map((item) => (
                                    <option key={item.section} value={item.section}>{item.section}</option>
                                ))}
                            </select>
                            {error.section && (
                                <p className="text-red-600 text-[10px]">{error.section}</p>
                            )}
                        </div>
                    </div>
                    <h1 className="font-semibold text-lg">Address</h1>
                    <div className="grid grid-cols-2 gap-1">
                        <div className="flex flex-col gap-2">
                            <LabelName>Address:</LabelName>
                            <input name="address" value={student.address} placeholder="Address" className={input} onChange={(e) => { setStudent("address", e.target.value), setError("address", "") }} />
                            {error.address && (
                                <p className="text-red-600 text-[10px]">{error.address}</p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2">
                            <LabelName>State:</LabelName>
                            <input name="state" value={student.state} placeholder="State" className={input} onChange={(e) => { setStudent("state", e.target.value), setError("state", "") }} />
                            {error.state && (
                                <p className="text-red-600 text-[10px]">{error.state}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <LabelName>Nationality:</LabelName>
                            <input name="nationality" value={student.nationality} placeholder="Nationality" className={input} onChange={(e) => { setStudent("nationality", e.target.value), setError("nationality", "") }} />
                            {error.nationality && (
                                <p className="text-red-600 text-[10px]">{error.nationality}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <LabelName>Pincode:</LabelName>
                            <input name="pincode" value={student.pincode} placeholder="Pincode" maxLength={6} className={input} onChange={(e) => { setStudent("pincode", e.target.value), setError("pincode", "") }} />
                            {error.pincode && (
                                <p className="text-red-600 text-[10px]">{error.pincode}</p>
                            )}
                        </div>
                    </div>
                    <h1 className="font-semibold text-lg">Contact Info</h1>
                    <div className="md:grid lg:grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <LabelName>E-mail:</LabelName>
                            <input name="email" value={student.email} placeholder="E-mail" className={input} onChange={(e) => { setStudent("email", e.target.value), setError("email", "") }} />
                            {error.email && (
                                <p className="text-red-600 text-[10px]">{error.email}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <LabelName>Student Mobilno:</LabelName>
                            <input name="studentMobileNo" value={student.studentMobileNo} placeholder="Student MobileNo " className={input} onChange={(e) => { setStudent("studentMobileNo", e.target.value), setError("studentMobileNo", "") }} />
                            {error.studentMobileNo && (
                                <p className="text-red-600 text-[10px]">{error.studentMobileNo}</p>
                            )}
                        </div>
                    </div>
                    <h1 className="font-semibold text-lg">Parants Details</h1>
                    <div className="md:grid lg:grid-cols-3">
                        {inputData.map((item) => (
                            <div className="flex flex-col gap-2" key={item.title}>
                                <LabelName>{item.title}</LabelName>
                                <input name={item.name} value={student[item.name]} placeholder={item.title} className={input} onChange={(e) => { setStudent(`${item.name}`, e.target.value), setError(`${item.name}`, "") }} />
                                {error[item.name] && (
                                    <p className="text-red-600 text-[10px]">{error[item.name]}</p>
                                )}
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="bg-blue-500 mt-2 text-white p-2 max-w-full rounded-lg cursor-pointer ">Register</button>
                </form>
            </div>
            
            {fees && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                    <div className="bg-white w-112.5 h-fit p-6 rounded-2xl shadow-2xl relative">

                        <button
                            className="absolute right-4 top-4 text-red-500 text-xl"
                            onClick={() => setFees(false)}
                        >
                            ✕
                        </button>

                        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
                            Admission Payment
                        </h2>

                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span>Student Name:</span>
                                <span className="font-semibold">
                                    {student.firstName} {student.lastName}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span>Standard:</span>
                                <span className="font-semibold">{student.standard}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Section:</span>
                                <span className="font-semibold">{student.section}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Total Fees:</span>
                                <span className="font-semibold text-green-600">
                                    ₹ {data?.fees || 0}
                                </span>
                            </div>

                            <div>
                                <label className="block mb-1 font-medium">
                                    Down Payment
                                </label>
                                <input
                                    type="number"
                                    className={input}
                                    value={payment.downPayment}
                                    onChange={(e) => {
                                        const value = e.target.value

                                        setPayment("downPayment", value)
                                        setPayment("currentDownPayment", value)
                                        setPayment("totalPaid",value)
                                        setPayment("currentTotalPaid",value)
                                        setPayment("balance", payment.fees - value)
                                        setPayment("currentBalance", payment.fees - value)
                                        setError("downPayment", "")
                                    }}
                                />
                                {error.downPayment && (
                                    <p className="text-red-600 text-[10px]">{error.downPayment}</p>
                                )}
                            </div>
                            <div className="flex justify-between mt-2">
                                <span>Balance:</span>
                                <span className="font-semibold text-red-600">
                                    ₹ {payment.currentBalance}
                                </span>
                            </div>

                            <button
                                className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg mt-4"
                                onClick={downPayment}
                            >
                                Process Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
export default StudentAdmission;    