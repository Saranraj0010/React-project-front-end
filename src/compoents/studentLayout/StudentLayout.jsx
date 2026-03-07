import { useState } from "react";
import StudentSidebar from "./sidebar/StudentSidebar";
import StudentContainer from "./container/StudentContainer";
import StudentHeader from "./studentHeader/StudentHeader";
import { Footer } from "../footer/Footer";

const StudentLayout = () => {
    const [activePage, setActivePage] = useState("dashboard");
    return (
        <div className="m-0 p-0 h-screen flex flex-col">
            {/* Header */}
            <div className="h-20 shadow-2xl">
                <StudentHeader/>
            </div>

            {/* Body */}
            <div className="flex flex-1">
                <div className="shadow-2xl w-64">
                    <StudentSidebar setActivePage={setActivePage} />
                </div>

                <div className="flex-1 overflow-auto">
                    <StudentContainer activePage={activePage} />
                </div>
            </div>

            {/* Footer */}
            <div className="border fixed max-h-fit">
                <Footer/>
            </div>
        </div>
    );
};

export default StudentLayout;