import Circular from "../../circular/Circular"
import ClassStudent from "../../classStudent/ClassStudent"
import Dashboard from "../../dashboard/Dashboard"
import AdmissionDetails from "../../student/admissionDetails/AdmissionDetails"
const StaffContainer = ({ activePage }) => {
    return (
        <>
            <div className="w-full max-h-full p-5">
                {/* {activePage === "dashboard" && <Dashboard />} */}
                {activePage==="circular" && <Circular/>}
                {activePage === "classStudent" && <ClassStudent/>}
            </div>
        </>
    )
}
export default StaffContainer