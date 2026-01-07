import StudentRegisterForm from "./compoents/StudentRegisterForm";
import StudentView from "./compoents/Studentview";
import Statement from "./compoents/Statement";
import { useState } from "react";
import Api from "./compoents/Api";
import {Promises} from "./compoents/Promises";
import { Promis } from "./compoents/promis";
import { useStudentStore } from "./compoents/useStudentStore";


const App = () =>{
    // const [studentProfile, setStudentProfile] = useState({});
    const{studentProfile}=useStudentStore();






  return(
    <>
    {/* <StudentView /> */}
    {/* <StudentRegisterForm /> */}
    {/* <Statement/> */}
    <Api/>
    {/* <Promises/> */}
    {/* <Promis/> */}
    </>
  )
}
export default App;