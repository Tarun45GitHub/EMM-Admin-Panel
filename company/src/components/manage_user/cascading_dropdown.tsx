// const locationData = {
//   India: {
//     "West Bengal": {
//       Kolkata: ["Salt Lake", "BBD Bagh", "Park Street"],
//       Howrah: ["Shibpur", "Benaras Road"],
//     },
//     Maharashtra: {
//       Mumbai: ["Andheri", "Bandra"],
//       Pune: ["Shivaji Nagar", "Hadapsar"],
//     },
//   },
//   USA: {
//     California: {
//       "Los Angeles": ["Hollywood", "Beverly Hills"],
//       "San Diego": ["La Jolla", "Gaslamp"],
//     },
//     Texas: {
//       Dallas: ["Deep Ellum", "Bishop Arts"],
//       Austin: ["Downtown", "Zilker Park"],
//     },
//   },
// };


import React, { useState } from "react";

const locationData: Record<string, any> = {
  India: {
    "West Bengal": {
      Kolkata: ["Salt Lake", "BBD Bagh", "Park Street"],
      Howrah: ["Shibpur", "Benaras Road"],
    },
    Maharashtra: {
      Mumbai: ["Andheri", "Bandra"],
      Pune: ["Shivaji Nagar", "Hadapsar"],
    },
  },
  USA: {
    California: {
      "Los Angeles": ["Hollywood", "Beverly Hills"],
      "San Diego": ["La Jolla", "Gaslamp"],
    },
    Texas: {
      Dallas: ["Deep Ellum", "Bishop Arts"],
      Austin: ["Downtown", "Zilker Park"],
    },
  },
};

const CascadingDropdown: React.FC = () => {
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");

  const states = country ? Object.keys(locationData[country] || {}) : [];
  const cities = state ? Object.keys(locationData[country][state] || {}) : [];
  const areas = city ? locationData[country][state][city] : [];

  return (
    <div className="  m-5  grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Country */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4 w-100">
        <label className="block text-gray-700 font-medium mb-1 ">
          Country
        </label>
        <select
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setState("");
            setCity("");
            setArea("");
          }}
          className="w-full border-gray-300 rounded-md p-2"
        >
          <option value="">Select Country</option>
          {Object.keys(locationData).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* State */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4 w-100">
        <label className="block text-gray-700 font-medium mb-1">
          State
        </label>
        <select
          value={state}
          onChange={(e) => {
            setState(e.target.value);
            setCity("");
            setArea("");
          }}
          disabled={!country}
          className="w-full border-gray-300 rounded-md p-2"
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* City */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4 w-100">
        <label className="block text-gray-700 font-medium mb-1">City</label>
        <select
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setArea("");
          }}
          disabled={!state}
          className="w-full border-gray-300 rounded-md p-2"
        >
          <option value="">Select City</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Area */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4 w-100">
        <label className="block text-gray-700 font-medium mb-1">
          Area
        </label>
        <select
          value={area}
          onChange={(e) => setArea(e.target.value)}
          disabled={!city}
          className="w-full border-gray-300 rounded-md p-2"
        >
          <option value="">Select Area</option>
          {areas.map((a: string) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>
      </div>

      {/* Selection Display
      {area && (
        <p className="text-green-600 font-medium">
          Selected: {country} / {state} / {city} / {area}
        </p>
      )} */}
    </div>
  );
};

export default CascadingDropdown;
