import { useState, useEffect } from "react";
import StudentRegisterForm from "./StudentRegisterForm";
import { useStudentStore } from "./useStudentStore";

const StudentView = () => {
    const { studentProfile } = useStudentStore()
    const [searchId, setSearchId] = useState("");
    const [data, setData] = useState([]);

    const handleSearch = () => {
        console.log(studentProfile)
        const result = studentProfile.filter(
            (student) => student.studentId === searchId
        );
        setData(result);
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
                {data.map((items) => (
                    <table className="border-2">
                        <thead className="border-2 text-center font-bold"><h1 className="p-2">Student Details</h1></thead>
                        <tbody>
                            <tr className="border-2"><td className="p-2" key={items}>Student ID:{items.studentId}</td></tr>
                            <tr className="border-2"><td className="p-2" key={items}>Name:{items.firstName}.{items.middleName} {items.lastName}</td></tr>
                            <tr className="border-2"><td className="p-2" key={items}>Date Of Birth:{items.dateOfBirth}</td></tr>
                            <tr className="border-2"><td className="p-2" key={items}>Street Address:{items.streetAddress}</td></tr>
                            <tr className="border-2"><td className="p-2" key={items}>City:{items.city}</td></tr>
                            <tr className="border-2"><td className="p-2" key={items}>State:{items.state}</td></tr>
                            <tr className="border-2"><td className="p-2" key={items}>Country:{items.country}</td></tr>
                            <tr className="border-2"><td className="p-2" key={items}>Pincode:{items.pincode}</td></tr>
                            <tr className="border-2"><td className="p-2" key={items}>E-mail:{items.email}</td></tr>
                            <tr className="border-2"><td className="p-2" key={items}>Phone Number:{items.phoneNumber}</td></tr>
                        </tbody>
                    </table>
                ))}
            </div>
        </>
    );
};

export default StudentView;