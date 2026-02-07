import { useState } from "react"
import { useEffect } from "react"

// import Api from "./Api"
const Api = () => {
  const [data, setData] = useState([])

  const Display = () => {
    //  useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(hi=> hi.json())
      .then((show) => console.log(show))
      .catch(()=>console.log("error"))
      .finally((err)=>console.log("function over"))
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(hello => hello.json())
      // .then((jsons) => console.log(jsons))
    .then((json) => setData(json))
    .catch(() => console.log("error"))
    // },[data])


  }
  return (
    <>
      {
        data.map((item) => (
          <>
            <div className="flex" key={item.id}>
              <p >{item.id}</p>
              <p >{item.title}</p>
              <p >{item.completed}</p>
              <p >{item.userId}</p>
            </div>

          </>
        ))
      }
      <button onClick={Display}>show</button>
    </>
  )
}
export default Api 