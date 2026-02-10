import Sidebar from "./sidebar/Sidebar";
import Container from "./container/Container";
import { useState } from "react";
import LayoutHeader from "./layoutHender/LayoutHeader";

const Layout = () => {
    const [activePage, setActivePage] = useState("dashboard");
    return (
        <div className="m-0 p-0 h-screen flex flex-col">
            {/* Header */}
            <div className="h-20 shadow-lg bg-white w-full fixed z-50">
                <LayoutHeader/>
            </div>

            {/* Body */}
            <div className="flex flex-1 mt-20 relative max-w-full">
                <div className="shadow-2xl w-64 fixed h-full">
                    <Sidebar setActivePage={setActivePage} />
                </div>

                <div className="flex-1 overflow-auto ml-65">
                    <Container activePage={activePage} />
                </div>
            </div>

            {/* Footer */}
            <div className="border h-20"></div>
        </div>
    );
};

export default Layout;
