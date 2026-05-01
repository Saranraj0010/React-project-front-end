import axios from "axios";
import { useState, useEffect } from "react";
import CommenHeader from "../../../commenHeader/CommenHeader";
import logo from "../../../../assets/profile4.jpg";
import close from "../../../../assets/close.png";
import Input from "../../../../Elaments/Input";

const API = import.meta.env.VITE_API;

const AdmissionDetails = () => {
  const [student, setStudent] = useState([]);
  const [editStudent, setEditStudent] = useState({});
  const [viewData, setViewData] = useState({});
  const [standard, setStandard] = useState([]);
  const [section, setSection] = useState([]);
  const [loading, setLoading] = useState(false);

  const [filter, setFilter] = useState({
    filterStandard: "",
    filterSection: "",
    filterText: "",
  });

  const [id, setId] = useState("");
  const [show, setShow] = useState(false);
  const [view, setView] = useState(false);
  const [shows, setShows] = useState(false);

  const input =
    "pl-5 focus:outline-blue-600 text-sm md:text-lg max-w-full h-10 border rounded-lg hover:border-blue-500 shadow-xl";

  // ================= GET DATA =================
  const GetForm = async () => {
    try {
      setLoading(true);

      const [studentRes, standardRes, sectionRes] = await Promise.all([
        axios.get(`${API}v1/getStudent`),
        axios.get(`${API}v1/getStandard`),
        axios.get(`${API}v1/getSection`),
      ]);

      setStudent(studentRes.data.data || []);
      setStandard(standardRes.data.data || []);
      setSection(sectionRes.data.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetForm();
  }, []);

  // ================= FILTER =================
  const filterData = student.filter((item) => {
    const name = `${item.firstName} ${item.lastName}`;
    return (
      (!filter.filterStandard ||
        item.standard === filter.filterStandard) &&
      (!filter.filterSection ||
        item.section === filter.filterSection) &&
      (!filter.filterText ||
        name.toLowerCase().includes(filter.filterText.toLowerCase()))
    );
  });

  // ================= EDIT =================
  const OnEdit = (id) => {
    const selected = student.find((s) => s.id === id);
    if (selected) {
      setEditStudent({ ...selected });
      setShow(true);
    }
  };

  const UpdateForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await axios.patch(`${API}v1/updateStudent`, editStudent);
      setShow(false);
      GetForm();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= VIEW =================
  const OnView = (id) => {
    const selected = student.find((s) => s.id === id);
    if (selected) {
      setViewData(selected);
      setView(true);
    }
  };

  // ================= DELETE =================
  const Del = (id) => {
    setShows(true);
    setId(id);
  };

  const DeleteForm = async () => {
    try {
      setLoading(true);
      await axios.patch(`${API}v1/deleteStudent`, { id });
      setShows(false);
      GetForm();
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= UI =================
  return (
    <div className="min-h-screen px-2">
      <CommenHeader title={"Admission Details"} logo={logo} />

      {/* LOADER */}
      {loading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/40 z-50">
          <div className="bg-white px-6 py-3 rounded-lg shadow-lg">
            Loading...
          </div>
        </div>
      )}

      {/* FILTER */}
      <div className="bg-white my-5 shadow-2xl rounded-2xl flex flex-wrap gap-3 justify-end items-center p-4">
        <Input
          value={filter.filterText}
          placeholder="Enter Student Name"
          onchange={(e) =>
            setFilter({ ...filter, filterText: e.target.value })
          }
        />

        <select
          value={filter.filterStandard}
          className={input}
          onChange={(e) =>
            setFilter({ ...filter, filterStandard: e.target.value })
          }
        >
          <option value="">Standard</option>
          {standard.map((s) => (
            <option key={s.standard} value={s.standard}>
              {s.standard}
            </option>
          ))}
        </select>

        <select
          value={filter.filterSection}
          className={input}
          onChange={(e) =>
            setFilter({ ...filter, filterSection: e.target.value })
          }
        >
          <option value="">Section</option>
          {section.map((s) => (
            <option key={s.section} value={s.section}>
              {s.section}
            </option>
          ))}
        </select>

        <button
          className="bg-green-500 text-white px-3 py-1 rounded"
          onClick={() =>
            setFilter({ filterStandard: "", filterSection: "", filterText: "" })
          }
        >
          Reset
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl shadow p-4">
        {filterData.length === 0 ? (
          <p className="text-center text-gray-500">No Student Found</p>
        ) : (
          <table className="w-full">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-2">S.No</th>
                <th>Name</th>
                <th>DOB</th>
                <th>Class</th>
                <th>Mobile</th>
                <th>View</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filterData.map((item, i) => (
                <tr key={item.id} className="border-b text-center">
                  <td>{i + 1}</td>
                  <td>{item.firstName} {item.lastName}</td>
                  <td>{item.dateOfBirth}</td>
                  <td>{item.standard}-{item.section}</td>
                  <td>{item.studentMobileNo}</td>

                  <td>
                    <button onClick={() => OnView(item.id)} className="bg-blue-500 text-white px-2 rounded">
                      View
                    </button>
                  </td>

                  <td className="flex gap-2 justify-center">
                    <button onClick={() => OnEdit(item.id)} className="bg-green-500 text-white px-2 rounded">
                      Edit
                    </button>
                    <button onClick={() => Del(item.id)} className="bg-red-500 text-white px-2 rounded">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* VIEW MODAL */}
      {view && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50">
          <div className="bg-white p-6 rounded-lg relative">
            <button onClick={() => setView(false)} className="absolute top-2 right-2">✕</button>
            <h2 className="text-xl font-bold mb-3">Student Details</h2>
            <p>Name: {viewData?.firstName} {viewData?.lastName}</p>
            <p>DOB: {viewData?.dateOfBirth}</p>
            <p>Phone: {viewData?.studentMobileNo}</p>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {shows && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/50">
          <div className="bg-white p-5 rounded-lg text-center">
            <p>Are you sure?</p>
            <div className="flex gap-3 justify-center mt-3">
              <button onClick={() => setShows(false)}>Cancel</button>
              <button onClick={DeleteForm} className="bg-red-500 text-white px-3 py-1 rounded">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionDetails;