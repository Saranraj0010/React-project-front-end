import axios from "axios"
import { Axios } from "axios"
import { useState } from "react"
import Api from "./Api";
const API = import.meta.env.VITE_API;

export const DataFitch = () => {

    const [issave, setSave] = useState("")
    const handlechange = (e) => {
        setSave(e.target.value)
    }
    // console.log(issave)

    const AddForm = async () => {
        try {
            await axios.post(`${API}v1/AddFrom`, issave)
        }
        catch (err) {
            console.log(err)
        }
    }

    // const showdata = () => {
    //     console.log(issave)
    // }

    return (
        <>
            <form action="">
                <label htmlFor="">id</label>
                <input type="text" onChange={handlechange} />
                <label htmlFor="">Name</label>
                <input type="text" onChange={handlechange} />
                <label htmlFor="">Age</label>
                <input type="text" onChange={handlechange} />
            </form>
            <button onClick={AddForm}>show</button>



        </>
    )
}