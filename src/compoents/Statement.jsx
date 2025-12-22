import { useState } from "react"
import { LiaRupeeSignSolid } from "react-icons/lia";
import InputBox from "../elaments/InputBox";
import { FaPlus } from "react-icons/fa6";

const Statement = () => {

    const [show, setShow] = useState(false)
    const [interest, setInterest] = useState("")
    const [amount, setAmount] = useState("")
    const [totalAmount, setTotalAmount] = useState("")
    const [salary, setSalary] = useState("")
    const [Salary, setsalary] = useState("")
    const [persantage1, setPersantage1] = useState("")
    const [persantage2, setPersantage2] = useState("")
    const [persantage3, setPersantage3] = useState("")
    const [persantage4, setPersantage4] = useState("")
    const [persantage5, setPersantage5] = useState("")
    const [monthlyExpenses, setMonthlyExpenses] = useState("")
    const [familyExpenses, setFamilyExpenses] = useState("")
    const [groceryExpenses, setGroceryExpenses] = useState("")
    const [savings, setSavings] = useState("")
    const [balance, setBalance] = useState("")


    // console.log(salary)
    const Calculate = () => {
        setsalary(salary)

        setMonthlyExpenses(
            salary * persantage1 / 100
        )
        setFamilyExpenses(
            salary * persantage2 / 100
        )
        setGroceryExpenses(
            salary * persantage3 / 100
        )
        setSavings(
            salary * persantage4 / 100
        )
        setShow(true)


        // setBalance(
        //     salary - (monthlyExpenses + familyExpenses + groceryExpenses + savings)
        // )
        // setAmount(balance * 12)

        // setInterest(
        //     (balance * 12) * persantage5 / 100
        // )
        //  setTotalAmount(
        //     interest + amount
        // )
    }
    const Balance = () => {
        setBalance(
            salary - (monthlyExpenses + familyExpenses + groceryExpenses + savings)
        )
        setAmount(balance * 12)
    }
    const Interest = () => {

        setInterest(
            (balance * 12) * persantage5 / 100
        )
        // console.log(totalAmount)
    }
    const Add =()=>{
         setTotalAmount(
            interest + amount
        )
    }

    return (
    

        <>
            <div className="bg-black/20 flex items-center justify-center gap-20 font-serif h-full ">

                <div className="grid grid-cols-1 gap-6 bg-white h-full mt-2 w-fit p-5 rounded-2xl ">
                    <div className="flex items-center flex-col gap-2">
                        <label className="">Monthly Salary:</label>
                        <input placeholder="Enter Salary " className=" text-center border-2  w-60 h-10 border-gray-400  rounded-lg hover:border-blue-600 " onChange={(e) => setSalary(e.target.value)} />
                    </div>
                    <div className="flex items-center  flex-col gap-2">
                        <label>Monthly Expenses Persantage:</label>
                        <input placeholder="Enter Monthly Expenses %" className=" text-center border-2 w-60 h-10 border-gray-400  rounded-lg hover:border-blue-600" onChange={(e) => setPersantage1(e.target.value)} />
                    </div>
                    <div className="flex items-center  flex-col gap-2">
                        <label>Monthly Family Expenses Persantage:</label>
                        <input placeholder="Enter Family Expenses %" className=" text-center border-2 w-60 h-10 border-gray-400  rounded-lg hover:border-blue-600" onChange={(e) => setPersantage2(e.target.value)} />
                    </div>
                    <div className="flex items-center  flex-col gap-2">
                        <label>Monthly Grocery Expenses Persantage:</label>
                        <input placeholder="Enter Grocery Expenses %" className=" text-center border-2 w-60 h-10 border-gray-400  rounded-lg hover:border-blue-600" onChange={(e) => setPersantage3(e.target.value)} />
                    </div>
                    <div className="flex items-center  flex-col gap-2">
                        <label>Monthly Savings Persantage:</label>
                        <input placeholder="Enter Saving %" className=" text-center border-2 w-60 h-10 border-gray-400  rounded-lg hover:border-blue-600" onChange={(e) => setPersantage4(e.target.value)} />
                    </div>

                    <div className="flex flex-col items-center gap-3 text-center ">
                    <label>Yearly Interest Persantage:</label>
                    <input placeholder="Enter Interest %" className=" text-center border-2 w-60 h-10 border-gray-400  rounded-lg hover:border-blue-600" onChange={(e) => setPersantage5(e.target.value)} />
                    
                    <div className="flex items-center  flex-col gap-2">
                        <button onClick={() => Calculate()} className="text-white rounded-xl p-2 bg-red-600 cursor-pointer w-fit hover:bg-red-800">Check</button>
                    </div>
                    <div className="text-center">
                        <button className="text-white m-1 rounded-xl p-2 bg-red-600 cursor-pointer w-fit  hover:bg-red-800" onClick={() => Interest()}>Total Profite</button>
                    </div>
                    <span>Interest Amount:{interest}</span>
                    <button className="text-white m-1 rounded-xl p-2 bg-red-600 cursor-pointer w-fit  hover:bg-red-800 flex items-center gap-1"  onClick={()=>Add()}><FaPlus />Balance</button>
                    <span>Total Balance Amount:{totalAmount}</span>
                </div>
                </div>
                
                <div>
                </div>
                {
                    show && (
                        <div className="fixed inset-0 bg-black/50 cursor-context-menu flex justify-center items-center">
                            <div className="grid grid-cols-1 gap-6 bg-white h-fit mt-7 w-fit p-5 rounded-2xl ">
                                <p className="text-center font-bold font-mono text-2xl underline ">Calculation Data</p>
                                <h1 className="flex">Monthly Salary:<span>{Salary}</span><LiaRupeeSignSolid className="text-2xl" /></h1>
                                <h1 className="flex">Monthly Expenses Persantage:<span>{monthlyExpenses}</span><LiaRupeeSignSolid className="text-2xl" /></h1>
                                <h1 className="flex">Monthly Family Expenses Persantage:<span>{familyExpenses}</span><LiaRupeeSignSolid className="text-2xl" /></h1>
                                <h1 className="flex">Mothly Grocery Expenses Persantage:<span>{groceryExpenses}</span><LiaRupeeSignSolid className="text-2xl" /></h1>
                                <h1 className="flex">Monthly Savings Persantage:<span>{savings}</span><LiaRupeeSignSolid className="text-2xl" /></h1>
                                <span className="flex">Account Balance:{balance}<LiaRupeeSignSolid className="text-2xl" /></span>
                                {/* <span className="flex">Account Intreset:{interest}<LiaRupeeSignSolid className="text-2xl" /></span> */}
                                
                                <div className="text-center">
                                    <button className="text-white m-1 rounded-xl p-2 bg-red-600 cursor-pointer w-fit  hover:bg-red-800" onClick={() => Balance()}>Check Balance</button>
                                    <button className="text-white m-1 rounded-xl p-2 bg-red-600 cursor-pointer w-fit  hover:bg-red-800" onClick={() => setShow(false)}>Close</button>
                                </div>
                            </div>
                        </div>
                    )
                }




            </div>


        </>
    )
}
export default Statement                