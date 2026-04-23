import { toast } from "react-toastify";
import { create } from "zustand";

export const useStandardStore = create((set, get) => ({
    user: {
        standard: ""
    },
    roll: {
        standard: "",
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
      user: { standard: "" }
    }),
     resetRoll: () =>
    set({
      roll: { standard: "" }
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
   Validation: () => {
  const { user, data, setError } = get();

  let newError = {};

  if (user.standard.trim() === "") {
    toast.error("Standard required");
    return false;
  }

  if (
    data.find(
      (item) =>
        item.standard.toLowerCase() === user.standard.toLowerCase()
    )
  ) {
    toast.error("Already exist");
    return false;
  }

  setError(newError);

  return Object.keys(newError).length === 0;
}
}))