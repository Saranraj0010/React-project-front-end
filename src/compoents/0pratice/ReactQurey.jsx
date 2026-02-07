import { useQuery } from "@tanstack/react-query" 
import axios from "axios";
import { useState } from "react";
const API = import.meta.env.VITE_API;
const ReacteQurey = () => {
    const[datas,setDatas]=useState([])
    const Data= async() => {
        const details=await fetch('https://jsonplaceholder.typicode.com/todos')
        // const details=await fetch(`${API}GetFormUser`)
        // const details=await axios.get(`getform?page=${page}`)
        setDatas(details.json())
        console.log(datas,"hello")
        return details.json()
            // .then(
            //     (res) => res.json()
            // );
    }
    const { isLoading, error, data } = useQuery({
        queryKey:['data'],
        queryFn:Data,
    });
    if(isLoading){
        return <h1>Loading.....</h1>
    }
    if(error){
        return <h1>Error{error}</h1>}
    // }if(data){
    console.log(data)
        // return <div className=""><p>{data.id}</p><p>{data.title}</p></div>
    // }
}
export default ReacteQurey