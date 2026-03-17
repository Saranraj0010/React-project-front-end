import { useState, useEffect } from "react"
import logo from "../../assets/profile4.jpg"
import ButtonHeader from "../commenHeader/ButtonHeader"
import axios from "axios"
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API;

const StaffAllocation = () => {

    const [show, setShow] = useState(false)

    const [user, setUser] = useState({
        staff: "",
        standard: "",
        section: "",
        subject: ""
    })

    const [staff, setStaff] = useState([])
    const [section, setSection] = useState([])
    const [standard, setStandard] = useState([])
    const [subject, setSubject] = useState([])
    const [allocation, setAllocation] = useState([])
    const [error, setError] = useState({})

    const Validation = () => {
        let newError = {}

        if (!user.staff) {
            toast.error("Staff required")
        }
        if (!user.standard) {
            toast.error("Standard required")
        }
        if (!user.section) {
            toast.error("Section required")
        }
        if (!user.subject) {
            toast.error("Subject required")
            return false
        }

        const alreadyExists = allocation.some(
            (item) =>
                item.staff === user.staff &&
                item.standard === user.standard &&
                item.section === user.section &&
                item.subject === user.subject
        )

        if (alreadyExists) {
            newError.staff = "Already allocated for this class & subject"
        }

        setError(newError)
        return Object.keys(newError).length === 0
    }

    const GetData = async () => {
        try {
            const [
                staffRes,
                standardRes,
                sectionRes,
                allocationRes,
                subjectRes
            ] = await Promise.all([
                axios.get(`${API}getStaff`),
                axios.get(`${API}getStandard`),
                axios.get(`${API}getSection`),
                axios.get(`${API}getAllocation`),
                axios.get(`${API}getSubject`)
            ])

            setStaff(staffRes.data.data)
            setStandard(standardRes.data.data)
            setSection(sectionRes.data.data)
            setAllocation(allocationRes.data.data)
            setSubject(subjectRes.data.data)

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        GetData()
    }, [])

    const Submit = async () => {
        if (!Validation()) return

        try {
            await axios.post(`${API}addAllocation`, user)
            await GetData()
            setShow(false)
            setUser({
                staff: "",
                standard: "",
                section: "",
                subject: ""
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="bg-gray-50 min-h-screen p-4">

            <ButtonHeader
                title={"Staff Allocation"}
                logo={logo}
                button={"Allocate Staff"}
                onclick={() => setShow(true)}
            />

            <div className="bg-white rounded-2xl shadow-lg mt-6 mx-5 p-6 overflow-x-auto">
                {allocation.length === 0 ? (
                    <p className="text-center text-gray-500">No StaffAllocation Found</p>
                ) : (<table className="w-full text-center border-collapse">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="p-3">S.No</th>
                            <th className="p-3">Staff Name</th>
                            <th className="p-3">Class</th>
                            <th className="p-3">Subject</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allocation.map((item, index) => (
                            <tr key={item.id} className="border-b hover:bg-blue-50 transition">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{item.staff}</td>
                                <td className="p-3">{item.standard}-{item.section}</td>
                                <td className="p-3">{item.subject}</td>
                                <td className="p-3 flex justify-center gap-2">
                                    <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg">
                                        Edit
                                    </button>
                                    <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>)}
            </div>

            {show && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 space-y-4">

                        <h2 className="text-xl font-bold text-center text-blue-600">
                            Staff Allocation
                        </h2>

                        <div>
                            <label className="font-medium">Staff</label>
                            <select
                                value={user.staff}
                                onChange={(e) => {
                                    setUser({ ...user, staff: e.target.value })
                                    setError({})
                                }}
                                className="w-full h-10 border rounded-lg px-2 mt-1 focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Staff</option>
                                {staff.map((item) => (
                                    <option
                                        key={item.id}
                                        value={`${item.firstName} ${item.lastName}`}
                                    >
                                        {item.firstName} {item.lastName}
                                    </option>
                                ))}
                            </select>
                            {error.staff && <p className="text-red-500 text-sm">{error.staff}</p>}
                        </div>

                        <div>
                            <label className="font-medium">Standard</label>
                            <select
                                value={user.standard}
                                onChange={(e) => {
                                    setUser({ ...user, standard: e.target.value })
                                    setError({})
                                }}
                                className="w-full h-10 border rounded-lg px-2 mt-1 focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Standard</option>
                                {standard.map((item) => (
                                    <option key={item.id} value={item.standard}>
                                        {item.standard}
                                    </option>
                                ))}
                            </select>
                            {error.standard && <p className="text-red-500 text-sm">{error.standard}</p>}
                        </div>

                        <div>
                            <label className="font-medium">Section</label>
                            <select
                                value={user.section}
                                onChange={(e) => {
                                    setUser({ ...user, section: e.target.value })
                                    setError({})
                                }}
                                className="w-full h-10 border rounded-lg px-2 mt-1 focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Section</option>
                                {section.map((item) => (
                                    <option key={item.id} value={item.section}>
                                        {item.section}
                                    </option>
                                ))}
                            </select>
                            {error.section && <p className="text-red-500 text-sm">{error.section}</p>}
                        </div>

                        <div>
                            <label className="font-medium">Subject</label>
                            <select
                                value={user.subject}
                                onChange={(e) => {
                                    setUser({ ...user, subject: e.target.value })
                                    setError({})
                                }}
                                className="w-full h-10 border rounded-lg px-2 mt-1 focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Subject</option>
                                {subject.map((item) => (
                                    <option key={item.id} value={item.subject}>
                                        {item.subject}
                                    </option>
                                ))}
                            </select>
                            {error.subject && <p className="text-red-500 text-sm">{error.subject}</p>}
                        </div>

                        <div className="flex justify-center gap-4 pt-2">
                            <button
                                onClick={() => setShow(false)}
                                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={Submit}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                            >
                                Submit
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

export default StaffAllocation