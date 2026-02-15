import StudentForm from "../../student/StudentForm"
import Form from "../../0pratice/Form"
import Dashboard from "../dashboard/Dashboard"
import StudentDetails from "../../student/studentDetails/StudentDetails"
import Staff from "../../staff/Staff"
import TotalStaff from "../../staff/TotalStaff"
import StudentAdmission from "../../student/StudentAdmission"
import Standard from "../../standard/Standard"
import AdmissionDetails from "../../student/admissionDetails/AdmissionDetails"
import Role from "../../role/Role"
import Circular from "../../circular/Circular"
const Container = ({ activePage }) => {
    return (
        <>
            <div className="w-full max-h-full">
                <div className="max-h-screen bg-white shadow-2xl rounded-2xl cursor-pointer">
                {activePage === "dashboard" && <Dashboard />}
                </div>
                {activePage==="circular" && <Circular/>}
                {activePage === "student" && <StudentForm />}
                {activePage === "studentDetails" && <StudentDetails />}
                {activePage ==="staff" && <Staff/>}
                {activePage==="staffDetails" && <TotalStaff/>}
                {activePage==="studentAdmission" && <StudentAdmission/>}
                {activePage==="admissionDetails" && <AdmissionDetails/>}
                {activePage==="standard" && <Standard/>}
                {activePage==="role" && <Role/>}
            </div>
        </>
    )
}
export default Container