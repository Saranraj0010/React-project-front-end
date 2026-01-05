import { useState, useEffect } from "react";

const StudentView = ({ StudentProfile }) => {
    const [searchId, setSearchId] = useState("");
    const [data, setData] = useState([]);

    const handleSearch = () => {
        console.log(StudentProfile)
        // const result = studentProfile.filter(
        //     (student) => student.studentId === searchId
        // );
        // setData(result);
        // console.log(studentProfile)
    };

    return (                  
        <>
            <div>
                <div className=" flex flex-col items-center gap-2">
                    <label className="text-xl font-semibold">Enter the Student ID</label>
                    <input
                        type="text"
                        placeholder="Search by Student ID"
                        minLength={2}
                        maxLength={3}
                        className="pl-5 w-40 text-sm md:text-lg md:w-60 focus:ring-2 focus:ring-blue-500 outline-none h-10 border rounded-lg hover:border-blue-500 shadow-xl mb-4"
                        onChange={(e) => setSearchId(e.target.value)}
                    />
                </div>

                <div className="text-center ">
                    <button className="bg-blue-500 text-white  p-2 rounded-lg cursor-pointer mb-4" onClick={handleSearch}>Search</button>
                </div>
            </div>
            <div className="flex gap-5">
            {data.map((student) => (
                <table className="border-2">
                    <thead className="border-2 text-center font-bold"><h1 className="p-2">Student Details</h1></thead>
                    <tbody>
                        <tr className="border-2"><td className="p-2">Student ID:{student.studentId}</td></tr>
                        <tr className="border-2"><td className="p-2">Name:{student.firstName}.{student.middleName} {student.lastName}</td></tr>
                        <tr className="border-2"><td className="p-2">Date Of Birth:{student.dateOfBirth}</td></tr>
                        <tr className="border-2"><td className="p-2">Street Address:{student.streetAddress}</td></tr>
                        <tr className="border-2"><td className="p-2">City:{student.city}</td></tr>
                        <tr className="border-2"><td className="p-2">State:{student.state}</td></tr>
                        <tr className="border-2"><td className="p-2">Country:{student.country}</td></tr>
                        <tr className="border-2"><td className="p-2">Pincode:{student.pincode}</td></tr>
                        <tr className="border-2"><td className="p-2">E-mail:{student.email}</td></tr>
                        <tr className="border-2"><td className="p-2">Phone Number:{student.phoneNumber}</td></tr>
                    </tbody>
                </table>
            ))}
            </div>
        </>
    );
};

export default StudentView;