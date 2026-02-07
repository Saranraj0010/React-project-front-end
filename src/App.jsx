import { useState } from "react";
import { useStudentStore } from "./compoents/student/store/useStudentStore";
import Layout from "./compoents/layout/Layout";
import Login from "./compoents/layout/login/Login";
import SignUp from "./compoents/layout/signup/SignUp";
import { Route, Routes } from "react-router-dom";
import Home from "./compoents/home/Home";


const App = () => {
  // const [studentProfile, setStudentProfile] = useState({});
  // const{studentProfile}=useStudentStore();
  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/homePage" element={<Home/>}/>
        <Route path="/layout" element={<Layout/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </>
  )
}
export default App;