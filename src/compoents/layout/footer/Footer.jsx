import { useLoginStore } from "../store/useLoginStore"

export const Footer = () => {
    const { darkMode } = useLoginStore()
    return (
        <div className={`${darkMode?"bg-red-400 text-black":"text-white  bg-gray-900 "} font-medium h-16 fixed w-screen bottom-0 z-50 x flex items-center justify-between px-6`}>
            <p className="text-sm">
                © 2026 School Management System
            </p>

            <div className="flex gap-6 text-sm">
                <span className="hover:text-blue-400 cursor-pointer">Privacy Policy</span>
                <span className="hover:text-blue-400 cursor-pointer">Terms</span>
                <span className="hover:text-blue-400 cursor-pointer">Contact</span>
            </div>
        </div>
    )
}