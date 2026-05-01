import logo from "../../../assets/profile4.jpg";
import { useEffect, useState } from "react";
import axios from "axios";
import ButtonHeader from "../../commenHeader/ButtonHeader";
import { useStandardStore } from "../../store/useStandardStore";

const API = import.meta.env.VITE_API;

const Standard = () => {
  const {
    user,
    setUser,
    roll,
    setRoll,
    data,
    setData,
    show,
    setShow,
    update,
    setUpdate,
    Delete,
    setDelete,
    error,
    id,
    setId,
    resetUser,
    resetRoll,
    Validation,
  } = useStandardStore();

  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);

  // ================= GET DATA =================
  const GetForm = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}v1/getStandard`);
      setData(res.data?.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetForm();
  }, []);

  // ================= ADD =================
  const Submit = async (e) => {
    e.preventDefault();

    if (!Validation()) return;

    try {
      setBtnLoading(true);
      await axios.post(`${API}v1/addStandard`, user);

      resetUser();
      await GetForm();
      setShow(false);
    } catch (err) {
      console.log(err);
    } finally {
      setBtnLoading(false);
    }
  };

  // ================= EDIT =================
  const IsEdit = (id) => {
    const result = data.find((item) => item.id === id);

    if (result) {
      setUpdate(true);
      setShow(true);
      setRoll("id", result.id);
      setRoll("standard", result.standard);
    }
  };

  // ================= UPDATE =================
  const Update = async (e) => {
    e.preventDefault();

    try {
      setBtnLoading(true);
      await axios.patch(`${API}v1/updateStandard`, roll);

      resetRoll();
      await GetForm();
      setShow(false);
      setUpdate(false);
    } catch (err) {
      console.log(err);
    } finally {
      setBtnLoading(false);
    }
  };

  // ================= DELETE =================
  const Deletes = async () => {
    try {
      setBtnLoading(true);
      await axios.patch(`${API}v1/deleteStandard`, { id });

      await GetForm();
      setDelete(false);
    } catch (err) {
      console.log(err);
    } finally {
      setBtnLoading(false);
    }
  };

  const Del = (id) => {
    setDelete(true);
    setId(id);
  };

  return (
    <div className="min-h-screen px-2">
      <ButtonHeader
        title={"Standard"}
        logo={logo}
        button={"Add Standard"}
        onclick={() => {
          setShow(true);
          setUpdate(false);
        }}
      />

      {/* ================= TABLE ================= */}
      <div className="bg-white p-6 my-5 shadow-xl rounded-2xl border border-blue-100">
        {loading ? (
          <div className="text-center py-10 text-blue-600 font-semibold animate-pulse">
            Loading standards...
          </div>
        ) : data.length === 0 ? (
          <p className="text-center text-gray-500">No Standard Found</p>
        ) : (
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-3">S.No</th>
                <th className="p-3">Standard</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-blue-50 transition"
                >
                  <td className="p-3">{index + 1}</td>

                  <td className="p-3 font-semibold text-blue-700">
                    {item.standard}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => IsEdit(item.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg m-1"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => Del(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg m-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* ================= MODAL ================= */}
      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-900/40 backdrop-blur-sm z-50">
          <div className="bg-white w-96 p-6 rounded-2xl shadow-2xl relative border border-blue-200">

            <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">
              {update ? "Update Standard" : "Add Standard"}
            </h2>

            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl"
              onClick={() => {
                setShow(false);
                resetUser();
                resetRoll();
              }}
            >
              ✕
            </button>

            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => (update ? Update(e) : Submit(e))}
            >
              <div>
                <label className="block mb-1 font-medium text-blue-700">
                  Standard Name
                </label>

                <input
                  type="text"
                  value={update ? roll.standard : user.standard}
                  className="w-full border border-blue-200 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) =>
                    update
                      ? setRoll("standard", e.target.value)
                      : setUser("standard", e.target.value)
                  }
                />

                {error?.standard && (
                  <p className="text-red-500 text-sm mt-1">
                    {error.standard}
                  </p>
                )}
              </div>

              <button
                disabled={btnLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
                type="submit"
              >
                {btnLoading
                  ? "Processing..."
                  : update
                  ? "Update"
                  : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= DELETE MODAL ================= */}
      {Delete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-80 border border-red-200">

            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Are you sure you want to delete this standard?
            </h3>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDelete(false)}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                disabled={btnLoading}
                onClick={Deletes}
                className="bg-red-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
              >
                {btnLoading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Standard;