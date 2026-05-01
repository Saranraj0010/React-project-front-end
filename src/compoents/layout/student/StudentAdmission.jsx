import { useState, useEffect } from "react";
import axios from "axios";
import CommenHeader from "../../commenHeader/CommenHeader";
import logo from "../../../assets/profile4.jpg";
import { LabelName } from "../../../Elaments/LabelName";
import { toast } from "react-toastify";
import { useStudentAdmissionStore } from "../../store/useStudentAdmissionStore";

const API = import.meta.env.VITE_API;

const StudentAdmission = () => {
  const {
    input,
    inputData,
    student,
    setStudent,
    error,
    setError,
    standard,
    setStandard,
    section,
    setSection,
    price,
    setPrice,
    fees,
    setFees,
    data,
    setData,
    Validation1,
    Validation2,
    payment,
    setPayment,
    resetStudent,
    resetPayment,
  } = useStudentAdmissionStore();

  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  // ================= GET DATA =================
  const GetForm = async () => {
    try {
      setLoading(true);

      const [stdRes, secRes, feeRes] = await Promise.all([
        axios.get(`${API}v1/getStandard`),
        axios.get(`${API}v1/getSection`),
        axios.get(`${API}v1/getFees`),
      ]);

      setStandard(stdRes.data.data || []);
      setSection(secRes.data.data || []);
      setPrice(feeRes.data.data || []);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetForm();
  }, []);

  // ================= STEP 1 =================
  const AddForm = (e) => {
    e.preventDefault();

    if (!Validation1()) return;

    const selectedFees = price.find(
      (item) => item.standard === student.standard
    );

    if (!selectedFees) {
      toast.error("Fees not found for selected standard");
      return;
    }

    setData(selectedFees);

    setPayment("name", `${student.firstName} ${student.lastName}`);
    setPayment("standard", student.standard);
    setPayment("section", student.section);
    setPayment("fees", Number(selectedFees.fees) || 0);
    setPayment("downPayment", "");
    setPayment("currentDownPayment", "");
    setPayment("balance", Number(selectedFees.fees) || 0);
    setPayment("currentBalance", Number(selectedFees.fees) || 0);

    setFees(true);
  };

  // ================= STEP 2 =================
  const downPaymentHandler = async (e) => {
    e.preventDefault();

    if (!Validation2()) return;

    try {
      setBtnLoading(true);

      await axios.post(`${API}v1/addStudent`, student);
      await axios.post(`${API}v1/addPayment`, payment);

      toast.success("Student Added Successfully");

      resetStudent();
      resetPayment();
      setFees(false);
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setBtnLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className="min-h-screen px-2">
      <CommenHeader title={"Student Admission"} logo={logo} />

      {/* PAGE LOADER */}
      {loading ? (
        <div className="flex justify-center items-center h-60">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="bg-gray-50 my-5 rounded-2xl shadow-inner p-6">
          <form
            className="w-full p-5 border rounded-lg flex flex-col gap-4"
            onSubmit={AddForm}
          >
            <h1 className="font-bold text-center text-2xl underline">
              ADMISSION FORM
            </h1>

            {/* STUDENT INFO */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <LabelName>User Name</LabelName>
                <input
                  className={input}
                  value={student.userName}
                  onChange={(e) => {
                    setStudent("userName", e.target.value);
                    setError("userName", "");
                  }}
                />
                <p className="text-red-500 text-xs">{error.userName}</p>
              </div>

              <div>
                <LabelName>First Name</LabelName>
                <input
                  className={input}
                  value={student.firstName}
                  onChange={(e) => {
                    setStudent("firstName", e.target.value);
                    setError("firstName", "");
                  }}
                />
              </div>

              <div>
                <LabelName>Last Name</LabelName>
                <input
                  className={input}
                  value={student.lastName}
                  onChange={(e) => {
                    setStudent("lastName", e.target.value);
                    setError("lastName", "");
                  }}
                />
              </div>

              <div>
                <LabelName>Standard</LabelName>
                <select
                  className={input}
                  value={student.standard}
                  onChange={(e) =>
                    setStudent("standard", e.target.value)
                  }
                >
                  <option value="">Select</option>
                  {standard.map((s) => (
                    <option key={s.standard} value={s.standard}>
                      {s.standard}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <LabelName>Section</LabelName>
                <select
                  className={input}
                  value={student.section}
                  onChange={(e) =>
                    setStudent("section", e.target.value)
                  }
                >
                  <option value="">Select</option>
                  {section.map((s) => (
                    <option key={s.section} value={s.section}>
                      {s.section}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button className="bg-blue-600 text-white py-2 rounded-lg">
              Continue
            </button>
          </form>
        </div>
      )}

      {/* PAYMENT MODAL */}
      {fees && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/40">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-bold mb-3 text-center">
              Payment
            </h2>

            <p>Total Fees: ₹ {data?.fees}</p>

            <input
              type="number"
              className={input}
              value={payment.downPayment}
              onChange={(e) => {
                const value = Number(e.target.value) || 0;

                setPayment("downPayment", value);
                setPayment("currentDownPayment", value);
                setPayment("totalPaid", value);
                setPayment("currentTotalPaid", value);

                const balance = payment.fees - value;

                setPayment("balance", balance);
                setPayment("currentBalance", balance);
              }}
            />

            <p className="text-red-500">
              Balance: ₹ {payment.currentBalance}
            </p>

            <button
              onClick={downPaymentHandler}
              className="bg-green-600 text-white w-full py-2 mt-3 rounded-lg flex justify-center items-center gap-2"
              disabled={btnLoading}
            >
              {btnLoading && (
                <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
              )}
              {btnLoading ? "Processing..." : "Pay"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentAdmission;