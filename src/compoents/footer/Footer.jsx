import { useLoginStore } from "../layout/store/useLoginStore";

export const Footer = () => {
    const { darkMode } = useLoginStore();

    return (
        <footer
            className={`${
                darkMode ? "bg-red-400 text-black" : "bg-gray-900 text-white"
            } w-full py-4 px-6 flex flex-col sm:flex-row items-center justify-between gap-2`}
        >
            {/* Copyright */}
            <p className="text-sm text-center sm:text-left">
                © 2026 School Management System
            </p>

            {/* Links */}
            <div className="flex gap-4 sm:gap-6 text-sm">
                <span className="hover:text-blue-400 cursor-pointer">
                    Privacy Policy
                </span>
                <span className="hover:text-blue-400 cursor-pointer">
                    Terms
                </span>
                <span className="hover:text-blue-400 cursor-pointer">
                    Contact
                </span>
            </div>
        </footer>
    );
};