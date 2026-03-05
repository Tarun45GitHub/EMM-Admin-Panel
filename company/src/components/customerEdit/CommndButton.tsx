import React from "react";

const CommandButtons: React.FC = () => {
  return (
    <div className=" bg-gray-100 flex flex-col items-center justify-center p-3 ">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Command 
      </h2>

      <div className="grid grid-cols-1 gap-4 p-2">
        {/* 15 Stylish Buttons */}
        <button className="bg-indigo-600 text-white py-2 px-3 rounded-lg shadow-md hover:bg-indigo-700 transition">
          Primary Action
        </button>

        <button className="bg-green-500 text-white py-2 px-3 rounded-lg shadow-lg hover:scale-105 transform transition">
          Success
        </button>

        <button className="bg-red-500 text-white py-2 px-3 rounded-lg hover:bg-red-600">
          Alert
        </button>

        <button className="bg-yellow-400 text-gray-800 py-2 px-3 rounded-lg shadow-md hover:shadow-lg transition">
          Warning
        </button>

        <button className="bg-linear-to-r from-purple-500 to-pink-500 text-white py-2 px-3 rounded-lg hover:from-pink-500 hover:to-purple-500">
          Gradient
        </button>

        <button className="border border-indigo-600 text-indigo-600 py-2 px-3 rounded-lg hover:bg-indigo-50">
          Outline
        </button>

        <button className="bg-teal-500 text-white py-2 px-3 rounded-full hover:bg-teal-600 transition">
          Rounded
        </button>

        <button className="bg-blue-500 text-white py-2 px-3 rounded-lg hover:ring-4 hover:ring-blue-300">
          Hover Ring
        </button>

        <button className="bg-pink-500 text-white py-2 px-3 rounded-lg hover:scale-110 transition">
          Pulse
        </button>

        <button className="bg-gray-800 text-white py-2 px-3 rounded-lg hover:bg-gray-900">
          Dark Mode
        </button>

        <button className="bg-indigo-400 text-white py-2 px-3 rounded-lg shadow-lg hover:shadow-xl">
          Soft Glow
        </button>

        <button className="bg-cyan-500 text-white py-2 px-3 rounded-lg hover:bg-cyan-600">
          Info
        </button>

        <button className="bg-lime-500 text-gray-800 py-2 px-3 rounded-lg hover:bg-lime-600">
          Fun Action
        </button>

        <button className="bg-purple-700 text-white py-2 px-3 rounded-lg hover:bg-purple-800">
          Magical
        </button>

        <button className="bg-orange-500 text-white py-2 px-3 rounded-lg hover:bg-orange-600">
          Orange Command
        </button>
      </div>
    </div>
  );
};

export default CommandButtons;