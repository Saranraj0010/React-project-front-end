import Dashboard from "../dashboard/Dashboard"
import StudentDetails from "../student/studentDetails/StudentDetails"
import Staff from "../staff/Staff"
import TotalStaff from "../staff/TotalStaff"
import StudentAdmission from "../student/StudentAdmission"
import Standard from "../standard/Standard"
import AdmissionDetails from "../student/admissionDetails/AdmissionDetails"
import Role from "../role/Role"
import Circular from "../circular/Circular"
import Section from "../section/Section"
import Calendar from "../calendar/Calendar"
import StaffAllocation from "../staffAllocation/StaffAllocation"
import Subject from "../subject/Subject"
import Fees from "../fees/Fees"
import Payment from "../payment/Payment"
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