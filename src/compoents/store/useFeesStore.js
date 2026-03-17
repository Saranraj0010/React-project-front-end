import { toast } from "react-toastify";
import { create } from "zustand";

export const useFeesStore = create((set, get) => ({
    price: {
        standard: "",
        fees: ""
    },
    standard: [],
    show: false,
    allocation: [],
    error: {},
    // id: "",
    resetPrice: () => {
        set({ price: { standard: "", fees: "" } })
    },
    setPrice: (field, value) => {
        set((state) => ({
            price: {
                ...state.price,
                [field]: value
            }
        }))
    },
    setStandard: (value) => {
        set(() => ({
            standard: value
        }))
    },
    setShow: (value) => {
        set(() => ({
            show: value
        }))
    },
    setAllocation: (value) => {
        set(() => ({
            allocation: value
        }))
    },
    setError: (value) => {
        set(() => ({
            error: value
        }))
    },
    // setId: (value) => {
    // set(() => ({
    // id: value
    // }))}
    Validation: () => {
        const { price,allocation }=get()
        let newError = {};
        let Number = /^\+?[1-9]\d{3,6}$/
        if (price.standard.trim() === "") {
            toast.error("Standard required")
        }
        const alreadyExists = allocation.some((item) => item.standard === price.standard);
        if (alreadyExists) {
            toast.error("Fees is already allocated")
        }
        if (price.fees.trim() === "") {
            toast.error("Fees required")
            return false
        }
        else if (!Number.test(price.fees)) {
            toast.error("Invalid Fees Entry")
            return false
        }
        setError(newError);
        return Object.keys(newError).length === 0;
    }
}))