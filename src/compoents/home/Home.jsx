import { useState } from "react";
import Header from "../layout/header/Header";
import { useLoginStore } from "../layout/store/useLoginStore";
import { Footer } from "../layout/footer/Footer";
import HomeContainer from "../homeContainer/HomeContainer";

const Home = () => {
    const [activePage, setActivePage] = useState("dashboard");

    return (
        <div className={`m-0 p-0 h-screen flex flex-col`}>
            {/* Header */}
            <div className="h-20 shadow-xl">
                <Header />
            </div>
            {/* Body */}
            <div className="h-full shadow-xl">
                <HomeContainer/>
            </div>
            {/* Footer */}
            <div className="">
                <Footer/>
            </div>
        </div>
    );
};

export default Home;
