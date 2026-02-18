import Circular from "../../circular/Circular"
import Dashboard from "../../layout/dashboard/Dashboard"
import StudentDetails from "../../student/studentDetails/StudentDetails"
const StaffContainer = ({ activePage }) => {
    return (
        <>
            <div className="w-full max-h-full">
                {activePage === "dashboard" && <Dashboard />}
                {activePage === "studentDetails" && <StudentDetails />}
                {activePage==="circular" && <Circular/>}
            </div>
        </>
    )
}
export default StaffContainer