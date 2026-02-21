import Sidebar from "./sidebar/Sidebar";
import Container from "./container/Container";
import { useState } from "react";
import { Footer } from "./footer/Footer";
import AdminLayoutHeader from "./adminLayoutHeader/AdminLayoutHeader";

const Layout = () => {
    const [activePage, setActivePage] = useState("dashboard");
    return (
        <div className="m-0 p-0 h-screen flex flex-col">
            {/* Header */}
            <div className="h-20 shadow-lg bg-white w-full fixed z-50">
                <AdminLayoutHeader/>
            </div>

            {/* Body */}
            <div className="flex flex-1 mt-21 relative max-w-full">
                <div className="shadow-2xl fixed h-full">
                    <Sidebar setActivePage={setActivePage} />
                </div>

                <div className="flex-1 overflow-auto ml-64">
                    <Container activePage={activePage} />
                </div>
            </div>

            {/* Footer */}
            <div className="border fixed max-h-fit">
                {/* <Footer/> */}
            </div>
        </div>
    );
};

export default Layout;
