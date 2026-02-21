import ButtonHeader from "../commenHeader/ButtonHeader"
import logo from "../../assets/profile4.jpg"
import close from "../../assets/close.png"
import { useState } from "react"
import Input from "../../Elaments/Input"
import Button from "../../Elaments/Button"
import axios from "axios"
import { LabelName } from "../../Elaments/LabelName"
import { useEffect } from "react"
const API = import.meta.env.VITE_API;

const Circular = () => {
    const [showCircular, setShowCircular] = useState(false)
    const [data, setData] = useState([])
    const [noData, setNoData] = useState(false)
    const [filter, setFilter] = useState({ text: "", select: "" })
    const [circular, setCircular] = useState({ text: "", title: "", file: null, select: "" })
    const Submit = async () => {
        const formData = new FormData();
        formData.append("file", circular.file)
        formData.append("text", circular.text)
        formData.append("title", circular.title)
        formData.append("select", circular.select)
        console.log(formData, "helloz")
        console.log(circular)
        try {
            const add = await axios.post(`${API}addCircular`, formData)
            console.log(add)
            setCircular({
                text: "",
                title: "",
                file: null,
                select: ""
            })
            GetForm()
            setShowCircular(false)
        }
        catch (err) {
            console.log(err)
        }
    }
    const GetForm = async () => {
        const get = await axios.get(`${API}getCircular`)
        setData(get.data.data)
    }
    let filterData = data;

    if (filter.select && filter.select !== "all") {
        filterData = data.filter(
            (item) => item.role_type === filter.select
        )
    }
    if (filter.text) {
        filterData = filterData.filter((item) =>
            item.title.toLowerCase().includes(filter.text.toLowerCase()) ||
            item.text.toLowerCase().includes(filter.text.toLowerCase())
        )
    }
    useEffect(() => {
        GetForm()
    }, [])
    return (
        <>
            <div className="">
                <ButtonHeader title={"Circular"} logo={logo} button={"Add Circular"} onclick={() => { setShowCircular(true) }} />
                <div className=" bg-white rounded-2xl p-5 m-5 shadow-2xl text-right">
                    <Input type="text" placeholder={"enter title or content"} value={filter.text} onchange={(e) => { setFilter({ ...filter, text: e.target.value }) }} />
                    <select className="h-10 mx-5 border rounded-lg" value={filter.select} onChange={(e) => { setFilter({ ...filter, select: e.target.value }) }} name="" id="">
                        <option value="">Select the Role Type</option>
                        <option value="all">All</option>
                        <option value="staff">Staff</option>
                        <option value="student">Student</option>
                    </select>
                    <button className="bg-green-400 rounded-lg p-1 cursor-pointer" onClick={() => setFilter({ text: "", select: "" })}>Reset</button>
                </div>
                <div className=" bg-white rounded-2xl p-5 m-5 shadow-2xl">{
                    noData ? (<></>) : (
                        <div className=" grid grid-cols-3 gap-5">
                            {filterData.map((item) => (
                                <div className="border rounded-xl p-4 text-lg" key={item.id}>
                                    <div className="flex gap-3">
                                        <p className=" font-bold">Role Type:</p>
                                        <p>{item.role_type}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <p className=" font-bold">Title:</p>
                                        <p>{item.title}</p>
                                    </div>
                                    <div className="gap-3">
                                        <p className=" font-bold">Circular:</p>
                                        <p className="mx-2">{item.text}</p>
                                    </div>
                                    <div className="">
                                        <a href={`${item.file}`} target="_blank">View File </a>
                                    </div>
                                </div>
                            ))}
                        </div>)
                }
                </div>
                {
                    showCircular && (
                        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                            <div className="relative bg-white rounded-2xl p-3 text-center">
                                <img src={close} className="bg-red-500 absolute right-3" onClick={() => { setShowCircular(false) }} />
                                <h1 className="font-bold">Create Circular</h1>
                                <select name="select" className=" border rounded-lg h-10" id="" onChange={(e) => (setCircular({ ...circular, select: e.target.value }))}>
                                    <option value="">Select the Staff or Student</option>
                                    <option value="all">All</option>
                                    <option value="staff">Staff</option>
                                    <option value="student">Student</option>
                                </select>
                                <div className="text-left m-4">
                                    <div className="flex flex-col m-1">
                                        <LabelName>Circular</LabelName>
                                        <input className="max-w-full my-5 pl-5 focus:outline-blue-600 text-sm md:text-lg h-10 border rounded-lg hover:border-blue-500 shadow-xl" placeholder="Title:" onChange={(e) => { setCircular({ ...circular, title: e.target.value }) }} />
                                        <textarea name="" onChange={(e) => { setCircular({ ...circular, text: e.target.value }) }} placeholder="Content..." className="border text-lg size-90 w-150" id=""></textarea></div>
                                    <Input type="file" onchange={(e) => { setCircular({ ...circular, file: e.target.files[0] }) }} className="bg-gray-400 m-1 border border-gray-700 rounded-lg h-fit w-50" />
                                    {/* <input type="file" onChange={(e)=>{setCircular({...circular,file:e.target.value})}} className="bg-gray-400 border border-gray-700 rounded-lg w-50" /> */}
                                </div>
                                <Button onClick={Submit}>button</Button>
                            </div>
                        </div>
                    )}
            </div >
        </>
    )
}
export default Circular