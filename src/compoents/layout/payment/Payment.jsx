import axios from "axios"
import { useEffect, useState } from "react"
import CommenHeader from "../../commenHeader/CommenHeader"
import logo from "../../assets/profile4.jpg"
import { toast } from "react-toastify"
const API = import.meta.env.VITE_API
const Payment = () => {
    const [payment, setPayment] = useState([])
    const [paymentStudent, setPaymentStudent] = useState({
        roleNo: "",
        fees: "",
        name: "",
        standard: "",
        section: "",
        downPayment: "",
        currentDownPayment: "",
        balance: "",
        currentBalance: "",
        totalPaid: "",
        currentTotalPaid: ""
    })
    const [fees, setFees] = useState(false)
    const [view, setView] = useState(false)
    const [viewStudent, setViewStudent] = useState(null)
    const [viewData, setViewData] = useState([])
    const [map, setMap] = useState([])
    const GetForm = async () => {
        try {
            const getPayment = await axios.get(`${API}v1/getPayment`)
            setMap(getPayment.data.data)
            const Tabel = Array.from(new Map((getPayment.data.data).map(item => [item.roleNo, item])).values())
            setPayment(Tabel)

        } catch (err) {
            console.log(err)
        }
    }
    const Show = (item, roleNo) => {
        let Fees = map.filter((item) => item.roleNo === roleNo)
        setViewData(Fees)
        setViewStudent(item)
        setView(true)
        console.log(Fees)
    }
    // console.log(payment)
    useEffect(() => {
        GetForm()
    }, [])
    const Validation = () => {
        if (!paymentStudent.currentDownPayment) {
            toast.error("Enter payment amount")
            return false
        }
        if (Number(paymentStudent.currentDownPayment) <= 0) {
            toast.error("Invalid payment")
            return false
        }
        if (Number(paymentStudent.currentDownPayment) > Number(paymentStudent.balance)) {
            toast.error("Payment greater than balance")
            return false
        }
        return true
    }
    const OnEdit = (roleNo) => {
        const selected = payment.findLast((item) => item.roleNo === roleNo)
        if (!selected) return
        setPaymentStudent({
            roleNo: selected.roleNo,
            name: selected.name,
            standard: selected.standard,
            section: selected.section,
            downPayment: Number(selected.currentDownPayment),
            fees: Number(selected.fees),
            totalPaid: Number(selected.currentTotalPaid),
            currentTotalPaid: Number(selected.currentTotalPaid),
            balance: Number(selected.currentBalance),
        })
        setFees(true)
    }

    const addFees = async () => {
        try {
            console.log("hello")
            if (!Validation()) return
            const previousPaid = Number(paymentStudent.currentTotalPaid)
            const currentPay = Number(paymentStudent.currentDownPayment)
            const totalFees = Number(paymentStudent.fees)
            const TotalPaid = previousPaid + currentPay
            const newBalance = totalFees - TotalPaid
            const addPayment = {
                roleNo: paymentStudent.roleNo,
                name: paymentStudent.name,
                standard: paymentStudent.standard,
                section: paymentStudent.section,
                fees: totalFees,
                downPayment: paymentStudent.downPayment,
                currentDownPayment: paymentStudent.currentDownPayment,
                totalPaid: paymentStudent.totalPaid,
                currentTotalPaid: TotalPaid,
                balance: paymentStudent.balance,
                currentBalance: newBalance
            }
            console.log(addPayment)
            await axios.post(`${API}vupdatePayment`, addPayment)
            toast.success("Payment Successfully")
            setFees(false)
            GetForm()
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
        <div className="min-h-screen px-2">
            <CommenHeader title={"Payment"} logo={logo} />
            <div className="bg-white p-6 my-5 shadow-xl rounded-2xl">
                {payment.length === 0 ? (
                    <p className="text-center text-gray-500">No Payment Found</p>
                ) : (
                    <div className="overflow-x-scroll md:overflow-hidden">
                        <table className="w-full text-center">
                            <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="p-3">S.No</th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Standard</th>
                                    <th className="p-3">Section</th>
                                    <th className="p-3">Last pay</th>
                                    <th className="p-3">Paid</th>
                                    <th className="p-3">Total Fees</th>
                                    <th className="p-3">Balance</th>
                                    <th className="p-3">View</th>
                                    <th className="p-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {payment.map((item, index) => (
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

                                        <td className="p-3 text-green-600 font-semibold">
                                            ₹{item.currentTotalPaid}
                                        </td>

                                        <td className="p-3">₹{item.fees}</td>

                                        <td className="p-3 text-red-600 font-semibold">
                                            ₹{item.currentBalance}
                                        </td>

                                        <td className="p-3">
                                            <button
                                                onClick={() => Show(item, item.roleNo)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded"
                                            >
                                                View
                                            </button>
                                        </td>

                                        <td className="p-3">
                                            <button
                                                onClick={() => OnEdit(item.roleNo)}
                                                className="bg-green-500 text-white px-3 py-1 rounded"
                                            >
                                                Add Fees
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            </div>
            {view && viewStudent && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40">
                    <div className="bg-white w-fit p-6 mt-10 rounded-xl relative">
                        <button className="absolute top-3 right-3 text-red-500" onClick={() => setView(false)}>
                            X
                        </button>
                        <h2 className="text-xl font-bold text-center mb-4">
                            Payment Details
                        </h2>
                        <p>Role No : {viewStudent.roleNo}</p>
                        <p>Name : {viewStudent.name}</p>
                        <table className="w-full text-center overflow-y-scroll">
                            <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="p-3">S.No</th>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Standard</th>
                                    <th className="p-3">Section</th>
                                    <th className="p-3">Last pay</th>
                                    <th className="p-3">Paid</th>
                                    <th className="p-3">Total Fees</th>
                                    <th className="p-3">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {viewData.map((item, index) => (
                                    <tr key={item.id} className="border-b hover:bg-blue-50">
                                        <td className="p-3">{index + 1}</td>
                                        <td className="p-3 font-semibold">
                                            {item.name}
                                        </td>
                                        <td className="p-3">{item.standard}</td>
                                        <td className="p-3">{item.section}</td>
                                        <td className="p-3 text-green-600 font-semibold">
                                            ₹{item.currentDownPayment}
                                        </td>
                                        <td className="p-3 text-blue-600 font-semibold">
                                            ₹{item.currentTotalPaid}
                                        </td>
                                        <td className="p-3">
                                            ₹{item.fees}
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
            {fees && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40">
                    <div className="bg-white w-100 p-6 rounded-xl relative">
                        <button className="absolute right-3 top-3 text-red-500" onClick={() => setFees(false)}>
                            X
                        </button>
                        <h2 className="text-xl font-bold text-center mb-4">
                            Add Student Payment
                        </h2>
                        <p>Role No : {paymentStudent.roleNo}</p>
                        <p>Name : {paymentStudent.name}</p>
                        <p>Total Fees : ₹{paymentStudent.fees}</p>
                        <p>Paid : ₹{paymentStudent.totalPaid}</p>
                        <p>Balance : ₹{paymentStudent.balance}</p>
                        <input placeholder="Enter Payment" className="w-full border p-2 mt-3 rounded" value={paymentStudent.currentDownPayment} onChange={(e) => {
                            const value = Number(e.target.value)
                            const newBalance = paymentStudent.balance - value
                            setPaymentStudent({ ...paymentStudent, currentDownPayment: value, currentBalance: newBalance })
                        }} />
                        <p className="text-red-600 mt-2">
                            Current Balance : ₹{paymentStudent.currentBalance}
                        </p>
                        <button onClick={addFees} className="w-full bg-blue-600 text-white py-2 rounded mt-4">
                            Process Payment
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}
export default Payment