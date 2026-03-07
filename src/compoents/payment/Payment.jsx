import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import CommenHeader from "../commenHeader/CommenHeader";
import logo from "../../assets/profile4.jpg"
import { toast } from "react-toastify";
const API = import.meta.env.VITE_API;

const Payment = () => {
    const [student, setStudent] = useState([])
    const [paymentStudent, setPaymentStudent] = useState({
        roleNo: "",
        fees: "",
        name: "",
        standard: "",
        section: "",
        downPayment: "",
        balance: "",
        currentpayment: "",
        currentBalance: ""
    })
    const [payment, setPayment] = useState([])
    const [fees, setFees] = useState(false)
    const [onePay, setOnePay] = useState("")
    const [error, setError] = useState({})
    const [view, setView] = useState(false)
   const Validation = () => {
    let newError = {}

    if (!paymentStudent.currentpayment) {
        toast.error("Payment required")
        return false
    }
    else if (paymentStudent.currentpayment > paymentStudent.balance) {
        toast.error("Payment is greater than balance")
        return false
    }

    setError(newError)

    return Object.keys(newError).length === 0
}
    const GetForm = async () => {
        try {
            const get = await axios.get(`${API}getStudent`)
            const payment = await axios.get(`${API}getPayment`)
            setStudent(get.data.data)
            setPayment(payment.data.data)
        }
        catch (err) {
            console.log(err, "hello")
        }
    }
  const addFees = async () => {
    try {

       if (!Validation()) return

        const updatedPayment = {
            roleNo: paymentStudent.roleNo,
            downPayment:
                Number(paymentStudent.downPayment) +
                Number(paymentStudent.currentpayment),
            balance: paymentStudent.currentBalance
        }

        console.log(updatedPayment)

        const update = await axios.patch(`${API}updatePayment`, updatedPayment)

        console.log(update.data)

        setFees(false)
        GetForm()

    } catch (err) {
        console.log(err)
    }
}
    const OnEdit = (id) => {
        const selectedStudent = student.find((item) => item.roleNo === id)
        const selectedPayment = payment.find((item) => item.roleNo === id)

        if (selectedPayment) {
            setPaymentStudent(selectedPayment)
        } else if (selectedStudent) {
            setPaymentStudent({
                roleNo: selectedStudent.roleNo,
                name: `${selectedStudent.firstName} ${selectedStudent.lastName}`,
                standard: selectedStudent.standard,
                section: selectedStudent.section,
                fees: 0,
                downPayment: 0,
                balance: 0
            })
        }

        setFees(true)
    }
    useEffect(() => {
        GetForm()
    }, [])
    return (
        <>
            <div className="">
                <CommenHeader title={"Payment"} logo={logo} />
                <div className="bg-white p-6 m-5 shadow-xl rounded-2xl border border-blue-100">
                    <table className="w-full text-center border-collapse">
                        <thead>
                            <tr className="bg-blue-600 text-white">
                                <th className="p-3">S.No</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Standard</th>
                                <th className="p-3">Section</th>
                                <th className="p-3">Paided</th>
                                <th className="p-3">Total Fees</th>
                                <th className="p-3">Balance</th>
                                <th className="p-3">View</th>
                                <th className="p-3">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {payment.map((item, index) => (
                                <tr
                                    key={item.id}
                                    className="border-b hover:bg-blue-50 transition"
                                >
                                    <td className="p-3">{index + 1}</td>
                                    <td className="p-3 font-semibold text-blue-700">
                                        {item.name}
                                    </td>
                                    <td className="p-3 font-semibold text-blue-700">
                                        {item.standard}
                                    </td>
                                    <td className="p-3 font-semibold text-blue-700">
                                        {item.section}
                                    </td>
                                    <td className="p-3 font-semibold text-blue-700">
                                        {item.downPayment}
                                    </td>
                                    <td className="p-3 font-semibold text-blue-700">
                                        {item.fees}
                                    </td>
                                    <td className="p-3 font-semibold text-blue-700">
                                        {item.balance}
                                    </td>
                                    <td className="p-3">
                                        <button onClick={()=>{setView(true)}} className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg m-1 transition">
                                            View
                                        </button>
                                    </td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => { OnEdit(item.roleNo), setOnePay(item.downPayment) }}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg m-1 transition"
                                        >
                                            Add Fees
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {
                    view && (
                       <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                            <div className="bg-white w-[450px] p-6 rounded-2xl shadow-2xl relative">
                                <button className="absolute right-4 top-4 text-red-500 text-xl" onClick={() => setView(false)}>✕</button>
                                <div className="">
                                    <h1>{}</h1>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    fees && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                            <div className="bg-white w-[450px] p-6 rounded-2xl shadow-2xl relative">

                                <button
                                    className="absolute right-4 top-4 text-red-500 text-xl"
                                    onClick={() => setFees(false)}
                                >
                                    ✕
                                </button>

                                <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
                                    Student Fees Payment
                                </h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span>Student Name:</span>
                                        <span className="font-semibold">{paymentStudent.name}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Standard:</span>
                                        <span className="font-semibold">{paymentStudent.standard}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Section:</span>
                                        <span className="font-semibold">{paymentStudent.section}</span>
                                    </div>

                                    <div className="flex justify-between">
                                        <span>Total Fees:</span>
                                        <span className="font-semibold text-green-600">
                                            ₹{paymentStudent.fees}
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Fees Balance:</span>
                                        <span className="font-semibold text-green-600">
                                            ₹ {paymentStudent.currentBalance || paymentStudent.balance}
                                        </span>
                                    </div>

                                    <div>
                                        <label className="block mb-1 font-medium">
                                            Down Payment
                                        </label>
                                        <input
                                            className="pl-4 h-10 border border-gray-300 rounded-lg"
                                            value={paymentStudent.currentpayment}
                                            onChange={(e) => {
                                                const value = e.target.value

                                                setPaymentStudent({
                                                    ...paymentStudent,
                                                    currentpayment: value,
                                                    currentBalance: paymentStudent.balance - value
                                                }), setError({ ...error, currentpayment: "" })
                                            }}
                                        />
                                        {error.downPayment && (
                                            <p className="text-red-600 text-[10px]">{error.downPayment}</p>
                                        )}
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <span>Balance:</span>
                                        <span className="font-semibold text-red-600">
                                            ₹ {paymentStudent.currentBalance}
                                        </span>
                                    </div>

                                    <button
                                        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg mt-4"
                                        onClick={addFees}
                                    >
                                        Process Payment
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}
export default Payment;