import Logo from "../../assets/homeLogo.png";
import backGround from "../../assets/backGround.jpg";
import { useNavigate } from "react-router-dom";

const HomeContainer = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-[80vh] flex items-center justify-center px-4">

            {/* Background */}
            <img
                src={backGround}
                alt="background"
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-6xl w-full gap-10">

                {/* Text Section */}
                <div className="text-center md:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                        Welcome To School Site 🎓
                    </h1>

                    <button
                        onClick={() => navigate("/admission")}
                        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                    >
                        Apply For Admission
                    </button>
                </div>

                {/* Logo */}
                <div>
                    <img
                        src={Logo}
                        alt="logo"
                        className="w-40 hidden md:block sm:w-52 md:w-64 lg:w-72"
                    />
                </div>

            </div>
        </div>
    );
};

export default HomeContainer;