import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import CommenHeader from "../../commenHeader/CommenHeader";
import logo from "../../../assets/profile4.jpg"
import Delimage from "../../../assets/trash.png"
import EditImg from "../../../assets/edit.png"
const API = import.meta.env.VITE_API;
const AdmissionDetails = () => {
    const [student, setStudent] = useState([])
    const GetForm = async () => {
        try {
            const get = await axios.get(`${API}getStudent`)
            console.log(get.data.data)
            setStudent(get.data.data)
        }
        catch (err) {
            console.log(err, "hello")
        }
    }
    useEffect(() => {
        GetForm()
    }, [])
    return (
        <div className="">
            <CommenHeader title={"Admission Details"} logo={logo} />
            <div className="bg-white rounded-2xl shadow flex justify-center items-center m-5 p-2">
                <table className="w-full border shadow-lg">
                    <thead className="">
                        <tr className="bg-blue-600 text-white uppercase text-sm">
                            <th className="border p-3">Name</th>
                            <th className="border p-3">Date Of Birth</th>
                            <th className="border p-3">Standard</th>
                            <th className="border p-3">Mobile Number</th>
                            <th className="border p-3">View</th>
                            <th className="border p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {student.map((item) => (
                            <tr key={item.id} className={`bg-white hover:bg-gray-500 hover:text-white transition-colors`}>
                                <td className="border p-3 font-medium">{item.firstName} {item.lastName}</td>
                                <td className="border p-3">{item.dateOfBirth}</td>
                                <td className="border p-3">{item.standard}</td>
                                <td className="border p-3">{item.studentMobileNo}</td>
                                <td className="border p-3">
                                    <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition">
                                        View
                                    </button>
                                </td>
                                <td className="border p-3 flex gap-2">
                                    <button className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition">
                                        Edit
                                    </button>
                                    <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </div>
    )
}
export default AdmissionDetails