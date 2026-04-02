import React from "react";
import type { ApplicationData } from "./AddEntryForm";


interface Props {
  data: ApplicationData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalDatails: React.FC<Props> = ({ data, handleChange }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          name="first_name"
          placeholder="First Name"
          value={data.first_name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <input
          name="last_name"
          placeholder="Last Name"
          value={data.last_name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <input
        name="mobile_number"
        placeholder="Mobile Number"
        value={data.mobile_number}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          name="state_id"
          placeholder="State ID"
          value={data.state_id}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <input
          name="city_id"
          placeholder="City ID"
          value={data.city_id}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <input
        name="address"
        placeholder="Address"
        value={data.address}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />
    </div>
  );
};

export default PersonalDatails;