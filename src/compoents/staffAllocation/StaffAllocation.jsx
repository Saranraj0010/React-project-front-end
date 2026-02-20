import { useState } from "react"
import logo from "../../assets/profile4.jpg"
import ButtonHeader from "../commenHeader/ButtonHeader"
import close from "../../assets/close.png"
import { useEffect } from "react"
import axios from "axios"
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
    const [subject, SetSubject] = useState([])
    const [allocation, setAllocation] = useState([])
    const [filter, setFilter] = useState([])
    const [error, setError] = useState({})
    const Validation = () => {
        let newError = {};

        if (user.staff.trim() === "") newError.staff = "Staff required";
        if (user.standard.trim() === "") newError.standard = "Standard required";
        if (user.section.trim() === "") newError.section = "Section required";
        if (user.subject.trim() === "") newError.subject = "Subject required";
        const alreadyExists = allocation.some((item) => item.staff === user.staff && item.standard === user.standard && item.section === user.section && item.subject === user.subject);
        if (alreadyExists) newError.staff = "This staff is already allocated to this class & subject";
        setError(newError);
        return Object.keys(newError).length === 0;
    };
    const GetData = async () => {
        try {
            const staff = await axios.get(`${API}getStaff`)
            const standard = await axios.get(`${API}getStandard`)
            const section = await axios.get(`${API}getSection`)
            const allocation = await axios.get(`${API}getAllocation`)
            const subject = await axios.get(`${API}getSubject`)
            setStaff(staff.data.data)
            setStandard(standard.data.data)
            setSection(section.data.data)
            setAllocation(allocation.data.data)
            SetSubject(subject.data.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        GetData()
    }, [])
    const Submit = async () => {
        if (!Validation()) return
        try {
            const add = await axios.post(`${API}addAllocation`, user)
            GetData()
            setShow(false)
            setUser({
                staff: "",
                standard: "",
                section: ""
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className="">
                <ButtonHeader title={"Staff Allocation"} logo={logo} button={"Staff Allocation"} onclick={() => { setShow(true) }} />

                <div className="bg-white rounded-lg flex justify-center items-center shadow-2xl m-5 p-4">
                    <table>
                        <thead className="text-center">
                            <tr>
                                <td className="p-2 border">S.No</td>
                                <td className="p-2 border">Staff Name</td>
                                <td className="p-2 border">Class</td>
                                <td className="p-2 border">Subject</td>
                                <td className="p-2 border">Action</td>
                            </tr>
                        </thead>
                        <tbody>{allocation.map((item, index) => (
                            <tr key={item.id}>
                                <td className="p-2 border text-center">{index + 1}</td>
                                <td className="p-2 border">{item.staff}</td>
                                <td className="p-2 border">{item.standard}-{item.section}</td>
                                <td className="p-2 border">{item.subject}</td>
                                <td className="p-2 border flex gap-2">
                                    <button className="bg-green-500 rounded-lg cursor-pointer p-1">Edit</button>
                                    <button className="bg-red-500 rounded-lg cursor-pointer p-1">Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                {
                    show && (
                        <div className="bg-black/60 absolute inset-0">
                            <div className="flex justify-center mt-10">
                                <div className="bg-white flex gap-5 flex-col w-fit rounded-lg p-3 relative left-2">
                                    <div className="relative flex flex-col">
                                        <label>Staff Allocation</label>
                                        <select name="staff" value={user.staff} onChange={(e) => { setUser({ ...user, staff: e.target.value }), setError({ ...error, staff: "" }) }} className="h-10 border rounded-lg w-60">
                                            <option value="">Select the Staff</option>
                                            {staff.map((item) => (
                                                <option key={item.id} value={item.firstName + " " + item.lastName}>{item.firstName}{item.lastName}</option>
                                            ))}
                                        </select>
                                        {error.staff && (
                                            <p className="text-red-600 text-[10px] absolute top-17 right-2">{error.staff}</p>
                                        )}</div>
                                    <div className="relative flex flex-col">
                                        <label>Stanard Allocation</label>
                                        <select name="standard" onChange={(e) => { setUser({ ...user, standard: e.target.value }), setError({ ...error, standard: "" }) }} className="h-10 border rounded-lg w-60" id="">
                                            <option value="">Select the Stanard</option>
                                            {standard.map((item) => (
                                                <option key={item.id} value={item.standard}>{item.standard}</option>
                                            ))}
                                        </select>
                                        {error.standard && (
                                            <p className="text-red-600 text-[10px] absolute top-17 right-2">{error.standard}</p>
                                        )}</div>
                                    <div className="relative flex flex-col">
                                        <label>Section Allocation</label>
                                        <select name="section" onChange={(e) => { setUser({ ...user, section: e.target.value }), setError({ ...error, section: "" }) }} className="h-10 border rounded-lg w-60" id="">
                                            <option value="">Select the Section</option>
                                            {section.map((item) => (
                                                <option key={item.id} value={item.section}>{item.section}</option>
                                            ))}
                                        </select>
                                        {error.section && (
                                            <p className="text-red-600 text-[10px] absolute top-17 right-2">{error.section}</p>
                                        )}</div>
                                    <div className="relative flex flex-col">
                                        <label>Subject Allocation</label>
                                        <select name="section" onChange={(e) => { setUser({ ...user, subject: e.target.value }), setError({ ...error, subject: "" }) }} className="h-10 border rounded-lg w-60" id="">
                                            <option value="">Select the Subject</option>
                                            {subject.map((item) => (
                                                <option key={item.id} value={item.subject}>{item.subject}</option>
                                            ))}
                                        </select>
                                        {error.subject && (
                                            <p className="text-red-600 text-[10px] absolute top-17 right-2">{error.subject}</p>
                                        )}</div>
                                    <div className="text-center">
                                        <button className="bg-red-500 mx-3 rounded-lg p-1 hover:bg-red-800 hover:text-white" onClick={() => setShow(false)}>close</button>
                                        <button className="bg-green-500 mx-3 rounded-lg p-1 hover:bg-green-800 hover:text-white" onClick={Submit}>Submit</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}
export default StaffAllocation