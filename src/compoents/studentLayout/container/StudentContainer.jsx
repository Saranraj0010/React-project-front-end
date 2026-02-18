import Circular from "../../circular/Circular"
import Dashboard from "../../layout/dashboard/Dashboard"
const StudentContainer = ({ activePage }) => {
    return (
        <>
            <div className="w-full max-h-full">
                {activePage === "dashboard" && <Dashboard />}
                {activePage==="circular" && <Circular/>}
            </div>
        </>
    )
}
export default StudentContainer