import { useState } from "react";
import Header from "../layout/header/Header";
import HomeContainer from "../homeContainer/HomeContainer";
import { Footer } from "../footer/Footer";

const Home = () => {
    const [activePage, setActivePage] = useState("dashboard");

    return (
        <div className="min-h-screen flex flex-col">

            {/* Header */}
            <header className="shadow-md">
                <Header />
            </header>

            {/* Main Content */}
            <main className="flex-1">
                <HomeContainer />
            </main>

            {/* Footer */}
            <footer>
                <Footer />
            </footer>

        </div>
    );
};

export default Home;