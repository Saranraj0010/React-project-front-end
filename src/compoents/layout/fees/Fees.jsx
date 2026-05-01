import ButtonHeader from "../../commenHeader/ButtonHeader";
import logo from "../../../assets/profile4.jpg"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useFeesStore } from "../../store/useFeesStore";

const API = import.meta.env.VITE_API;
const Fees = () => {
  const { show, setShow, price, setPrice, standard, setStandard, allocation, setAllocation, error, setError, resetPrice, Validation } = useFeesStore()
  const [isLoading, setIsLoading] = useState(true);
 const GetData = async () => {
  try {
    setIsLoading(true);

    const standardRes = await axios.get(`${API}v1/getStandard`);
    const allocationRes = await axios.get(`${API}v1/getFees`);

    setStandard(standardRes.data.data);
    setAllocation(allocationRes.data.data);

  } catch (err) {
    console.log(err);
    toast.error("Failed to fetch fees");
  } finally {
    setIsLoading(false);
  }
};
  useEffect(() => {
    GetData()
  }, [])
  const Submit = async () => {
    if (!Validation()) return
    try {
      const add = await axios.post(`${API}v1/addFees`, price)
      GetData()
      setShow(false)
      resetPrice();
      // setPrice({
      //     standard: "",
      //     fees: ""
      // })
    }
    catch (err) {
      console.log(err)
    }
  }
return (
  <>
    {isLoading ? (
      <div className="flex justify-center items-center h-screen">
        {/* Loader */}
        <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    ) : (
      <div className="min-h-screen px-2">

        <ButtonHeader
          title={"Fees"}
          button={"Add Fees"}
          logo={logo}
          onclick={() => setShow(true)}
        />

        <div className="bg-white rounded-2xl shadow-xl my-5 p-6 border border-blue-100">

          {allocation.length === 0 ? (
            <p className="text-center text-gray-500">No Fees Found</p>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-600 text-white text-center">
                  <th className="p-3">S.No</th>
                  <th className="p-3">Class</th>
                  <th className="p-3">Fees</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>

              <tbody>
                {allocation.map((item, index) => (
                  <tr
                    key={item.id}
                    className="text-center border-b hover:bg-blue-50 transition"
                  >
                    <td className="p-3">{index + 1}</td>

                    <td className="p-3 font-medium text-blue-700">
                      {item.standard}
                    </td>

                    <td className="p-3 font-semibold text-gray-700">
                      ₹ {item.fees}
                    </td>

                    <td className="p-3">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition">
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Modal (same as your code) */}
        {show && (
          <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white w-96 rounded-2xl shadow-2xl p-6 border border-blue-200">

              <h2 className="text-xl font-bold text-blue-700 mb-5 text-center">
                Allocate Fees
              </h2>

              {/* Standard */}
              <div className="mb-4">
                <label className="block mb-1 text-blue-700 font-medium">
                  Standard Allocation
                </label>

                <select
                  value={price.standard}
                  onChange={(e) => {
                    setPrice("standard", e.target.value);
                    setError("standard", "");
                  }}
                  className="w-full h-10 border border-blue-200 rounded-lg px-3"
                >
                  <option value="">Select the Standard</option>
                  {standard.map((item) => (
                    <option key={item.id} value={item.standard}>
                      {item.standard}
                    </option>
                  ))}
                </select>

                {error.standard && (
                  <p className="text-red-500 text-xs mt-1">
                    {error.standard}
                  </p>
                )}
              </div>

              {/* Fees */}
              <div className="mb-5">
                <label className="block mb-1 text-blue-700 font-medium">
                  Fees Allocation
                </label>

                <input
                  type="number"
                  placeholder="Enter the Fees"
                  value={price.fees}
                  onChange={(e) => {
                    setPrice("fees", e.target.value);
                    setError("fees", "");
                  }}
                  className="w-full h-10 border border-blue-200 rounded-lg px-3"
                />

                {error.fees && (
                  <p className="text-red-500 text-xs mt-1">
                    {error.fees}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg"
                  onClick={() => {
                    setShow(false);
                    setError({});
                    resetPrice();
                  }}
                >
                  Close
                </button>

                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={Submit}
                >
                  Submit
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    )}
  </>
);
}
export default Fees