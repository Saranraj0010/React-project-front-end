import { useState } from "react";

export const Promises = () => {
    const [data, setData] = useState("")
    const Promises = new Promise((correct, reject) => {
            const data = true;
            if (data === true) {
                correct("Data Recieve ")
            }
            else {
                reject("error")
            }

    })
    // const NextPromises = new Promise((correct, reject) => {
    //         const value = false;
    //         if (value === true) {
    //             correct(" Next Data Recieve ")
    //         }
    //         else {
    //             reject(" Next error ")
    //         }

    // })
    // Promise.all([Promises,NextPromises])
    
    Promises
    // .then(hi=>hi.json())
        .then((show) => {
            setData(show)
            console.log("corrects", show)
            // NextPromises
            // .then((nextShow)=>{
            //     setData(nextShow+"Next Show")
            //     // console.log(data)
            // })
            // .catch((nextError)=>{
            //     setData(nextError+"Next Error")
            // })
            // .finally(()=>{
            //     console.log("next End")
            // })
        })
        //  .then((shows) => {
        //     console.log("correctss", shows)
        //     // setData(show)

        // })
        //  .then((showw) => {
        //     console.log("correctsss", showw)
        //     // setData(show)

        // })
        .catch((error) => {
            setData(error)
            // console.log("error", error)
        })
         .finally(()=>{
            console.log( "Function end" )
        })
        // .finally((full)=>{
        //     setData(full)
        // })
    // console.log(data)


    return (
        <>
            <p>{data}</p>
        </>
    )
}