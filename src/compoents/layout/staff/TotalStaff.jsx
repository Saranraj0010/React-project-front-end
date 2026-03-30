import axios from "axios";
import { useEffect, useState } from "react";
import Delimage from "../../../assets/trash.png";
import EditImg from "../../../assets/edit.png";
import CommenHeader from "../../commenHeader/CommenHeader";
import logo from "../../../assets/profile4.jpg";
import close from "../../../assets/close.png";
import { useLoginStore } from "../store/useLoginStore";
import { toast } from "react-toastify";

const API = import.meta.env.VITE_API;

const TotalStaff = () => {
  const { darkMode } = useLoginStore();

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [view, setView] = useState(false);
  const [viewData, setViewData] = useState({});
  const [deleteId, setDeleteId] = useState(null);

  const [staff, setStaff] = useState({
    id: "",
    userName: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    password: "",
    role: "",
    address: "",
    state: "",
    country: "",
    pincode: "",
    email: "",
    phoneNumber: "",
  });

  // styles
  const pageStyle = darkMode
    ? "bg-gray-950 text-white"
    : "text-black";

  const cardStyle = darkMode
    ? "bg-gray-900 border border-gray-800"
    : "bg-white";

  const inputStyle = darkMode
    ? "bg-gray-800 text-white border border-gray-700"
    : "border";

  const GetData = async () => {
    try {
      const res = await axios.get(`${API}getStaff`);
      setData(res.data.data);
      console.log(res.data.data)
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    GetData();
  }, []);

  // EDIT
  const OnEdit = (id) => {
    const selected = data.find((item) => item.id === id);
    if (!selected) return;

    setStaff({ ...selected, id });
    setShow(true);
  };

  const UpdateForm = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${API}updateForm`, staff);
      toast.success("Updated successfully");
      setShow(false);
      GetData();
    } catch (err) {
      console.log(err);
    }
  };

  // VIEW
  const OnView = (id) => {
    const selected = data.find((item) => item.id === id);
    setViewData(selected);
    setView(true);
  };

  // DELETE
  const DeleteForm = async () => {
    try {
      await axios.patch(`${API}deleteStaff`, { id: deleteId });
      toast.success("Deleted successfully");
      setDeleteId(null);
      GetData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`min-h-screen px-2 ${pageStyle}`}>
      <CommenHeader title={"Staff Details"} logo={logo} />
      {/* <div className="bg-white rounded-2xl shadow grid grid-cols-2 md:flex justify-end gap-3 items-center p-4">
        <Input value={filter.filterText} placeholder={"Enter Student Name"} onchange={(e) => { setFilter({ ...filter, filterText: e.target.value }) }} className="placeholder:opacity-40 w-full" />
        <select name="standard" id="" value={filter.filterStandard} placeholder="Standard" className={input} onChange={(e) => { setFilter({ ...filter, filterStandard: e.target.value }) }}>
          <option value="no">Select Standard</option>
          {standard.map((item) => (
            <option key={item.standard} value={item.standard}>{item.standard}</option>
          ))}
        </select>
        <select name="section" value={filter.filterSection} placeholder="Section" className={input} onChange={(e) => { setFilter({ ...filter, filterSection: e.target.value }) }} >
          <option value="">Select Section</option>
          {section.map((item) => (
            <option key={item.section} value={item.section}>{item.section}</option>
          ))}
        </select>
        <button className="bg-green-400 rounded-lg p-1 cursor-pointer" onClick={() => setFilter({ filterSection: "", filterStandard: "", filterText: "", })}>Reset</button>
      </div> */}
      <div className={`p-5 my-5 rounded-2xl shadow-xl ${cardStyle}`}>
        {data.length === 0 ? (
          <p className="text-center opacity-70">No Staff Found</p>
        ) : (
          <div className="overflow-x-scroll md:overflow-hidden">
            <table className="w-full text-center">
              <thead
                className={`${darkMode ? "bg-gray-800" : "bg-blue-600 text-white"
                  }`}
              >
                <tr>
                  <th className="p-3">S.No</th>
                  <th className="p-3">ID</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">DOB</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">View</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {data.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`border-b ${darkMode
                      ? "border-gray-700 hover:bg-gray-800"
                      : "hover:bg-blue-50"
                      }`}
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{item.id}</td>
                    <td className="p-3">
                      {item.firstName} {item.lastName}
                    </td>
                    <td className="p-3">{item.dateOfBirth}</td>
                    <td className="p-3">{item.email}</td>
                    <td className="p-3">{item.phoneNumber}</td>

                    <td className="p-3">
                      <button
                        className="bg-blue-500 px-2 py-1 rounded text-white"
                        onClick={() => OnView(item.id)}
                      >
                        View
                      </button>
                    </td>

                    <td className="md:flex justify-center p-3 gap-2">
                      <button
                        className="bg-green-500 p-1 rounded"
                        onClick={() => OnEdit(item.id)}
                      >
                        <img width={20} src={EditImg} />
                      </button>

                      <button
                        className="bg-red-600 p-1 rounded"
                        onClick={() => setDeleteId(item.id)}
                      >
                        <img width={20} src={Delimage} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className={`p-5 rounded-lg ${cardStyle}`}>
            <p className="mb-3">Delete this staff?</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setDeleteId(null)}
                className="bg-gray-500 px-3 py-1 rounded text-white"
              >
                Cancel
              </button>
              <button
                onClick={DeleteForm}
                className="bg-red-600 px-3 py-1 rounded text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW MODAL */}
     {view && (
  <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
    <div className={`p-6 rounded-2xl w-87.5 md:w-112.5 relative shadow-xl ${cardStyle}`}>

      {/* Close Button */}
      <img
        src={close}
        className="absolute top-3 right-3 w-6 h-6 cursor-pointer"
        onClick={() => setView(false)}
      />

      {/* Title */}
      <h2 className="text-xl font-bold mb-4 text-blue-500 text-center">
        Staff Details
      </h2>

      {/* Profile Circle */}
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
          {viewData.firstName?.charAt(0)}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-2 text-sm">
        <p><span className="font-semibold">Name:</span> {viewData.firstName} {viewData.lastName}</p>
        <p><span className="font-semibold">Username:</span> {viewData.userName}</p>
        <p><span className="font-semibold">Role:</span> {viewData.role}</p>
        <p><span className="font-semibold">DOB:</span> {viewData.dateOfBirth}</p>
        <p><span className="font-semibold">Email:</span> {viewData.email}</p>
        <p><span className="font-semibold">Phone:</span> {viewData.phoneNumber}</p>

        <p>
          <span className="font-semibold">Address:</span><br />
          {viewData.address},<br />
          {viewData.state}, {viewData.country} - {viewData.pincode}
        </p>
      </div>

    </div>
  </div>
)}

      {/* EDIT MODAL */}
      {show && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <form
            onSubmit={UpdateForm}
            className={`p-6 rounded-lg w-100 ${cardStyle}`}
          >
            <h2 className="text-lg font-bold mb-3">
              Update Staff
            </h2>

            <input
              value={staff.firstName}
              onChange={(e) =>
                setStaff({ ...staff, firstName: e.target.value })
              }
              className={`w-full mb-2 p-2 rounded ${inputStyle}`}
              placeholder="First Name"
            />

            <input
              value={staff.lastName}
              onChange={(e) =>
                setStaff({ ...staff, lastName: e.target.value })
              }
              className={`w-full mb-2 p-2 rounded ${inputStyle}`}
              placeholder="Last Name"
            />

            <input
              value={staff.email}
              onChange={(e) =>
                setStaff({ ...staff, email: e.target.value })
              }
              className={`w-full mb-2 p-2 rounded ${inputStyle}`}
              placeholder="Email"
            />

            <div className="flex gap-3 justify-end mt-3">
              <button
                type="button"
                onClick={() => setShow(false)}
                className="bg-gray-500 px-3 py-1 rounded text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-blue-600 px-3 py-1 rounded text-white"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default TotalStaff;