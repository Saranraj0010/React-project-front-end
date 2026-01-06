import { useState } from "react";

export const Promises = () => {
    const [data, setData] = useState("")
    const Promises = new Promise((correct, reject) => {
            const data = false;
            if (data === true) {
                correct("data correct")
            }
            else {
                reject("error")
            }

    })
    Promises
        .then((error) => {
            // console.log("correct", show)
            setData(error)

        })
        .catch((show) => {
            setData(show)
            // console.log("error", error)
        })
        .finally((full)=>{
            setData(full)
        })
    // console.log(data)


    return (
        <>
            <p>{data}</p>
        </>
    )
}