import ButtonHeader from "../commenHeader/ButtonHeader";
import logo from "../../assets/profile4.jpg"
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API;
const Fees = () => {
    const [show, setShow] = useState(false)
    const [price, setPrice] = useState({
        standard: "",
        fees: "",
    })
    const [standard, setStandard] = useState([])
    const [allocation, setAllocation] = useState([])
    const [filter, setFilter] = useState([])
    const [error, setError] = useState({})
    const Validation = () => {
        let newError = {};
        let Number = /^\+?[1-9]\d{3,6}$/
        if (price.standard.trim() === "") newError.standard = "Standard required";
        const alreadyExists = allocation.some((item) => item.standard === price.standard);
        if (alreadyExists) newError.standard = "Fees is already allocated";
        if (price.fees.trim() === "") newError.fees = "Fees required";
        else if (!Number.test(price.fees)) newError.fees = "Invalid Fees Entry";
        setError(newError);
        return Object.keys(newError).length === 0;
    };
    const GetData = async () => {
        try {
            const standard = await axios.get(`${API}getStandard`)
            const allocation = await axios.get(`${API}getFees`)
            setStandard(standard.data.data)
            setAllocation(allocation.data.data)
        }
        catch (err) {
            console.log(err)
        }
    }
    useEffect(() => {
        GetData()
    }, [])
    const Submit = async () => {
        if (!Validation()) return
        try {
            const add = await axios.post(`${API}addFees`, price)
            GetData()
            setShow(false)
            setPrice({
                standard: "",
                fees: ""
            })
        }
        catch (err) {
            console.log(err)
        }
    }
   return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-5">

    <ButtonHeader
      title={"Fees"}
      button={"Add Fees"}
      logo={logo}
      onclick={() => setShow(true)}
    />

    {/* Table Card */}
    <div className="bg-white rounded-2xl shadow-xl m-5 p-6 border border-blue-100">

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
    </div>

    {/* Modal */}
    {show && (
      <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-50">

        <div className="bg-white w-96 rounded-2xl shadow-2xl p-6 border border-blue-200">

          <h2 className="text-xl font-bold text-blue-700 mb-5 text-center">
            Allocate Fees
          </h2>

          {/* Standard */}
          <div className="mb-4 relative">
            <label className="block mb-1 text-blue-700 font-medium">
              Standard Allocation
            </label>

            <select
              name="standard"
              value={price.standard}
              onChange={(e) => {
                setPrice({ ...price, standard: e.target.value });
                setError({ ...error, standard: "" });
              }}
              className="w-full h-10 border border-blue-200 rounded-lg px-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
          <div className="mb-5 relative">
            <label className="block mb-1 text-blue-700 font-medium">
              Fees Allocation
            </label>

            <input
              type="text"
              placeholder="Enter the Fees"
              value={price.fees}
              onChange={(e) => {
                setPrice({ ...price, fees: e.target.value });
                setError({ ...error, fees: "" });
              }}
              className="w-full h-10 border border-blue-200 rounded-lg px-3 focus:ring-2 focus:ring-blue-400 focus:outline-none"
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
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
              onClick={() => {
                setShow(false);
                setError({});
              }}
            >
              Close
            </button>

            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={Submit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
}
export default Fees