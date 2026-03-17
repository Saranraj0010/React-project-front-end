import { toast } from "react-toastify";
import { create } from "zustand";

export const useSubjectStore = create((set, get) => ({
    user: {
        subject: ""
    },
    roll: {
        subject: "",
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
      user: { subject: "" }
    }),
     resetRoll: () =>
    set({
      roll: { subject: "" }
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
        const { user,data,setError } =get()
        let newError = {};
        if (user.subject.trim() === ""){
          toast.error("Subject required")
          return false
        }
        if(data.find((item)=>item.subject.toLocaleLowerCase()===user.subject.toLocaleLowerCase())){
          toast.error("Already exist")
          return false
        }
        setError(newError);
        return Object.keys(newError).length === 0;
    }
}))