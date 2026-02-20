import { useState } from "react";
import { useStudentStore } from "./compoents/student/store/useStudentStore";
import Layout from "./compoents/layout/Layout";
import Login from "./compoents/layout/login/Login";
import SignUp from "./compoents/layout/signup/SignUp";
import { Route, Routes } from "react-router-dom";
import Home from "./compoents/home/Home";
import StaffLayout from "./compoents/staffLayout/StaffLayout";
import StudentLayout from "./compoents/studentLayout/StudentLayout";
import StudentAdmission from "./compoents/student/StudentAdmission";
import CounsllerLayout from "./compoents/counsllerLayout/CounsllerLayout";


const App = () => {
  // const [studentProfile, setStudentProfile] = useState({});
  // const{studentProfile}=useStudentStore();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/homePage" element={<Home/>}/>
        <Route path="/homePage/adminlayout" element={<Layout/>}/>
        <Route path="/homePage/stafflayout" element={<StaffLayout/>}/>
        <Route path="/homePage/studentlayout" element={<StudentLayout/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/admission" element={<StudentAdmission/>}/>
        <Route path="/counsllerlayout" element={<CounsllerLayout/>}/>
      </Routes>
    </>
  )
}
export default App;