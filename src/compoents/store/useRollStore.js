import { toast } from "react-toastify";
import { create } from "zustand";

export const useRollStore = create((set, get) => ({
    user: {
        role: ""
    },
    roll: {
        role: "",
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
      user: { role: "" }
    }),
     resetRoll: () =>
    set({
      roll: { role: "" }
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
        const { user,update,roll,data }=get()
        let newError = {}
        const value = update ? roll.role : user.role

        if (value.trim() === "") {
            toast.error("Role is required")
            return false
        }

        if (!update && data.find((item) =>
            item.role.toLowerCase() === value.toLowerCase()
        )) {
            toast.error("Role already exists")
            return false
        }

        setError(newError)
        return Object.keys(newError).length === 0
    }
}))