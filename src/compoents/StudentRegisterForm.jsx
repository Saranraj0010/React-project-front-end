import { useState } from "react";
import StudentView from "./Studentview";
import { VscChromeClose } from "react-icons/vsc";

const StudentRegisterForm = () => {

    const [show, setShow] = useState(false);
    const [student, setStudent] = useState({
        studentId: "",
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        streetAddress: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        email: "",
        phoneNumber: ""
    })
    const [studentProfile, setStudentProfile] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [data, setData] = useState([]);


    function handleRegister(e) {
        e.preventDefault();
        const studentData = JSON.parse(localStorage.getItem("student")) || [];
        studentData.push(student);
        localStorage.setItem("student", JSON.stringify(studentData));
        setStudentProfile(studentData);
    }
    const SearchId = () => {
        const result = studentProfile.filter((roleid) => roleid.studentId === searchId)
        setData(result);
        setShow(true)
        // console.log(data);
    }

    // console.log(data);


    return (
        <>
            {/* <StudentView Data={data} /> */}
            <div className="w-fit m-auto mt-15 p-5 border rounded-lg flex flex-col gap-4">
                <h1 className="font-semibold text-lg text-center">Students Information</h1>
                <input type="text" placeholder="Search by Student ID" className="pl-5 w-60 h-10 border rounded-lg hover:border-blue-500 shadow-xl mb-4" onChange={(e) => setSearchId(e.target.value)} />
                <button type="button" onClick={SearchId} className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer mb-4">Search</button>
            </div>


            {
                show && (
                    <div className="fixed inset-0 bg-black/50 cursor-context-menu flex justify-center items-center">
                        <div className="grid grid-cols-1 gap-6 relative bg-white h-fit mt-7 w-fit p-5 rounded-2xl ">
                                        <h1 className="font-bold text-xl">Student Information</h1>
                            <VscChromeClose
                                className="cursor-pointer self-end absolute top-3 right-3 text-2xl"
                                onClick={() => setShow(false)}
                            />
                            <div className="w-fit m-auto p-5 border rounded-lg flex flex-col gap-4">
                                <div>
                                    <table border={1} className="p-2">
                                                {data.map((id) => (
                                                    <tb border={1} className="p-2">
                                                    <tr className="p-1">Name:{id.firstName}.{id.middleName} {id.lastName}</tr>
                                                    <tr className="p-1">Date of Birth:{id.dateOfBirth}</tr>
                                                    <tr className="p-1">Student ID:{id.studentId}</tr>
                                                    <tr className="p-1">Street Address:{id.streetAddress}</tr>
                                                    <tr className="p-1">City:{id.city}</tr>
                                                    <tr className="p-1">State:{id.state}</tr>
                                                    <tr className="p-1">Country:{id.country}</tr>
                                                    <tr className="p-1">Pincode:{id.pincode}</tr>
                                                    <tr className="p-1">E-mail:{id.email}</tr>
                                                    <tr className="p-1">Phone Number:{id.phoneNumber}</tr>
                                                    </tb>
                                                ))}
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                )
            }









            <div className="flex justify-center items-center mt-10 mb-10">
                <form onSubmit={handleRegister} className="w-fit p-5 border rounded-lg flex flex-col gap-4">
                    <h1 className="font-bold text-center underline text-2xl">STUDENT REGISTER FORM</h1>
                    <h1 className="font-semibold text-lg">Student Information</h1>
                    <div className="grid grid-cols-3 gap-2">

                        <div className="flex flex-col gap-2">
                            <label>First Name:</label>
                            <input name="firstName" placeholder="First Name" type="text" className="pl-5 w-60 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, firstName: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Middle Name:</label>
                            <input name="middleName" placeholder="Middle Name" type="text" className="pl-5 w-60 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, middleName: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Last Name:</label>
                            <input name="lastName" type="text" placeholder="Last Name" className="pl-5 w-60 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, lastName: e.target.value })} />
                        </div>
                        <div className="flex flex-col col-span-2 gap-2">
                            <label>Date Of Birth:</label>
                            <input name="dateOfBirth" type="date" placeholder="Date Of Birth" className="pl-5 w-125 h-10 p-1 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, dateOfBirth: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Student ID:</label>
                            <input name="studentId" type="text" placeholder="Student ID" className="pl-5 w-60 h-10 p-1 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, studentId: e.target.value })} />
                        </div>
                    </div>
                    <h1 className="font-semibold text-lg">Address</h1>
                    <div className="grid grid-cols-2 gap-1">
                        <div className="flex flex-col col-span-2 gap-2">
                            <label>Street Address:</label>
                            <input name="streetAddress" placeholder="Street Address" type="text" className="pl-5 w-192px h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, streetAddress: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>City:</label>
                            <input name="city" placeholder="City" type="text" className="pl-5 w-95 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, city: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>State:</label>
                            <input name="state" placeholder="State" type="text" className="pl-5 w-95 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, state: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Country:</label>
                            <input name="Country" placeholder="Country" type="text" className="pl-5 w-95 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, country: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Pincode:</label>
                            <input name="pincode" placeholder="Pincode" type="text" className="w-95 pl-5 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, pincode: e.target.value })} />
                        </div>
                    </div>
                    <h1 className="font-semibold text-lg">Contact Info</h1>
                    <div className="grid grid-cols-2">
                        <div className="flex flex-col gap-2">
                            <label>E-mail:</label>
                            <input name="E-mail" placeholder="E-mail" type="text" className="pl-5 w-95 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, email: e.target.value })} />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label>Phone Number:</label>
                            <input name="phoneNumber" placeholder="Phone Number" type="text" className="pl-5 w-95 h-10 border rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => setStudent({ ...student, phoneNumber: e.target.value })} />
                        </div>
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg cursor-pointer ">Register</button>
                </form>
            </div>
        </>
    )
}
export default StudentRegisterForm;