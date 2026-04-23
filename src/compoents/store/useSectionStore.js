import { toast } from "react-toastify";
import { create } from "zustand";

export const useSectionStore = create((set, get) => ({
    user: {
        section: ""
    },
    roll: {
        section: "",
        id:""
    },
    data: [],
    show: false,
    update: false,
    Delete: false,
    error: {},
    id: "",
     resetUser: () =>
    set({
      user: { section: "" }
    }),
     resetRoll: () =>
    set({
      roll: { section: "" }
    }),
    setUser:(field,value)=>{
        set((state)=>({
            user:{
                ...state.user,
                [field]:value
            }
        }))
    },
    setRoll:(field,value)=>{
        set((state)=>({
            roll:{
                ...state.roll,
                [field]:value
            }
        }))
    },
    setData: (value) => {
        set(() => ({
            data: value
        }))
    },
    setShow: (value) => {
        set(() => ({
            show: value
        }))
    },
    setUpdate: (value) => {
        set(() => ({
            update: value
        }))
    },
    setDelete: (value) => {
        set(() => ({
            Delete: value
        }))
    },
    setError: (value) => {
        set(() => ({
            error: value
        }))
    },
    setId: (value) => {
        set(() => ({
            id: value
        }))
    },
     Validation : () => {
        const { update,roll,user,data,setError } =get();
        let newError = {}
        const value = update ? roll.section : user.section

        if (value.trim() === "") {
            toast.error("Section is required")
            return false
        }

        if (!update && data.find(
            (item) => item.section.toLowerCase() === value.toLowerCase()
        )) {
            toast.error("Section already exists")
            return false
        }

        setError(newError)
        return Object.keys(newError).length === 0
    }
}))