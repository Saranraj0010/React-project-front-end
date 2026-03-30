import Circular from "../../layout/circular/Circular"
import ClassStudent from "../../staffLayout/classStudent/ClassStudent"
import Dashboard from "../../layout/dashboard/Dashboard"
const StaffContainer = ({ activePage }) => {
    return (
        <>
            <div className="w-full max-h-full p-5">
                {activePage === "dashboard" && <Dashboard />}
                {activePage==="circular" && <Circular/>}
                {activePage === "classStudent" && <ClassStudent/>}
            </div>
        </>
    )
}
export default StaffContainer