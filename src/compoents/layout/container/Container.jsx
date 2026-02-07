import StudentForm from "../../student/StudentForm"
import Form from "../../0pratice/Form"
import Dashboard from "../dashboard/Dashboard"
import StudentDetails from "../../student/studentDetails/StudentDetails"
import Staff from "../../staff/Staff"
import TotalStaff from "../../staff/TotalStaff"
const Container = ({ activePage }) => {
    return (
        <>
            <div className="w-full max-h-full">
                {activePage === "dashboard" && <Dashboard />}
                {activePage === "student" && <StudentForm />}
                {activePage === "studentDetails" && <StudentDetails />}
                {activePage ==="staff" && <Staff/>}
                {activePage==="staffDetails"&&<TotalStaff/>}
            </div>
        </>
    )
}
export default Container