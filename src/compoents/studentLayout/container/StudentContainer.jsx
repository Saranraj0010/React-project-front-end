import Dashboard from "../../layout/dashboard/Dashboard"
const StudentContainer = ({ activePage }) => {
    return (
        <>
            <div className="w-full max-h-full">
                {activePage === "dashboard" && <Dashboard />}
            </div>
        </>
    )
}
export default StudentContainer