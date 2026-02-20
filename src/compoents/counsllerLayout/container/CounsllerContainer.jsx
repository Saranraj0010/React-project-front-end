import Circular from "../../circular/Circular"
import Dashboard from "../../layout/dashboard/Dashboard"
import StudentDetails from "../../student/studentDetails/StudentDetails"
import CounsllerLayout from "../CounsllerLayout"
const CounsllerContainer = ({ activePage }) => {
    return (
        <>
            <div className="w-full max-h-full">
                {activePage === "dashboard" && <Dashboard />}
                {activePage === "addStudent" && <CounsllerLayout />}
                {activePage === "studentDetails" && <StudentDetails />}
                {activePage === "circular" && <Circular />}
            </div>
        </>
    )
}
export default CounsllerContainer