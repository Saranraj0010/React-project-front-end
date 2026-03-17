import logo from "../../assets/profile4.jpg"
import { useState } from "react"
import close from "../../assets/close.png"
import { useEffect } from "react"
import axios from "axios"
import ButtonHeader from "../commenHeader/ButtonHeader"
import { toast } from "react-toastify"
import { useSubjectStore } from "../store/useSubjectStore"
const API = import.meta.env.VITE_API;

const Subject = () => {
  const { user, setUser, roll, setRoll, data, setData, show, setShow, update, setUpdate, Delete, setDelete, error, setError, id, setId, resetUser, resetRoll, Validation } = useSubjectStore();
  const Submit = async (e) => {
    try {
      e.preventDefault();
      if (!Validation()) return;
      const add = await axios.post(`${API}addSubject`, user)
      resetUser();
      GetForm()
      setShow(false)
    }
    catch (err) {
      console.log(err)
    }

  }
  const GetForm = async () => {
    try {
      const get = await axios.get(`${API}getSubject`)
      setData(get.data.data)
    }
    catch (err) {
      console.log(err, "hello")
    }
  }
  useEffect(() => {
    GetForm()
  }, [])
  const IsEdit = (id) => {
    const result = data.find((item) => item.id === id)
    console.log(result)
    if (result) {
      setUpdate(true)
      setShow(true)
      setRoll("subject", result.subject)
      setRoll("id", result.id)
    }
  }
  const Update = async (e) => {
    try {
      e.preventDefault();
      console.log("update")
      console.log(user)
      const add = await axios.patch(`${API}updateSubject`, roll)
      resetRoll();
      GetForm()
      setShow(false)
      setUpdate(false)
    }
    catch (err) {
      console.log(err)
    }

  }
  const Deletes = async () => {
    try {
      const add = await axios.patch(`${API}deleteSubject`, { id })
      GetForm()
      setDelete(false)
    }
    catch (err) {
      console.log(err)
    }

  }
  const Del = (id) => {
    setDelete(true)
    setId(id)
  }
  return (
    <div className="min-h-screen p-5">

        <ButtonHeader
          title={"Subject"}
          logo={logo}
          button={"Add Subject"}
          onclick={() => {
            setShow(true);
            setUpdate(false);
          }}
        />

      <div className="bg-white p-6 m-5 shadow-xl rounded-2xl border border-blue-100">

        {data.length===0?(
                    <p className="text-center text-gray-500">No Subject Found</p>
        ):(<table className="w-full border-collapse text-center">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">S.No</th>
              <th className="p-3">Subject</th>
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

                <td className="p-3 font-medium text-blue-700">
                  {item.subject}
                </td>

                <td className="p-3">
                  <button
                    onClick={() => IsEdit(item.id)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg m-1 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => Del(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg m-1 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>)}
      </div>

      {show && (
        <div className="fixed inset-0 flex items-center justify-center bg-blue-900/40 backdrop-blur-sm z-50">
          <div className="bg-white w-105 p-6 rounded-2xl shadow-2xl relative border border-blue-200">

            <h2 className="text-2xl font-bold text-blue-700 text-center mb-4">
              {update ? "Update Subject" : "Add Subject"}
            </h2>

            <button
              className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-xl"
              onClick={() => {
                setShow(false);
                resetUser();
                setError({});
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
                  Subject Name
                </label>

                <input
                  type="text"
                  value={update ? roll.subject : user.subject}
                  className="w-full border border-blue-200 p-2 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e) => {
                    update
                      ? setRoll("subject", e.target.value)
                      : setUser("subject", e.target.value);
                    setError({});
                  }}
                />

                {error.subject && (
                  <p className="text-red-500 text-sm mt-1">
                    {error.subject}
                  </p>
                )}
              </div>

              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                type="submit"
              >
                {update ? "Update" : "Submit"}
              </button>
            </form>
          </div>
        </div>
      )}

      {Delete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center w-87.5 border border-red-200">

            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Are you sure you want to delete this subject?
            </h3>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setDelete(false)}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 transition"
              >
                Cancel
              </button>

              <button
                onClick={Deletes}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
export default Subject