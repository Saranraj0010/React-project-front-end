import axios from "axios";
import { useEffect, useState } from "react";
import { useLoginStore } from "../store/useLoginStore"

const API = import.meta.env.VITE_API;

const Dashboard = () => {

    const [student, setStudent] = useState([])
    const [staff, setStaff] = useState([])
    const [payment, setPayment] = useState([])
    const [time, setTime] = useState(new Date())
    const [lastPay, setLastPay] = useState([])
    const { darkMode } = useLoginStore();
  const [isLoading, setIsLoading] = useState(true);

const GetForm = async () => {
  try {
    const studentRes = await axios.get(`${API}v1/getStudent`);
    const staffRes = await axios.get(`${API}v1/getStaff`);
    const paymentRes = await axios.get(`${API}v1/getPayment`);

    setLastPay(paymentRes.data.data);

    const filter = Array.from(
      new Map(paymentRes.data.data.map(item => [item.roleNo, item])).values()
    );

    setStudent(studentRes.data.data);
    setStaff(staffRes.data.data);
    setPayment(filter);

  } catch (err) {
    console.log(err);
  } finally {
    setIsLoading(false);
  }
};
    useEffect(() => {
        GetForm()

        const timer = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const date = time.toLocaleDateString()
    const clock = time.toLocaleTimeString()
    const cardStyle = darkMode
        ? "bg-gray-900 text-white shadow-md"
        : "bg-white text-gray-800 shadow-lg";

    const titleStyle = darkMode ? "text-gray-300" : "text-gray-600";

    return (
  <>
    {isLoading ? (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    ) : (
      <div className={`${darkMode ? "bg-gray-950 text-white" : " text-black"} h-screen`}>
            <div className={`bg-linear-to-r ${darkMode
                    ? "from-gray-900 via-gray-800 to-gray-900"
                    : "from-blue-600 to-blue-400"
                } rounded-2xl shadow-xl p-6 flex flex-col md:flex-row justify-between items-center text-white`}>
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold">
                        Welcome To School Dashboard 👋
                    </h1>
                    <p className="text-sm opacity-90">
                        Manage your school data easily
                    </p>
                </div>
               <div className={`flex gap-6 mt-4 md:mt-0 font-mono text-sm md:text-base ${darkMode ? "text-gray-300" : "text-white"}`}>
                    <div>
                        <span className="font-semibold">Date:</span> {date}
                    </div>
                    <div>
                        <span className="font-semibold">Time:</span> {clock}
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-5">
                <div className={`rounded-2xl p-6 text-center hover:shadow-2xl transition duration-300 ${cardStyle}`}>
                    <h2 className={`text-lg font-semibold ${titleStyle}`}>
                        Total Students
                    </h2>
                    <p className="text-4xl font-extrabold text-blue-600 mt-3">
                        {student.length}
                    </p>
                </div>
                <div className={`rounded-2xl p-6 text-center hover:shadow-2xl transition duration-300 ${cardStyle}`}>
                    <h2 className={`text-lg font-semibold ${titleStyle}`}>
                        Total Staff
                    </h2>
                    <p className="text-4xl font-extrabold text-green-600 mt-3">
                        {staff.length}
                    </p>
                </div>
                <div className={`rounded-2xl p-6 text-center hover:shadow-2xl transition duration-300 ${cardStyle}`}>
                    <h2 className={`text-lg font-semibold ${titleStyle}`}>
                        Total Fees Amount
                    </h2>
                    <div className="text-4xl font-extrabold text-blue-600 mt-3">
                        {payment.reduce((total, item) => total + Number(item.fees), 0)}
                    </div>
                </div>
                <div className={`rounded-2xl p-6 text-center hover:shadow-2xl transition duration-300 ${cardStyle}`}>
                    <h2 className={`text-lg font-semibold ${titleStyle}`}>
                        Total Fees Paided
                    </h2>
                    <div className="text-4xl font-extrabold text-green-600 mt-3">
                        {payment.reduce((total, item) => total + Number(item.downPayment), 0)}
                    </div>
                </div>
            </div>
            <div className={`rounded-2xl p-6 text-center hover:shadow-2xl transition duration-300 ${cardStyle}`}>
                 <table className="w-full text-center">
                            <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="p-3">S.No</th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Standard</th>
                                    <th className="p-3">Section</th>
                                    <th className="p-3">Last pay</th>
                                    <th className="p-3">Balance</th>
                                </tr>
                            </thead>

                            <tbody>
                                {lastPay.map((item, index) => (
                                    <tr key={item.id} className="border-b hover:bg-blue-50">
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3 font-semibold text-blue-700">
                                            {item.name}
                                        </td>
                                        <td className="p-3">{item.standard}</td>
                                        <td className="p-3">{item.section}</td>
                                        <td className="p-3 text-green-600 font-semibold">
                                            ₹{item.currentDownPayment}
                                        </td>
                                        <td className="p-3 text-red-600 font-semibold">
                                            ₹{item.currentBalance}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
            </div>
        </div>
    )}
  </>
)
}
export default Dashboard