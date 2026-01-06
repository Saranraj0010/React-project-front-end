import { useState } from "react";

export const Promis = () => {
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
        .then((show) => {
            console.log("correct", show)
            setData(show)

        })
        .catch((error) => {
            setData(error)
            console.log("error", error)
        })
    // console.log(data)


    // return (
    //     <>
    //         <p>{data}</p>
    //     </>
    // )
}