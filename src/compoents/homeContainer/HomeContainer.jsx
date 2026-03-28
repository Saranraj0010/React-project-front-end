import Logo from "../../assets/homeLogo.png";
import backGround from "../../assets/backGround.jpg";
import { useNavigate } from "react-router-dom";

const HomeContainer = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden">

            {/* Background Image */}
            <img
                src={backGround}
                alt="background"
                className="absolute inset-0 w-full h-full object-cover scale-105"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl w-full px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12">

                {/* Text Section */}
                <div className="text-center md:text-left text-white space-y-6 animate-fadeInUp">

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                        Build Your Future <br />
                        <span className="text-blue-400">With Our School</span>
                    </h1>

                    <p className="text-gray-200 max-w-md">
                        A place where learning meets excellence. Join us to grow,
                        explore, and achieve your dreams.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button
                            onClick={() => navigate("/admission")}
                            className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 px-6 py-3 rounded-xl text-lg font-semibold shadow-lg hover:scale-105"
                        >
                            Apply Now 🚀
                        </button>

                        <button
                            className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition-all duration-300"
                        >
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Logo Section */}
                <div className="flex justify-center items-center animate-float">
                    <img
                        src={Logo}
                        alt="logo"
                        className="w-52 sm:w-64 md:w-72 drop-shadow-2xl"
                    />
                </div>

            </div>
        </div>
    );
};

export default HomeContainer;