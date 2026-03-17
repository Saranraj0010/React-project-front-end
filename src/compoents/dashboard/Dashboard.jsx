import axios from "axios";
import { useEffect, useState } from "react";
import {useLoginStore} from "../layout/store/useLoginStore"

const API = import.meta.env.VITE_API;

const Dashboard = () => {

    const [student, setStudent] = useState([])
    const [staff, setStaff] = useState([])
    const [payment, setPayment] = useState([])
    const [time, setTime] = useState(new Date())
    const { darkMode, setDarkMode } = useLoginStore();

    const GetForm = async () => {
        try {
            const student = await axios.get(`${API}getStudent`)
            const staff = await axios.get(`${API}getStaff`)
            const payment = await axios.get(`${API}getPayment`)
            const filter = Array.from(new Map((payment.data.data).map(item => [item.roleNo, item])).values())
            setStudent(student.data.data)
            setStaff(staff.data.data)
            setPayment(filter)

        } catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        GetForm()

        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const date = time.toLocaleDateString()
    const clock = time.toLocaleTimeString()

    return (
        <div className={`${darkMode?"bg-black/80 border border-white":" bg-gray-50"} p-6 min-h-screen`}>

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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

                <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition duration-300">

                    <h2 className="text-lg font-semibold text-gray-600">
                        Total Students
                    </h2>

                    <p className="text-4xl font-extrabold text-blue-600 mt-3">
                        {student.length}
                    </p>

                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition duration-300">

                    <h2 className="text-lg font-semibold text-gray-600">
                        Total Staff
                    </h2>

                    <p className="text-4xl font-extrabold text-green-600 mt-3">
                        {staff.length}
                    </p>

                </div>
                 <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition duration-300">

                    <h2 className="text-lg font-semibold text-gray-600">
                        Total Fees Amount
                    </h2>

                    <div className="text-4xl font-extrabold text-blue-600 mt-3">
                       { payment.reduce((total, item) => total + Number(item.fees), 0)}
                    </div>

                </div>
                <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition duration-300">

                    <h2 className="text-lg font-semibold text-gray-600">
                        Total Fees Paided
                    </h2>

                    <div className="text-4xl font-extrabold text-green-600 mt-3">
                        {payment.reduce((total, item) => total + Number(item.downPayment), 0)}
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Dashboard