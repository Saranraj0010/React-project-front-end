import { create } from "zustand";
import { toast } from "react-toastify";
import { useRef } from "react";
import { persist } from "zustand/middleware";
export const useStudentAdmissionStore = create((set, get) => (
    persist(
        (set) => ({
            id: 1,
            setId: (value) => {
                set({ id: id + value })
            },
        })),
    {
        input: "pl-4 h-10 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition",
        inputData: [{ name: "fatherName", title: "Father Name:" }, { name: "fatherOccupation", title: "Father Occupation:" }, { name: "fatherNumber", title: "Father Number:" }, { name: "motherName", title: "Mother Name:" }, { name: "motherOccupation", title: "Mother Occupation:" }, { name: "motherNumber", title: "Mother Number:" }],
        student: {
            // roleNo: "",
            userName: "",
            firstName: "",
            lastName: "",
            gender: "",
            dateOfBirth: "",
            aaadharno: "",
            standard: "",
            bloodGroup: "",
            language: "",
            section: "",
            address: "",
            state: "",
            nationality: "",
            pincode: "",
            email: "",
            studentMobileNo: "",
            fatherName: "",
            fatherOccupation: "",
            fatherNumber: "",
            motherName: "",
            motherOccupation: "",
            motherNumber: ""
        },
        payment: {
            roleNo: "",
            fees: "",
            name: "",
            standard: "",
            section: "",
            downPayment: "",
            currentDownPayment:"",
            balance: "",
            currentBalance:"",
            totalPaid:"",
            currentTotalPaid:""
        },
        error: {},
        standard: [],
        section: [],
        price: [],
        fees: false,
        data: [],
        id: 1,
        // inputRef : useRef({}),
        resetStudent: () => {
            set(() => ({
                student: {
                    userName: "",
                    firstName: "",
                    lastName: "",
                    gender: "",
                    dateOfBirth: "",
                    aaadharno: "",
                    standard: "",
                    bloodGroup: "",
                    language: "",
                    section: "",
                    address: "",
                    state: "",
                    nationality: "",
                    pincode: "",
                    email: "",
                    studentMobileNo: "",
                    fatherName: "",
                    fatherOccupation: "",
                    fatherNumber: "",
                    motherName: "",
                    motherOccupation: "",
                    motherNumber: ""
                }
            }))
        },
        resetPayment: () => {
            set(() => ({
                payment: {
                    roleNo: "",
                    fees: "",
                    name: "",
                    standard: "",
                    section: "",
                    downPayment: "",
                    balance: ""
                }
            }))
        },
        setStudent: (field, value) => {
            set((state) => ({
                student: {
                    ...state.student,
                    [field]: value
                }
            }))
        },
        setPayment: (field, value) => {
            set((state) => ({
                payment: {
                    ...state.payment,
                    [field]: value
                }
            }))
        },
        setError: (field, message) => {
            set((state) => ({
                error: {
                    ...state.error,
                    [field]: message
                }
            }));
        },

        setErrors: (errors) => {
            set(() => ({
                error: errors
            }));
        },
        setStandard: (value) => {
            set(() => ({
                standard: value
            }))
        },
        setSection: (value) => {
            set(() => ({
                section: value
            }))
        },
        setPrice: (value) => {
            set(() => ({
                price: value
            }))
        },
        setFees: (value) => {
            set(() => ({
                fees: value
            }))
        },
        setData: (value) => {
            set(() => ({
                data: value
            }))
        },
        // setId: () => {
        //     set((state) => ({
        //         id: state.id + 1
        //     }));
        // },
        Validation1: () => {
            const { student, setErrors } = get();
            let newError = {};
            let Email = /^\S+@\S+\.\S+$/
            let Number = /^\+?[1-9]\d{6,14}$/
            // if (student.roleNo.trim() === ""){
            //     toast.error("Role Number requird")
            //      newError.roleNo = "Role Number requird"
            // }
            if (student.userName.trim() === "") {
                toast.error("User Name requird")
                newError.userName = "User Name requird"
            }
            if (student.firstName.trim() === "") {
                toast.error("First Name requird")
                newError.firstName = "First Name requird"
            }
            if (student.lastName.trim() === "") {
                toast.error("Last Name requird")
                newError.lastName = "Last Name requird"
            }
            if (student.gender.trim() === "") {
                toast.error("Gender requird")
                newError.gender = "Gender requird"
            }
            if (student.dateOfBirth.trim() === "") {
                toast.error("DOB requird")
                newError.dateOfBirth = "DOB requird"
            }
            if (student.aaadharno.trim() === "") {
                toast.error("Aaadharno requird")
                newError.aaadharno = "Aaadharno requird"
            }
            if (student.standard.trim() === "") {
                toast.error("Standard requird")
                newError.standard = "Standard requird"
            }
            if (student.bloodGroup.trim() === "") {
                toast.error("BloodGroup requird")
                newError.bloodGroup = "BloodGroup requird"
            }
            if (student.language.trim() === "") {
                toast.error("Language requird")
                newError.language = "Language requird"
            }
            if (student.section.trim() === "") {
                toast.error("Section requird")
                newError.section = "Section requird"
            }
            if (student.address.trim() === "") {
                toast.error("Address requird")
                newError.address = "Address requird"
            }
            if (student.state.trim() === "") {
                toast.error("State requird")
                newError.state = "State requird"
            }
            if (student.pincode.trim() === "") {
                toast.error("Pincode requird")
                newError.pincode = "Pincode requird"
            }
            if (student.nationality.trim() === "") {
                toast.error("Nationality requird")
                newError.nationality = "Nationality requird"
            }
            if (student.email.trim() === "") {
                toast.error("Email requird")
                newError.email = "Email requird"
            }
            else if (!Email.test(student.email)) {
                toast.error("Invalid email")
                newError.email = "Invalid email"
            }
            if (student.studentMobileNo.trim() === "") {
                toast.error("Phone Number requird")
                newError.studentMobileNo = "Phone Number requird"
            }
            else if (!Number.test(student.studentMobileNo)) {
                toast.error("Invalid phone number format")
                newError.studentMobileNo = "Invalid phone number format"
            }
            if (student.fatherName.trim() === "") {
                toast.error("Father Name requird")
                newError.fatherName = "Father Name requird"
            }
            if (student.fatherNumber.trim() === "") {
                toast.error("Father Number requird")
                newError.fatherNumber = "Father Number requird"
            }
            else if (!Number.test(student.fatherNumber)) {
                toast.error("Invalid phone number format")
                newError.fatherNumber = "Invalid phone number format"
            }
            if (student.fatherOccupation.trim() === "") {
                toast.error("Father Occupation requird")
                newError.fatherOccupation = "Father Occupation requird"
            }
            if (student.motherName.trim() === "") {
                toast.error("Mother Name requird")
                newError.motherName = "Mother Name requird"
            }
            if (student.motherNumber.trim() === "") {
                toast.error("Mother Number requird")
                newError.motherNumber = "Mother Number requird"
            }
            else if (!Number.test(student.motherNumber)) {
                toast.error("Invalid phone number format")
                newError.motherNumber = "Invalid phone number format"
            }
            if (student.motherOccupation.trim() === "") {
                toast.error("Mother Occupation requird")
                newError.motherOccupation = "Mother Occupation requird"
            }
            setErrors(newError);
            if (Object.keys(newError).length > 0) {
                const firstErrorKey = Object.keys(newError)[0];
                // inputRef.current[firstErrorKey]?.focus();
                return false;
            }
            return true;
        },
        // ref={(el) => (inputRef.current[item.name] = el)}
        Validation2: () => {
            const { payment, data, setErrors } = get();

            let newError = {};

            if (payment.downPayment.trim() === "") {
                toast.error("DownPayment required");
                newError.downPayment = "DownPayment required";
            }
            else if (Number(payment.downPayment) > Number(data?.fees)) {
                toast.error("DownPayment is greater than fees");
                newError.downPayment = "DownPayment is greater than fees";
            }

            setErrors(newError);

            if (Object.keys(newError).length > 0) {
                return false;
            }

            return true;
        }
    }))