import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API;

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const url = isLogin ? `${API}login` : `${API}signup`;

      const payload = isLogin
        ? { emailId: form.emailId, password: form.password }
        : form;

      const res = await axios.post(url, payload, {
        withCredentials: true
      });

    //   alert(res.data.message || "Success");
                navigate("/homePage/adminlayout");
      console.log(res.data);

    } catch (err) {
        console.log(err)
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-br from-blue-500 to-indigo-600">
      
      <div className="bg-white rounded-2xl shadow-xl p-8 w-87.5">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {!isLogin && (
          <>
            <input
              name="firstName"
              placeholder="First Name"
              className="w-full mb-3 p-2 border rounded-lg"
              onChange={handleChange}
            />
            <input
              name="lastName"
              placeholder="Last Name"
              className="w-full mb-3 p-2 border rounded-lg"
              onChange={handleChange}
            />
          </>
        )}

        <input
          name="emailId"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded-lg"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border rounded-lg"
          onChange={handleChange}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p className="text-center mt-4 text-sm">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            className="text-blue-600 cursor-pointer ml-1"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Login"}
          </span>
        </p>

      </div>
    </div>
  );
}
export default AuthPage