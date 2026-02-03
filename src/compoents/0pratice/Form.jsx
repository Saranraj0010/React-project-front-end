import axios from "axios";
import { useEffect } from "react";
import { useState } from "react"
// import Api from "./Api";

const API = import.meta.env.VITE_API;

export const Form = () => {
    const [data, setData] = useState([])
    const [show, setShow] = useState(false)
    const[deleteShow,setDeleteShow]=useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const [user, setUser] = useState({ id: "", name: "", address: "", email: "" });
    const AddFrom = async () => {
        try {
            setIsEdit(false)
            const post = await axios.post(`${API}AddUser`, user)
            console.log(post, "data added succesfuly")
        getFrom()
        }
        catch (err) {
            console.log(err)
        }
    };

    const getFrom = async () => {
        try {
            const responce = await axios.get(`${API}GetFormUser`)
            console.log(responce, "data fetch succesfuly")
            let data = responce.data.data
            setData(data)
        }
        catch (err) {
            console.log(err)
        }
    };
    useEffect(() => {
        getFrom();  
    }, [])

    const Show = () => {
        setShow(!show)
        setIsEdit(false)
    }

    const IsEdit = (id) => {
        console.log(id, "hello")
        const selected = data.find((items) => (items.id == id))
        console.log(selected)
        if (selected) {
            setShow(true)
            setIsEdit(true)
            setUser({
                id: selected.id,
                name: selected.name,
                address: selected.address,
                email: selected.email
            }
            )
            getFrom()
        }
    }

    const UpdateForm = async () => {
        try {
            console.log("hellooooo")
            setIsEdit(true)
            const responce = await axios.patch(`${API}UpdateFormUser`,user)
            console.log("data updated", responce)
            getFrom()
        }
        catch (err) {
            if (err) {
                console.log(err.message)
                return console.log('code error', err)
            }
        }
    }

    const DeleteForm = async (id) => {
        try {
            // const selected = data.filter((items) => (items.id == id))
            // console.log(selected)
            console.log(id)
            const responce = await axios.patch(`${API}DeleteFormUser`, { id: id })
            console.log("data Deleted", responce)
        getFrom()
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            {show && (
                <div>
                    <div className="flex flex-col gap-2">
                        <label>User Id:</label>
                        <input className="border-2 w-50" name="id" value={user.id} onChange={(e) => { setUser({ ...user, id: e.target.value }) }} placeholder="id" />
                        <label>UserName:</label>
                        <input className="border-2 w-50" name="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} placeholder="Name" />
                        <label>User Address:</label>
                        <input className="border-2 w-50" name="address" value={user.address} onChange={(e) => setUser({ ...user, address: e.target.value })} placeholder="Address" />
                        <label>User Email:</label>
                        <input className="border-2 w-50" name="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} placeholder="E-mail" />
                        <button onClick={() => isEdit ? UpdateForm() : AddFrom()}>{isEdit ? "Update" : "Add"}</button>
                    </div>
                </div>
            )
            }
            <button onClick={Show}>show</button>
            <table>
                <thead className="border-2">
                    <tr>
                        <td>Data</td>
                    </tr>
                </thead>
                <tbody className="border-2 ">
                    {data && data.map((items) => (
                        <tr key={items.id}>
                            <td className="border p-1">{items.id}</td>
                            <td className="border p-1">{items.name}</td>
                            <td className="border p-1">{items.address}</td>
                            <td className="border p-1">{items.email}</td>
                            <td className="border p-1"  ><button onClick={() => IsEdit(items.id)}> Update</button></td>
                            <td className="border p-1"  ><button onClick={() => DeleteForm(items.id)}> Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}