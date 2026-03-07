import Circular from "../../circular/Circular"
import ClassStudent from "../../classStudent/ClassStudent"
import Dashboard from "../../dashboard/Dashboard"
import AdmissionDetails from "../../student/admissionDetails/AdmissionDetails"
import StudentAdmission from "../../student/StudentAdmission"
import StudentDetails from "../../student/studentDetails/StudentDetails"
import CounsllerLayout from "../CounsllerLayout"
const CounsllerContainer = ({ activePage }) => {
    return (
        <>
            <div className="w-full max-h-full">
                {activePage === "dashboard" && <Dashboard />}
                {activePage==="studentAdmission" && <StudentAdmission/>}
                {activePage === "studentDetails" && <AdmissionDetails />}
                {activePage === "circular" && <Circular />}
                {activePage === "classStudent" && <ClassStudent/>}
            </div>
        </>
    )
}
export default CounsllerContainer