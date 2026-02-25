import React from "react";
import type { ApplicationData } from "./AddEntryForm";

interface Props {
  data: ApplicationData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginDetails: React.FC<Props> = ({ data, handleChange }) => {
  return (
    <div className="space-y-6 ">

      {/* Email */}
      <div className="relative z-0 w-full mb-4 group">
        <input
          id="userName"
          name="userName"
          type="userName"
          value={data.userName}
          onChange={handleChange}
          className="peer block w-full px-0 py-2.5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600"
          placeholder=" "
          required
        />
        <label
          htmlFor="userName"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
        >
          username
        </label>
      </div>

      {/* Password */}
      <div className="relative z-0 w-full mb-4 group">
        <input
          id="password"
          name="password"
          type="password"
          value={data.password}
          onChange={handleChange}
          className="peer block w-full px-0 py-2.5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600"
          placeholder=" "
          required
        />
        <label
          htmlFor="password"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
        >
          Password
        </label>
      </div>

      {/* Confirm Password */}
      <div className="relative z-0 w-full mb-4 group">
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={data.confirmPassword || ""}
          onChange={handleChange}
          className="peer block w-full px-0 py-2.5 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-indigo-600"
          placeholder=" "
          required
        />
        <label
          htmlFor="confirmPassword"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0"
        >
          Confirm Password
        </label>
      </div>
      
    </div>
  );
};

export default LoginDetails;