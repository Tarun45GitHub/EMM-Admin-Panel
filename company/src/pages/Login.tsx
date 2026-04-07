import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/Axios";



const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading,setLoading]=useState(false)
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!username|| !password) {
      setError("Please fill in all fields.");
      return;
    }
    //console.log(data);
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await api.post("/crm/login/",{ username, password });
      
      if (!response?.data?.data?.access_token) {
        throw new Error('Failed to login: Invalid response from server');
      }
      
      // console.log(response);
      localStorage.setItem("access_token", response.data.data.access_token);
      localStorage.setItem("refreassh_token", response.data.data.user.refreash_token);
      
      // Navigate to dashboard only on successful login
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid credentials.");
    } finally {
      setLoading(false);
    }

  };

  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
          Login
        </h2>

        {error && (
          <p className="bg-red-100 text-red-600 px-4 py-2 rounded-lg mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-600 hover:text-indigo-600"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            // disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* 
        <p className="text-center text-gray-600 mt-5">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-600 font-semibold hover:underline">
            Register
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default Login;


