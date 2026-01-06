import { useState } from "react"
import { useEffect } from "react"

// import Api from "./Api"
const Api = () => {
    const [data,setData]=useState([])
    useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(response => response.json())
      .then(json => setData(json))
    },[data])
    const Display = () =>{
    console.log(data)
    }
    return(
        <>
        {
          data.map((items)=>(
            <>
            <p key={items}>{items.id} {items.title} {items.completed} {items.userId}</p>
            </>
          ))
        }
        <button onClick={Display}>show</button>
        </>
    )
}
export default Api 