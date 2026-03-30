import { useState } from "react";
import LayoutHeader from "../layout/layoutHender/LayoutHeader";
import StaffSidebar from "./sidebar/StaffSidebar";
import StaffContainer from "./container/StaffContainer";
// import { Footer } from "../layout/footer/Footer";

const StaffLayout = () => {
    const [activePage, setActivePage] = useState("dashboard");
    return (
        <div className="m-0 p-0 h-screen flex flex-col">
            <div className="h-20 shadow-2xl">
                <LayoutHeader/>
            </div>
            <div className="flex flex-1">
                <div className="shadow-2xl w-64">
                    <StaffSidebar setActivePage={setActivePage} />
                </div>
                <div className="flex-1 overflow-auto">
                    <StaffContainer activePage={activePage} />
                </div>
            </div>
            <div className="border fixed max-h-fit">
                {/* <Footer/> */}
            </div>
        </div>
    );
};

export default StaffLayout;