import ButtonHeader from "../commenHeader/ButtonHeader"
import logo from "../../assets/profile4.jpg"
import close from "../../assets/close.png"
import { useState, useEffect } from "react"
import axios from "axios"

const API = import.meta.env.VITE_API;

const Circular = () => {

    const [showCircular, setShowCircular] = useState(false)
    const [data, setData] = useState([])
    const [filter, setFilter] = useState({ text: "", select: "" })

    const [circular, setCircular] = useState({
        title: "",
        text: "",
        file: null,
        select: ""
    })

    const GetForm = async () => {
        try {
            const res = await axios.get(`${API}getCircular`)
            setData(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        GetForm()
    }, [])

    const Submit = async () => {

        if (!circular.title || !circular.text || !circular.select) {
            alert("Please fill all required fields")
            return
        }

        const formData = new FormData()
        formData.append("file", circular.file)
        formData.append("text", circular.text)
        formData.append("title", circular.title)
        formData.append("select", circular.select)

        try {
            await axios.post(`${API}addCircular`, formData)

            setCircular({
                title: "",
                text: "",
                file: null,
                select: ""
            })

            GetForm()
            setShowCircular(false)

        } catch (err) {
            console.log(err)
        }
    }

    let filterData = data

    if (filter.select && filter.select !== "all") {
        filterData = filterData.filter(
            (item) => item.role_type === filter.select
        )
    }

    if (filter.text) {
        filterData = filterData.filter((item) =>
            item.title.toLowerCase().includes(filter.text.toLowerCase()) ||
            item.text.toLowerCase().includes(filter.text.toLowerCase())
        )
    }

    return (
        <div className="bg-gray-50 min-h-screen p-4">

            <ButtonHeader
                title={"Circular"}
                logo={logo}
                button={"Add Circular"}
                onclick={() => setShowCircular(true)}
            />

            <div className="bg-white rounded-2xl mx-5 p-5 mt-6 shadow-lg flex flex-col md:flex-row gap-4 items-center">

                <input
                    type="text"
                    placeholder="Search title or content..."
                    value={filter.text}
                    onChange={(e) => setFilter({ ...filter, text: e.target.value })}
                    className="border rounded-lg px-3 h-10 w-full md:w-72 focus:ring-2 focus:ring-blue-500"
                />

                <select
                    className="border rounded-lg h-10 px-3"
                    value={filter.select}
                    onChange={(e) => setFilter({ ...filter, select: e.target.value })}
                >
                    <option value="all">All</option>
                    <option value="staff">Staff</option>
                    <option value="student">Student</option>
                </select>

                <button
                    className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => setFilter({ text: "", select: "" })}
                >
                    Reset
                </button>

            </div>

            <div className="bg-white rounded-2xl p-6 mx-5 mt-6 shadow-lg">

                {filterData.length === 0 ? (
                    <p className="text-center text-gray-500">No Circular Found</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filterData.map((item) => (
                            <div key={item.id} className="border rounded-2xl p-5 shadow hover:shadow-xl transition">

                                <p className="text-sm text-blue-600 font-semibold mb-2">
                                    {item.role_type.toUpperCase()}
                                </p>

                                <h2 className="font-bold text-lg mb-2">
                                    {item.title}
                                </h2>

                                <p className="text-gray-600 text-sm mb-3">
                                    {item.text}
                                </p>

                                {item.file && (
                                    <a
                                        href={item.file}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-blue-600 underline text-sm"
                                    >
                                        View Attachment
                                    </a>
                                )}

                            </div>
                        ))}
                    </div>
                )}

            </div>

            {showCircular && (
                <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl shadow-2xl p-6 w-96 relative">

                        <img
                            src={close}
                            className="absolute top-4 right-4 cursor-pointer"
                            width={20}
                            onClick={() => setShowCircular(false)}
                        />

                        <h2 className="text-xl font-bold text-center text-blue-600 mb-4">
                            Create Circular
                        </h2>

                        <select
                            className="border rounded-lg h-10 px-3 w-full mb-3"
                            onChange={(e) => setCircular({ ...circular, select: e.target.value })}
                            value={circular.select}
                        >
                            <option value="">Select Role Type</option>
                            <option value="all">All</option>
                            <option value="staff">Staff</option>
                            <option value="student">Student</option>
                        </select>

                        <input
                            type="text"
                            placeholder="Title"
                            value={circular.title}
                            onChange={(e) => setCircular({ ...circular, title: e.target.value })}
                            className="border rounded-lg h-10 px-3 w-full mb-3"
                        />

                        <textarea
                            placeholder="Content..."
                            value={circular.text}
                            onChange={(e) => setCircular({ ...circular, text: e.target.value })}
                            className="border rounded-lg p-3 w-full h-28 mb-3"
                        />

                        <input
                            type="file"
                            onChange={(e) => setCircular({ ...circular, file: e.target.files[0] })}
                            className="mb-4"
                        />

                        <button
                            onClick={Submit}
                            className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg"
                        >
                            Submit
                        </button>

                    </div>
                </div>
            )}

        </div>
    )
}

export default Circular