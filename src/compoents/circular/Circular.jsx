import ButtonHeader from "../commenHeader/ButtonHeader"
import logo from "../../assets/profile4.jpg"
import close from "../../assets/close.png"
import { useState } from "react"
import Input from "../../Elaments/Input"
import Button from "../../Elaments/Button"
import LabelName from "../../Elaments/LabelName"
const Circular = () => {
    const[showCircular,setShowCircular]=useState(false)
    return (
        <>
            <div className="">
                <ButtonHeader title={"Circular"} logo={logo} button={"Add Circular"} onclick={() => {setShowCircular(true)}} />
                    <div className="">

                    </div>
                    {
                        showCircular && (
                            <div className="">
                                <img src={close} className="bg-red-500" onClick={()=>{setShowCircular(false)}} />
                                <h1>Create Circular</h1>
                                <LabelName>UserName</LabelName>
                                    <Input type="text" />
                                    <Button>button</Button>
                            </div>
                        )
                    }
            </div>
        </>
    )
}
export default Circular