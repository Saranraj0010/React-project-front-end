import { create } from "zustand";
import SignUp from "../signup/SignUp";
import hide from "../../../assets/hide.png"
import show from "../../../assets/show.png"
import axios from "axios";
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
    eyeShow: show,
    eyeHide: hide,
    showPassword: false,
    showConfirmPassword: false,
    setShowPassword: (value) => {
        set((item) => ({ showPassword: value }))
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
    SignUp: (e) => {
        e.preventDefault();
        const { signUpUser } = get();
        console.log(signUpUser, "hello")
        const Add = async() =>{
                    try{
                        const add=await axios.post(`${API}addSignUp`,signUpUser)
                        console.log(add)
                    }
                    catch(err){
                        console.log(err,"Error")
                    }
                }
                Add();
    },
    Get:async()=>{
        try{
            const get=await axios.get(`${API}getSignUp`)
            console.log(get)
        }
        catch(err){
            console.log(err)
        }
    },
    Login: (e) => {
        e.preventDefault();
        const { user } = get();
        console.log(user, "hello")
    }
}))