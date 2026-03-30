import CommenHeader from "../../commenHeader/CommenHeader"
import logo from "../../../assets/profile4.jpg"
import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
const API = import.meta.env.VITE_API;

const ClassStudent = () => {
    const [allocation, setAllocation] = useState([])
    const [student, setStudent] = useState([])
    const [classStudent, setClassStudent] = useState([])
    const [profileData, setProfileData] = useState([])
    const GetData = async () => {
        try {
            const allocation = await axios.get(`${API}getAllocation`)
            const get = await axios.get(`${API}getStudent`)
            setAllocation(allocation.data.data)
            setStudent(get.data.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        if (allocation.length && student.length && profileData) {

            // Get logged in staff name
            const staffName = profileData?.firstName;

            // Find allocation for that staff
            const staffAllocation = allocation.find(
                (item) => item.staff === staffName
            );

            if (staffAllocation) {
                // Filter students based on standard & section
                const filteredStudents = student.filter(
                    (stu) =>
                        stu.standard === staffAllocation.standard &&
                        stu.section === staffAllocation.section
                );

                setClassStudent(filteredStudents);
            } else {
                setClassStudent([]);
            }
        }
    }, [allocation, student, profileData]);
    useEffect(() => {
        if (allocation) {
            const staff = profileData.filter((item) => item.firstName == allocation.staff)
            const filt = staff.some((item) => item.standard == student.standard || item.section == student.section)
            setClassStudent(filt)
        }
    }, [allocation, student])
    return (
        <>
            <div className="">
                <CommenHeader title={"Class Student"} logo={logo} />
                <div className="bg-white rounded-2xl shadow my-5 p-4">
                    {classStudent.length > 0 ? (<table className="w-full border shadow-lg">
                        <thead className="">
                            <tr className="bg-blue-600 text-white uppercase text-sm">
                                <th className="border p-3">Name</th>
                                <th className="border p-3">Date Of Birth</th>
                                <th className="border p-3">Standard</th>
                                <th className="border p-3">Section</th>
                                <th className="border p-3">Mobile Number</th>
                                <th className="border p-3">View</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classStudent.map((item) => (
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
                                </tr>
                            ))}
                        </tbody>
                    </table>) : (
                        <div>
                            <p className="text-center text-gray-500">
                                No Students Found
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}
export default ClassStudent