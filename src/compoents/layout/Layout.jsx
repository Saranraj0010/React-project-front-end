import Sidebar from "./sidebar/Sidebar";
import Container from "./container/Container";
import { useState } from "react";
import AdminLayoutHeader from "./adminLayoutHeader/AdminLayoutHeader";

const Layout = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col bg-gray-50">

      {/* HEADER */}
      <div className="h-20 shadow-lg bg-white w-full fixed top-0 z-50">
        <AdminLayoutHeader 
          setActivePage={setActivePage}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
      </div>

      {/* DESKTOP LAYOUT */}
      <div className="hidden md:flex mt-20 h-[calc(100vh-80px)]">

        {/* SIDEBAR */}
        <div className="w-64 fixed top-20 left-0 h-[calc(100vh-80px)] shadow-xl bg-white">
          <Sidebar setActivePage={setActivePage} />
        </div>

        {/* CONTENT */}
        <div className="ml-64 flex-1 overflow-y-auto p-4">
          <Container activePage={activePage} />
        </div>
      </div>

      {/* MOBILE LAYOUT */}
      <div className="md:hidden mt-20 h-[calc(100vh-80px)]">

        {/* MOBILE SIDEBAR (SLIDE) */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="w-64 bg-white shadow-xl h-full">
              <Sidebar setActivePage={setActivePage} />
            </div>

            {/* BACKDROP */}
            <div
              className="flex-1 bg-black/40"
              onClick={() => setSidebarOpen(false)}
            />
          </div>
        )}

        {/* CONTENT */}
        <div className="h-full overflow-y-auto p-3">
          <Container activePage={activePage} />
        </div>
      </div>
    </div>
  );
};

export default Layout;