import { create } from "zustand";
import SignUp from "../signup/SignUp";
import hide from "../../../assets/hide.png"
import show from "../../../assets/show.png"
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API = import.meta.env.VITE_API;

export const useLoginStore = create((set, get) => ({
    user: {
        UserId: "",
        Password: ""
    },
    signUpUser: {
        UserName: "",
        PhoneNumber: "",
        Password: "",
        ConfirmPassword: ""
    },
    profileData:[],
    eyeShow: show,
    eyeHide: hide,
    showPassword: false,
    showConfirmPassword: false,
    darkMode:false,
    setDarkMode:(value)=>{
        set((item)=>({darkMode:value}))
    },
    setShowPassword: (value) => {
        set((item) => ({ showPassword: value }))
    },
    setProfileData: (value) => {
        const{profile}=get();
        set((item) => ({ ...profile,profile: value }))
    },
    setConfirmShowPassword: (value) => {
        set((item) => ({ showConfirmPassword: value }))
    },
    ShowPassword: () => {
        const { showPassword, setShowPassword } = get();
        setShowPassword(!showPassword)
    },
    ConfirmShowPassword: () => {
        const { showConfirmPassword, setConfirmShowPassword } = get();
        setConfirmShowPassword(!showConfirmPassword)
    },
    setUser: (field, value) => {
        set((state) => ({
            user: {
                ...state.user,
                [field]: value
            }
        }))
    },
    setSignUpUser: (field, value) => {
        set((state) => ({
            signUpUser: {
                ...state.signUpUser,
                [field]: value
            }
        }))
    },
    Get: async () => {
        try {
            const get = await axios.get(`${API}getSignUp`)
            console.log(get)
        }
        catch (err) {
            console.log(err)
        }
    },
    Validation: (field,) => {
        const { signUpUser } = get();
        let newerror = {};
        if (signUpUser.field.trim() === "") newerror.field = "enter the name"
        console.log("hello")
    },
    Login: (e) => {
        e.preventDefault();
        const { user } = get();
        console.log(user, "hello")
    }
}))