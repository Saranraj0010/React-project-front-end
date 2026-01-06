import { create } from "zustand";

export const useStudentStore = create((set, get) => ({
    studentProfile: [],
    student: {
        studentId: "",
        firstName: "",
        middleName: "",
        lastName: "",
        dateOfBirth: "",
        streetAddress: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        email: "",
        phoneNumber: ""
    },
    handleRegister:(e)=>{
        e.preventDefault();
        const{studentProfile,student}=get()
        const studentData = JSON.parse(localStorage.getItem("student")) || [];
        studentData.push(student);
        localStorage.setItem("student", JSON.stringify(studentData));
        set({studentProfile:studentData});
        // console.log(studentProfile)
        e.target.reset();
    },
    // handleRegister: (e) => {
    //     e.preventDefault();

    //     const { student, studentProfile } = get()

    //     const updatedProfile = [...studentProfile, student];

    //     set({ studentProfile: updatedProfile });
    //     updatedProfile.push(student);

    //     localStorage.setItem("student", JSON.stringify(updatedProfile));

    //     e.target.reset();
    // },
    setData: (field, value) => {
        set((state) => ({
            student: {
                ...state.student,
                [field]: value
            }
        }))
    }
}))
// function handleRegister(e) {
// e.preventDefault();
// const studentData = JSON.parse(localStorage.getItem("student")) || [];
// studentData.push(student);
// localStorage.setItem("student", JSON.stringify(studentData));
// studentProfile={studentData};
//   console.log(studentProfile)
// e.target.reset();
// }