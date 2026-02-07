import Sidebar from "./sidebar/Sidebar";
import Container from "./container/Container";
import { useState } from "react";
import LayoutHeader from "./layoutHender/LayoutHeader";

const Layout = () => {
    const [activePage, setActivePage] = useState("dashboard");
    return (
        <div className="m-0 p-0 h-screen flex flex-col">
            {/* Header */}
            <div className="h-20 shadow-2xl">
                <LayoutHeader/>
            </div>

            {/* Body */}
            <div className="flex flex-1">
                <div className="shadow-2xl w-64">
                    <Sidebar setActivePage={setActivePage} />
                </div>

                <div className="flex-1 overflow-auto">
                    <Container activePage={activePage} />
                </div>
            </div>

            {/* Footer */}
            <div className="border h-20"></div>
        </div>
    );
};

export default Layout;
