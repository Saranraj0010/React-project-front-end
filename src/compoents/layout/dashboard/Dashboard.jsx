import axios from "axios";
import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API;

const Dashboard = () => {

    const [student, setStudent] = useState([])
    const [staff, setStaff] = useState([])
    const [time, setTime] = useState(new Date())

    // ---------------- GET DATA ----------------
    const GetForm = async () => {
        try {
            const [studentRes, staffRes] = await Promise.all([
                axios.get(`${API}getStudent`),
                axios.get(`${API}getStaff`)
            ])

            setStudent(studentRes.data.data)
            setStaff(staffRes.data.data)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        GetForm()

        // Live clock
        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const date = time.toLocaleDateString()
    const clock = time.toLocaleTimeString()

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            {/* HEADER */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-2xl shadow-xl p-6 flex flex-col md:flex-row justify-between items-center text-white">

                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Welcome To School Dashboard 👋
                    </h1>
                    <p className="text-sm opacity-90">
                        Manage your school data easily
                    </p>
                </div>

                <div className="flex gap-6 mt-4 md:mt-0 font-mono text-sm md:text-base">
                    <div>
                        <span className="font-semibold">Date:</span> {date}
                    </div>
                    <div>
                        <span className="font-semibold">Time:</span> {clock}
                    </div>
                </div>

            </div>

            {/* STAT CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

                {/* STUDENTS CARD */}
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition duration-300">

                    <h2 className="text-lg font-semibold text-gray-600">
                        Total Students
                    </h2>

                    <p className="text-4xl font-extrabold text-blue-600 mt-3">
                        {student.length}
                    </p>

                </div>

                {/* STAFF CARD */}
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition duration-300">

                    <h2 className="text-lg font-semibold text-gray-600">
                        Total Staff
                    </h2>

                    <p className="text-4xl font-extrabold text-green-600 mt-3">
                        {staff.length}
                    </p>

                </div>

            </div>

        </div>
    )
}

export default Dashboard