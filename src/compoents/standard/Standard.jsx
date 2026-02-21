import logo from "../../assets/profile4.jpg"
import { useState } from "react"
import close from "../../assets/close.png"
import { useEffect } from "react"
import axios from "axios"
import ButtonHeader from "../commenHeader/ButtonHeader"
const API = import.meta.env.VITE_API;

const Standard = () => {
    const [user, setUser] = useState({
        standard: ""
    })
    const [roll, setRoll] = useState({
        standard: ""
    })
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const [update, setUpdate] = useState(false)
    const [Delete, setDelete] = useState(false)
    const [error, setError] = useState({})
    const [id, setId] = useState("")
    const Validation = () => {
        let newError = {};
        if (user.standard.trim() === "") newError.standard = "Standard required";
        if (data.find((item) => item.standard.toLocaleLowerCase() === user.standard.toLocaleLowerCase())) newError.standard = "Already exist";
        setError(newError);
        return Object.keys(newError).length === 0;
    }
    const Submit = async (e) => {
        try {
            e.preventDefault();
            if (!Validation()) return
            const add = await axios.post(`${API}addStandard`, user)
            setUser({ standard: "" })
            GetForm()
            setShow(false)
        }
        catch (err) {
            console.log(err)
        }

    }
    const GetForm = async () => {
        try {
            const get = await axios.get(`${API}getStandard`)
            setData(get.data.data)
        }
        catch (err) {
            console.log(err, "hello")
        }
    }
    useEffect(() => {
        GetForm()
    }, [])
    const IsEdit = (id) => {
        const result = data.find((item) => item.id === id)
        console.log(result)
        if (result) {
            setUpdate(true)
            setShow(true)
            setRoll({
                standard: result.standard,
                id: result.id
            })
        }
    }
    const Update = async (e) => {
        try {
            e.preventDefault();
            console.log("update")
            console.log(user)
            const add = await axios.patch(`${API}updateStandard`, roll)
            setRoll({ standard: "" })
            GetForm()
            setShow(false)
            setUpdate(false)
        }
        catch (err) {
            console.log(err)
        }

    }
    const Deletes = async () => {
        try {
            const add = await axios.patch(`${API}deleteStandard`, { id })
            GetForm()
            setDelete(false)
        }
        catch (err) {
            console.log(err)
        }

    }
    const Del = (id) => {
        setDelete(true)
        setId(id)
    }
    return (
        <>
            <div className="bg-white rounded-lg shadow p-1 m-2">
                <ButtonHeader title={"Standard"} logo={logo} button={"Add Standard"} onclick={() => { setShow(true), setUpdate(false) }} />
                <div className="bg-white p-5 m-5 shadow-2xl flex justify-center items-center rounded-2xl">
                    <table className="text-center">
                        <thead>
                            <tr>
                                <td className="p-2 border">S.No</td>
                                <td className="p-2 border">Standard</td>
                                <td className="p-2 border">Action</td>
                            </tr>

                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr className="p-2 border" key={item.id}>
                                    <td className="p-2 border">{index + 1}</td>
                                    <td className="p-2 border" >{item.standard}</td>
                                    <td className="p-2 border">
                                        <button onClick={() => { IsEdit(item.id) }} className="bg-blue-700 cursor-pointer m-1 p-2 rounded-lg text-white">edit</button>
                                        <button onClick={() => { Del(item.id) }} className="bg-red-700 cursor-pointer m-1 p-2 rounded-lg text-white">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {show &&
                    <div className="flex justify-center  items-center inset-0 absolute bg-black/50">
                        <div className="bg-white p-6 relative mb-50 rounded-lg">
                            <h1 className=" font-bold text-center text-2xl -mt-3">STANDARD</h1>
                            <div className=" absolute bg-red-500 right-2 top-2" onClick={() => setShow(false)}><img src={close}  onClick={()=>{setUser({standard:""}),setError({standard:""})}} width={30} /></div>
                            <form action="" className="flex flex-col" onSubmit={(e) => { update ? Update(e) : Submit(e) }}>
                                <label className="text-black">Standard:</label>
                                <input type="text" value={update ? roll.standard : user.standard} className="border p-2 text-xl border-black font-bold text-black focus:outline-blue-600  md:text-lg max-w-full h-10 rounded-lg hover:border-blue-500 shadow-xl" onChange={(e) => { update ? setRoll({ ...roll, standard: e.target.value }) : setUser({ ...user, standard: e.target.value }), setError({ ...error, standard: "" }) }} />
                                {
                                    error.standard && <span className="text-red-500">{error.standard}</span>
                                }
                                <button className="bg-blue-500 mt-2 text-white p-2 max-w-full rounded-lg cursor-pointer" type="Submit">{update ? "update" : "Submit"}</button>
                            </form>
                        </div>
                    </div>
                }
                {
                    Delete &&
                    <div className="flex justify-center  items-center inset-0 absolute bg-black/50">
                        <div className="bg-white  p-6 relative mb-30 rounded-lg text-white">
                            <h1 className="text-black">If You Want To Delete The Standard? </h1>
                            <div className="text-center">
                                <button onClick={() => setDelete(false)} className="bg-blue-700 cursor-pointer p-2 m-3 rounded-lg">Close</button>
                                <button className="bg-red-700 p-2 m-3 rounded-lg cursor-pointer" onClick={Deletes}>Delete</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </>
    )
}
export default Standard