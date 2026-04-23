import { useState, useEffect } from "react";
import logo from "../../../assets/profile4.jpg";
import ButtonHeader from "../../commenHeader/ButtonHeader";
import axios from "axios";
import { toast } from "react-toastify";
import { useLoginStore } from "../store/useLoginStore";

const API = import.meta.env.VITE_API;

const StaffAllocation = () => {
  const { darkMode } = useLoginStore();

  const [show, setShow] = useState(false);

  const [user, setUser] = useState({
    staff: "",
    standard: "",
    section: "",
    subject: "",
  });

  const [staff, setStaff] = useState([]);
  const [section, setSection] = useState([]);
  const [standard, setStandard] = useState([]);
  const [subject, setSubject] = useState([]);
  const [allocation, setAllocation] = useState([]);
  const [error, setError] = useState({});

  // ✅ styles
  const pageStyle = darkMode
    ? "bg-gray-950 text-white"
    : "text-black";

  const cardStyle = darkMode
    ? "bg-gray-900 text-white border border-gray-800"
    : "bg-white text-black";

  const inputStyle = darkMode
    ? "bg-gray-800 text-white border border-gray-700"
    : "border";

  // ✅ validation FIXED
  const Validation = () => {
    let newError = {};

    if (!user.staff) {
      toast.error("Staff required");
      return false;
    }
    if (!user.standard) {
      toast.error("Standard required");
      return false;
    }
    if (!user.section) {
      toast.error("Section required");
      return false;
    }
    if (!user.subject) {
      toast.error("Subject required");
      return false;
    }

    const alreadyExists = allocation.some(
      (item) =>
        item.staff === user.staff &&
        item.standard === user.standard &&
        item.section === user.section &&
        item.subject === user.subject
    );

    if (alreadyExists) {
      newError.staff = "Already allocated!";
      toast.error("Already allocated for this class & subject");
    }

    setError(newError);
    return Object.keys(newError).length === 0;
  };

  const GetData = async () => {
    try {
      const [
        staffRes,
        standardRes,
        sectionRes,
        allocationRes,
        subjectRes,
      ] = await Promise.all([
        axios.get(`${API}v1/getStaff`),
        axios.get(`${API}v1/getStandard`),
        axios.get(`${API}v1/getSection`),
        axios.get(`${API}v1/getAllocation`),
        axios.get(`${API}v1/getSubject`),
      ]);

      setStaff(staffRes.data.data);
      setStandard(standardRes.data.data);
      setSection(sectionRes.data.data);
      setAllocation(allocationRes.data.data);
      setSubject(subjectRes.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  const Submit = async () => {
    if (!Validation()) return;

    try {
      await axios.post(`${API}v1/addAllocation`, user);
      toast.success("Staff Allocated Successfully");
      await GetData();
      setShow(false);
      setUser({
        staff: "",
        standard: "",
        section: "",
        subject: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`min-h-screen px-2 ${pageStyle}`}>
      <ButtonHeader title={"Staff Allocation"} logo={logo} button={"Allocate Staff"} onclick={() => setShow(true)}/>
      <div className={`rounded-2xl shadow-lg my-5 p-6 ${cardStyle}`}>
        {allocation.length === 0 ? (
          <p className="text-center opacity-70">
            No Staff Allocation Found
          </p>
        ) : (
          <div className="overflow-x-auto scroll-auto md:overflow-hidden">
            <table className="w-full text-center border-collapse">
              <thead className={`${darkMode ? "bg-gray-800" : "bg-blue-600 text-white"}`}>
                <tr>
                  <th className="p-3">S.No</th>
                  <th className="p-3">Staff Name</th>
                  <th className="p-3">Class</th>
                  <th className="p-3">Subject</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {allocation.map((item, index) => (
                  <tr key={item.id} className={`border-b transition ${darkMode ? "border-gray-700 hover:bg-gray-800" : "hover:bg-blue-50"}`}>
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{item.staff}</td>
                    <td className="p-3">
                      {item.standard}-{item.section}
                    </td>
                    <td className="p-3">{item.subject}</td>

                    <td className="p-3 flex justify-center gap-2">
                      <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg">
                        Edit
                      </button>
                      <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {show && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className={`rounded-2xl shadow-2xl p-6 w-96 space-y-4 ${cardStyle}`}>
            <h2 className="text-xl font-bold text-center text-blue-500">
              Staff Allocation
            </h2>
            {["staff", "standard", "section", "subject"].map((field) => (
              <div key={field}>
                <label className="font-medium capitalize">
                  {field}
                </label>
                <select value={user[field]} onChange={(e) =>setUser({ ...user, [field]: e.target.value })}className={`w-full h-10 rounded-lg px-2 mt-1 ${inputStyle}`}>
                  <option value="">Select {field}</option>
                  {(field === "staff" ? staff.map((s) => ({value: `${s.firstName} ${s.lastName}`,label: `${s.firstName} ${s.lastName}`})) : field === "standard" ? standard.map((s) => ({value: s.standard,label: s.standard})) : field === "section" ? section.map((s) => ({value: s.section,label: s.section})) : subject.map((s) => ({value: s.subject,label: s.subject}))).map((opt, i) => (
                    <option key={i} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
            <div className="flex justify-center gap-4 pt-2">
              <button onClick={() => setShow(false)} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
                Cancel
              </button>
              <button onClick={Submit} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffAllocation;