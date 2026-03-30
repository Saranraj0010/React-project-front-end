import Circular from "../../layout/circular/Circular"
import ClassStudent from "../../staffLayout/classStudent/ClassStudent"
import Dashboard from "../../layout/dashboard/Dashboard"
import AdmissionDetails from "../../layout/student/admissionDetails/AdmissionDetails"
import StudentAdmission from "../../layout/student/StudentAdmission"
const CounsllerContainer = ({ activePage }) => {
    return (
        <>
            <div className="w-full max-h-full p-5 ">
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