import logo from "../../assets/profile4.jpg"
import close from "../../assets/close.png"
import { useState, useEffect } from "react"
import axios from "axios"
import ButtonHeader from "../commenHeader/ButtonHeader"

const API = import.meta.env.VITE_API;

const Section = () => {

    const [user, setUser] = useState({ section: "" })
    const [roll, setRoll] = useState({ section: "", id: "" })
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [update, setUpdate] = useState(false)
    const [Delete, setDelete] = useState(false)
    const [error, setError] = useState({})
    const [id, setId] = useState("")

    // ---------------- VALIDATION ----------------
    const Validation = () => {
        let newError = {}
        const value = update ? roll.section : user.section

        if (value.trim() === "") {
            newError.section = "Section is required"
        }

        if (!update && data.find(
            (item) => item.section.toLowerCase() === value.toLowerCase()
        )) {
            newError.section = "Section already exists"
        }

        setError(newError)
        return Object.keys(newError).length === 0
    }

    // ---------------- ADD SECTION ----------------
    const Submit = async (e) => {
        e.preventDefault()
        if (!Validation()) return

        try {
            await axios.post(`${API}addSection`, user)
            setUser({ section: "" })
            GetForm()
            setShow(false)
        } catch (err) {
            console.log(err)
        }
    }

    // ---------------- GET DATA ----------------
    const GetForm = async () => {
        try {
            const res = await axios.get(`${API}getSection`)
            setData(res.data.data)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        GetForm()
    }, [])

    // ---------------- EDIT ----------------
    const IsEdit = (id) => {
        const result = data.find((item) => item.id === id)
        if (result) {
            setUpdate(true)
            setShow(true)
            setRoll({
                section: result.section,
                id: result.id
            })
        }
    }

    const Update = async (e) => {
        e.preventDefault()
        if (!Validation()) return

        try {
            await axios.patch(`${API}updateSection`, roll)
            setRoll({ section: "", id: "" })
            setUpdate(false)
            GetForm()
            setShow(false)
        } catch (err) {
            console.log(err)
        }
    }

    // ---------------- DELETE ----------------
    const Deletes = async () => {
        try {
            await axios.patch(`${API}deleteSection`, { id })
            GetForm()
            setDelete(false)
        } catch (err) {
            console.log(err)
        }
    }

    const Del = (id) => {
        setDelete(true)
        setId(id)
    }

    return (
        <div className="bg-gray-50 rounded-xl shadow-md p-3 m-3 relative">

            <ButtonHeader
                title={"Section"}
                logo={logo}
                button={"Add Section"}
                onclick={() => {
                    setShow(true)
                    setUpdate(false)
                    setUser({ section: "" })
                }}
            />

            {/* TABLE */}
            <div className="bg-white p-6 mt-6 shadow-lg rounded-2xl">
                <table className="w-full text-center border-collapse">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="p-3">S.No</th>
                            <th className="p-3">Section</th>
                            <th className="p-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id} className="border-b hover:bg-blue-50 transition">
                                <td className="p-3">{index + 1}</td>
                                <td className="p-3">{item.section}</td>
                                <td className="p-3">
                                    <button
                                        onClick={() => IsEdit(item.id)}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg m-1 transition"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => Del(item.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg m-1 transition"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ADD / UPDATE MODAL */}
            {show && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-2xl w-96 relative">

                        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
                            {update ? "Update Section" : "Add Section"}
                        </h1>

                        <img
                            src={close}
                            width={25}
                            className="absolute top-4 right-4 cursor-pointer"
                            onClick={() => {
                                setShow(false)
                                setError({})
                            }}
                        />

                        <form
                            className="flex flex-col"
                            onSubmit={(e) => update ? Update(e) : Submit(e)}
                        >
                            <label className="font-medium mb-1">Section</label>
                            <input
                                type="text"
                                value={update ? roll.section : user.section}
                                className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e) => {
                                    update
                                        ? setRoll({ ...roll, section: e.target.value })
                                        : setUser({ ...user, section: e.target.value })
                                    setError({})
                                }}
                            />

                            {error.section && (
                                <span className="text-red-500 text-sm mt-1">
                                    {error.section}
                                </span>
                            )}

                            <button
                                type="submit"
                                className="bg-blue-600 hover:bg-blue-700 text-white p-2 mt-4 rounded-lg transition"
                            >
                                {update ? "Update" : "Submit"}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* DELETE MODAL */}
            {Delete && (
                <div className="fixed inset-0 flex justify-center items-center bg-black/50 z-50">
                    <div className="bg-white p-6 rounded-2xl shadow-xl w-80 text-center">
                        <h2 className="text-lg font-semibold text-gray-700">
                            Are you sure you want to delete this section?
                        </h2>
                        <div className="mt-5 flex justify-center gap-4">
                            <button
                                onClick={() => setDelete(false)}
                                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={Deletes}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Section