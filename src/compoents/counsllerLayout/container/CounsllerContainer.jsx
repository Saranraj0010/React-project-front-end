import Circular from "../../circular/Circular"
import Dashboard from "../../layout/dashboard/Dashboard"
import StudentAdmission from "../../student/StudentAdmission"
import StudentDetails from "../../student/studentDetails/StudentDetails"
import CounsllerLayout from "../CounsllerLayout"
const CounsllerContainer = ({ activePage }) => {
    return (
        <>
            <div className="w-full max-h-full">
                {activePage === "dashboard" && <Dashboard />}
                {activePage==="studentAdmission" && <StudentAdmission/>}
                {activePage === "studentDetails" && <StudentDetails />}
                {activePage === "circular" && <Circular />}
            </div>
        </>
    )
}
export default CounsllerContainer