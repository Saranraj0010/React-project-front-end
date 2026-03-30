import Dashboard from "../dashboard/Dashboard"
import StudentDetails from "../../layout/student/studentDetails/StudentDetails"
import Staff from "../staff/Staff"
import TotalStaff from "../../layout/staff/TotalStaff"
import StudentAdmission from "../../layout/student/StudentAdmission"
import Standard from "../standard/Standard"
import AdmissionDetails from "../../layout/student/admissionDetails/AdmissionDetails"
import Role from "../../layout/role/Role"
import Circular from "../../layout/circular/Circular"
import Section from "../../layout/section/Section"
import Calendar from "../../layout/calendar/Calendar"
import StaffAllocation from "../../layout/staffAllocation/StaffAllocation"
import Subject from "../../layout/subject/Subject"
import Fees from "../../layout/fees/Fees"
import Payment from "../../layout/fees/Fees"
import AddAdmin from "../addAdmin/AddAdmin"
const Container = ({ activePage }) => {
    return (
        <>
            <div className="w-full max-h-full select-none bg-white shadow-2xl p-5">
                {activePage === "dashboard" && <Dashboard />}
                {activePage==="staffAllocation" && <StaffAllocation/>}
                {activePage==="circular" && <Circular/>}
                {activePage === "studentDetails" && <StudentDetails />}
                {activePage ==="staff" && <Staff/>}
                {activePage==="staffDetails" && <TotalStaff/>}
                {activePage==="studentAdmission" && <StudentAdmission/>}
                {activePage==="admissionDetails" && <AdmissionDetails/>}
                {activePage==="fees" && <Fees/>}
                {activePage==="payment" && <Payment/>}
                {activePage==="standard" && <Standard/>}
                {activePage==="role" && <Role/>}
                {activePage==="section" && <Section/>}
                {activePage==="calendar" && <Calendar/>}
                {activePage==="subject" && <Subject/>}
                {activePage==="addAdmin" && <AddAdmin/>}

            </div>
        </>
    )
}
export default Container