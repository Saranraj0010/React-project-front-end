import { useState } from "react";
import { Footer } from "../footer/Footer";
import CounsllerContainer from "./container/CounsllerContainer";
import CounsllerSidebar from "./sidebar/CounsllerSidebar";
import CounsllerHeader from "../counsllerHeader/CounsllerHeader";

const CounsllerLayout = () => {
    const [activePage, setActivePage] = useState("dashboard");
    return (
        <div className="m-0 p-0 h-screen flex flex-col">
            {/* Header */}
            <div className="h-20 shadow-2xl">
                <CounsllerHeader />
            </div>

            {/* Body */}
            <div className="flex flex-1">
                <div className="shadow-2xl w-64">
                    <CounsllerSidebar setActivePage={setActivePage} />
                </div>

                <div className="flex-1 overflow-auto">
                    <CounsllerContainer activePage={activePage} />
                </div>
            </div>

            {/* Footer */}
            <div className="border fixed max-h-fit">
                {/* <Footer /> */}
            </div>
        </div>
    );
};

export default CounsllerLayout;