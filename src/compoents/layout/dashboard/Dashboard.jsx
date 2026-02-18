import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
const API = import.meta.env.VITE_API;

const Dashboard = () => {
    const [student, setStudent] = useState([])
    const [staff, setStaff] = useState([])
    const currentDate = new Date();
    let time = currentDate.toLocaleTimeString()
    let date = currentDate.toLocaleDateString()
    const GetForm = async () => {
        try {
            const student = await axios.get(`${API}getStudent`)
            const staff = await axios.get(`${API}getStaff`)
            setStudent(student.data.data)
            setStaff(staff.data.data)
        }
        catch (err) {
            console.log(err, "hello")
        }
    }
    useEffect(() => {
        GetForm()
    }, [])

    return (
        <><div className="p-5">
            <div className="bg-white rounded-lg shadow-2xl p-1 m-5">
                <div className="bg-blue-400 m-2 rounded-lg p-2 flex justify-between items-center px-5 gap-3">
                    <div className="text-white font-semibold text-lg">Welcome To School Site!</div>
                    <div className="flex gap-5">
                        <div className="text-white font-mono">Date:{date}</div>
                        <div className="text-white font-mono">Time:{time}</div>
                    </div>
                </div>
            </div>
            <div className="flex justify-around bg-gray-200 m-5 rounded-lg shadow-2xl p-5">
                <div className="bg-white rounded-lg shadow-2xl p-4 m-2 text-center ">
                    <p className=" font-semibold text-red-600 text-2xl">Number Of Students in School</p>
                    <p className="font-extrabold text-blue-600 text-2xl">{student.length}</p>
                </div>
                <div className="bg-white rounded-lg shadow-2xl p-1 m-2 text-center">
                    <p className=" font-semibold text-red-600 text-2xl">Number Of Staffs in School</p>
                    <p className="font-extrabold text-blue-600 text-2xl">{staff.length}</p>
                </div>
            </div>
        </div>
        </>
    )
}
export default Dashboard