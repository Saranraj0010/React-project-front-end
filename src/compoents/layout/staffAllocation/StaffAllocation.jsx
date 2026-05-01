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
  const [loading, setLoading] = useState(false);

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

  // 🎨 styles
  const pageStyle = darkMode ? "bg-gray-950 text-white" : "text-black";
  const cardStyle = darkMode
    ? "bg-gray-900 text-white border border-gray-800"
    : "bg-white text-black";
  const inputStyle = darkMode
    ? "bg-gray-800 text-white border border-gray-700"
    : "border";

  // ✅ get staff name from id
  const getStaffName = (id) => {
    const found = staff.find((s) => s.id === id);
    return found ? `${found.firstName} ${found.lastName}` : "Unknown";
  };

  // ✅ Validation
  const Validation = () => {
    let newError = {};

    if (!user.staff) newError.staff = "Staff required";
    if (!user.standard) newError.standard = "Standard required";
    if (!user.section) newError.section = "Section required";
    if (!user.subject) newError.subject = "Subject required";

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

    if (Object.keys(newError).length > 0) {
      toast.error("Please fill all fields");
      return false;
    }

    return true;
  };

  // ✅ Fetch Data (Parallel)
  const GetData = async () => {
    try {
      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  // ✅ Submit
  const Submit = async () => {
    if (!Validation()) return;

    try {
      setLoading(true);
      await axios.post(`${API}v1/addAllocation`, user);
      toast.success("Staff Allocated Successfully");

      setUser({
        staff: "",
        standard: "",
        section: "",
        subject: "",
      });

      setShow(false);
      GetData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete
  const DeleteAllocation = async (id) => {
    try {
      setLoading(true);
      await axios.patch(`${API}v1/deleteAllocation`, { id });
      toast.success("Deleted successfully");
      GetData();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen px-2 ${pageStyle}`}>
      <ButtonHeader
        title={"Staff Allocation"}
        logo={logo}
        button={"Allocate Staff"}
        onclick={() => setShow(true)}
      />

      {/* 🔄 Loader */}
      {loading && (
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* TABLE */}
      {!loading && (
        <div className={`rounded-2xl shadow-lg my-5 p-6 ${cardStyle}`}>
          {allocation.length === 0 ? (
            <p className="text-center opacity-70">
              No Staff Allocation Found
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-center border-collapse">
                <thead
                  className={`${
                    darkMode
                      ? "bg-gray-800"
                      : "bg-blue-600 text-white"
                  }`}
                >
                  <tr>
                    <th className="p-3">S.No</th>
                    <th className="p-3">Staff</th>
                    <th className="p-3">Class</th>
                    <th className="p-3">Subject</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {allocation.map((item, index) => (
                    <tr key={item.id} className="border-b">
                      <td className="p-3">{index + 1}</td>
                      <td className="p-3">
                        {getStaffName(item.staff)}
                      </td>
                      <td className="p-3">
                        {item.standard}-{item.section}
                      </td>
                      <td className="p-3">{item.subject}</td>
                      <td className="p-3 flex justify-center gap-2">
                        <button className="bg-green-500 text-white px-3 py-1 rounded">
                          Edit
                        </button>
                        <button
                          onClick={() => DeleteAllocation(item.id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
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
      )}

      {/* MODAL */}
      {show && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div
            className={`rounded-2xl shadow-2xl p-6 w-96 space-y-4 ${cardStyle}`}
          >
            <h2 className="text-xl font-bold text-center text-blue-500">
              Staff Allocation
            </h2>

            {/* STAFF */}
            <select
              value={user.staff}
              onChange={(e) => {
                setUser({ ...user, staff: e.target.value });
                setError({ ...error, staff: "" });
              }}
              className={`w-full h-10 ${inputStyle}`}
            >
              <option value="">Select staff</option>
              {staff.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.firstName} {s.lastName}
                </option>
              ))}
            </select>

            {/* STANDARD */}
            <select
              value={user.standard}
              onChange={(e) => {
                setUser({ ...user, standard: e.target.value });
                setError({ ...error, standard: "" });
              }}
              className={`w-full h-10 ${inputStyle}`}
            >
              <option value="">Select standard</option>
              {standard.map((s, i) => (
                <option key={i} value={s.standard}>
                  {s.standard}
                </option>
              ))}
            </select>

            {/* SECTION */}
            <select
              value={user.section}
              onChange={(e) => {
                setUser({ ...user, section: e.target.value });
                setError({ ...error, section: "" });
              }}
              className={`w-full h-10 ${inputStyle}`}
            >
              <option value="">Select section</option>
              {section.map((s, i) => (
                <option key={i} value={s.section}>
                  {s.section}
                </option>
              ))}
            </select>

            {/* SUBJECT */}
            <select
              value={user.subject}
              onChange={(e) => {
                setUser({ ...user, subject: e.target.value });
                setError({ ...error, subject: "" });
              }}
              className={`w-full h-10 ${inputStyle}`}
            >
              <option value="">Select subject</option>
              {subject.map((s, i) => (
                <option key={i} value={s.subject}>
                  {s.subject}
                </option>
              ))}
            </select>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShow(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={Submit}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
              >
                {loading ? "Saving..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffAllocation;