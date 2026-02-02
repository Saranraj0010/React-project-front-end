import { useState } from "react";
import { useStudentStore } from "./compoents/student/store/useStudentStore";
import Layout from "./compoents/layout/Layout";
import Login from "./compoents/layout/login/Login";
import SignUp from "./compoents/layout/signup/SignUp";
import StudentView from "./compoents/student/studentserach/Studentview";
import StudentForm from "./compoents/student/StudentForm";
  

const App = () =>{
    // const [studentProfile, setStudentProfile] = useState({});
    // const{studentProfile}=useStudentStore();
  return(
    <>
    <Layout/>
    {/* <Login/> */}
    {/* <SignUp/> */}
    </>
  )
}
export default App;