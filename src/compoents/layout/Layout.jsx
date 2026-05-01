import Sidebar from "./sidebar/Sidebar";
import Container from "./container/Container";
import { useState } from "react";
import AdminLayoutHeader from "./adminLayoutHeader/AdminLayoutHeader";

const Layout = () => {
    const [activePage, setActivePage] = useState("dashboard");
    return (
        <div className="m-0 p-0 h-screen flex flex-col">
            <div className="h-20 shadow-lg bg-white w-full fixed z-50">
                <AdminLayoutHeader setActivePage={setActivePage}/>
            </div>
            <div className="md:flex hidden md: mt-20 relative max-w-full">
                <div className="shadow-2xl md:fixed h-full">
                    <Sidebar setActivePage={setActivePage} />
                </div>

                <div className="flex-1 w-full overflow-auto ml-64">
                    <Container activePage={activePage} />
                </div>
            </div>
            <div className="md:hidden mt-20 relative max-w-full">
                <div className="flex-1 w-full overflow-auto">
                    <Container activePage={activePage} />
                </div>
            </div>
            <div className="border fixed max-h-fit">
                {/* <Footer/> */}
            </div>
        </div>
    );
};

export default Layout;
