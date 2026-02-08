import StudentForm from "../../student/StudentForm"
import Form from "../../0pratice/Form"
import Dashboard from "../../layout/dashboard/Dashboard"
import StudentDetails from "../../student/studentDetails/StudentDetails"
import Staff from "../../staff/Staff"
import TotalStaff from "../../staff/TotalStaff"
const StaffContainer = ({ activePage }) => {
    return (
        <>
            <div className="w-full max-h-full">
                {activePage === "dashboard" && <Dashboard />}
                {activePage === "studentDetails" && <StudentDetails />}
            </div>
        </>
    )
}
export default StaffContainer