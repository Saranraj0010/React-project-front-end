import ButtonHeader from "../commenHeader/ButtonHeader";
import logo from "../../assets/profile4.jpg"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API;
const Fees = () => {
    const [show, setShow] = useState(false)
    const [price, setPrice] = useState({
        standard: "",
        fees: "",
    })
    const [standard, setStandard] = useState([])
    const [allocation, setAllocation] = useState([])
    const [filter, setFilter] = useState([])
    const [error, setError] = useState({})
    const Validation = () => {
        let newError = {};
        let Number = /^\+?[1-9]\d{3,6}$/
        if (price.standard.trim() === "") newError.standard = "Standard required";
        const alreadyExists = allocation.some((item) => item.standard === user.standard);
        if (alreadyExists) newError.standard = "Fees is already allocated";
        if (price.fees.trim() === "") newError.fees = "Fees required";
        else if (!Number.test(price.fees))newError.fees = "Invalid Fees Entry";
        // else if (price.fees<=2000)newError.fees="Minimum Amount is '2000'";
        setError(newError);
        return Object.keys(newError).length === 0;
    };
    const GetData = async () => {
        try {
            const standard = await axios.get(`${API}getStandard`)
            // const allocation = await axios.get(`${API}`)
            setStandard(standard.data.data)
            console.log(standard)
            setAllocation(allocation.data.data)
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
            const add = await axios.post(`${API}addFees`, price)
            GetData()
            setShow(false)
            setPrice({
                standard: "",
                fees: ""
            })
        }
        catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className="">
                <ButtonHeader title={"Fees"} button={"Add Fees"} logo={logo} onclick={() => { setShow(true) }} />

                <div className="bg-white rounded-lg flex justify-center items-center shadow-2xl m-5 p-4">
                    <table>
                        <thead className="text-center">
                            <tr>
                                <td className="p-2 border">S.No</td>
                                <td className="p-2 border">Class</td>
                                <td className="p-2 border">Fees</td>
                                <td className="p-2 border">Action</td>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                {
                    show && (
                        <div className="bg-black/60 absolute inset-0">
                            <div className="flex justify-center mt-10">
                                <div className="bg-white flex gap-5 flex-col w-fit rounded-lg p-3 relative left-2">
                                    <div className="relative flex flex-col">
                                        <label>Stanard Allocation</label>
                                        <select name="standard" onChange={(e) => { setPrice({ ...price, standard: e.target.value }), setError({ ...error, standard: "" }) }} className="h-10 border rounded-lg w-60" id="">
                                            <option value="">Select the Stanard</option>
                                            {standard.map((item) => (
                                                <option key={item.id} value={item.standard}>{item.standard}</option>
                                            ))}
                                        </select>
                                        {error.standard && (
                                            <p className="text-red-600 text-[10px] absolute top-17 right-2">{error.standard}</p>
                                        )}</div>
                                    <div className="relative flex flex-col">
                                        <label>Fees Allocation</label>
                                        <input type="text" placeholder="Enter the Fees" name="fees" className="w-60 h-10 border rounded-lg pl-3 mb-4" onChange={(e) => { setPrice({ ...price, fees: e.target.value }), setError({ ...error, fees: "" }) }} />
                                        {error.fees && (
                                            <p className="text-red-600 text-[10px] absolute top-17 right-2">{error.fees}</p>
                                        )}</div>
                                    <div className="text-center">
                                        <button className="bg-red-500 mx-3 rounded-lg p-1 hover:bg-red-800 hover:text-white" onClick={() => {setShow(false),setError({})}}>close</button>
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
export default Fees