import { useState } from "react";
import Header from "../layout/header/Header";
import HomeContainer from "../home/homeContainer/HomeContainer";

const Home = () => {
    const [activePage, setActivePage] = useState("dashboard");

    return (
        <div className="min-h-screen flex flex-col">
            <header className="shadow-md">
                <Header />
            </header>
            <main className="flex-1">
                <HomeContainer />
            </main>
            {/* <footer>
                <Footer />
            </footer> */}
        </div>
    );
};

export default Home;