import ButtonHeader from "../../commenHeader/ButtonHeader";
import logo from "../../../assets/profile4.jpg";
import close from "../../../assets/close.png";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLoginStore } from "../store/useLoginStore";

const API = import.meta.env.VITE_API;

const Circular = () => {
  const { darkMode } = useLoginStore();

  const [showCircular, setShowCircular] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState({ text: "", select: "all" });

  const [circular, setCircular] = useState({
    title: "",
    text: "",
    file: null,
    select: "",
  });

  const pageStyle = darkMode
    ? "bg-gray-950 text-white"
    : "text-black";

  const cardStyle = darkMode
    ? "bg-gray-900 text-white border border-gray-800"
    : "bg-white text-black";

  const inputStyle = darkMode
    ? "bg-gray-800 text-white border border-gray-700"
    : "border";

  const GetForm = async () => {
  try {
    setIsLoading(true);
    const res = await axios.get(`${API}getCircular`);
    setData(res.data.data);
  } catch (err) {
    console.log(err);
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {
    GetForm();
  }, []);

  const Submit = async () => {
    if (!circular.title) return toast.error("Title required");
    if (!circular.select) return toast.error("Select role required");
    if (!circular.text) return toast.error("Content required");
    if (!circular.file) return toast.error("File required");

    const formData = new FormData();
    formData.append("file", circular.file);
    formData.append("text", circular.text);
    formData.append("title", circular.title);
    formData.append("select", circular.select);

    try {
      await axios.post(`${API}addCircular`, formData);
      toast.success("Circular added successfully");

      setCircular({
        title: "",
        text: "",
        file: null,
        select: "",
      });

      GetForm();
      setShowCircular(false);
    } catch (err) {
      console.log(err);
    }
  };

  let filterData = data;

  if (filter.select && filter.select !== "all") {
    filterData = filterData.filter(
      (item) => item.role_type === filter.select
    );
  }

  if (filter.text) {
    filterData = filterData.filter(
      (item) =>
        item.title.toLowerCase().includes(filter.text.toLowerCase()) ||
        item.text.toLowerCase().includes(filter.text.toLowerCase())
    );
  }

  return (
    <div className={`min-h-screen px-2 ${pageStyle}`}>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <ButtonHeader
            title={"Circular"}
            logo={logo}
            button={"Add Circular"}
            onclick={() => setShowCircular(true)}
          />

          <div
            className={`rounded-2xl p-5 mt-6 shadow-lg flex flex-col md:flex-row gap-4 items-center ${cardStyle}`}
          >
            <input
              type="text"
              placeholder="Search..."
              value={filter.text}
              onChange={(e) =>
                setFilter({ ...filter, text: e.target.value })
              }
              className={`rounded-lg px-3 h-10 w-full md:w-72 ${inputStyle}`}
            />

            <select
              className={`rounded-lg h-10 px-3 ${inputStyle}`}
              value={filter.select}
              onChange={(e) =>
                setFilter({ ...filter, select: e.target.value })
              }
            >
              <option value="all">All</option>
              <option value="staff">Staff</option>
              <option value="student">Student</option>
            </select>

            <button
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
              onClick={() => setFilter({ text: "", select: "all" })}
            >
              Reset
            </button>
          </div>

          <div className={`rounded-2xl p-6 mt-6 shadow-lg ${cardStyle}`}>
            {filterData.length === 0 ? (
              <p className="text-center opacity-70">
                No Circular Found
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filterData.map((item) => (
                  <div
                    key={item.id}
                    className={`p-5 rounded-2xl shadow transition ${
                      darkMode
                        ? "bg-gray-800 hover:bg-gray-700"
                        : "border hover:shadow-xl"
                    }`}
                  >
                    <p className="text-sm text-blue-500 font-semibold mb-2">
                      {item.role_type.toUpperCase()}
                    </p>

                    <h2 className="font-bold text-lg mb-2">
                      {item.title}
                    </h2>

                    <p className="text-sm opacity-80 mb-3">
                      {item.text}
                    </p>

                    {item.file && (
                      <a
                        href={item.file}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-500 underline text-sm"
                      >
                        View Attachment
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* MODAL */}
      {showCircular && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div
            className={`rounded-2xl shadow-2xl p-6 w-96 relative ${cardStyle}`}
          >
            <img
              src={close}
              className="absolute top-4 right-4 cursor-pointer"
              width={20}
              onClick={() => setShowCircular(false)}
            />

            <h2 className="text-xl font-bold text-center text-blue-500 mb-4">
              Create Circular
            </h2>

            <select
              className={`rounded-lg h-10 px-3 w-full mb-3 ${inputStyle}`}
              value={circular.select}
              onChange={(e) =>
                setCircular({ ...circular, select: e.target.value })
              }
            >
              <option value="">Select Role Type</option>
              <option value="all">All</option>
              <option value="staff">Staff</option>
              <option value="student">Student</option>
            </select>

            <input
              type="text"
              placeholder="Title"
              value={circular.title}
              onChange={(e) =>
                setCircular({ ...circular, title: e.target.value })
              }
              className={`rounded-lg h-10 px-3 w-full mb-3 ${inputStyle}`}
            />

            <textarea
              placeholder="Content..."
              value={circular.text}
              onChange={(e) =>
                setCircular({ ...circular, text: e.target.value })
              }
              className={`rounded-lg p-3 w-full h-28 mb-3 ${inputStyle}`}
            />

            <input
              type="file"
              onChange={(e) =>
                setCircular({
                  ...circular,
                  file: e.target.files[0],
                })
              }
              className="mb-4"
            />

            <button
              onClick={Submit}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-lg"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Circular;