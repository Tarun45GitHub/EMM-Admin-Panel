import React from "react";
import type { ApplicationData } from "./AddEntryForm";


interface Props {
  data: ApplicationData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PersonalDatails: React.FC<Props> = ({ data, handleChange }) => {
  return (
    <div className="space-y-4">
      <input
        name="phone"
        placeholder="Phone"
        value={data.phone}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <input
        name="emailid"
        type="email"
        placeholder="Email"
        value={data.emailid}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <input
        name="state"
        placeholder="State"
        value={data.state}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <input
        name="city"
        placeholder="City"
        value={data.city}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />
    </div>
  );
};

export default PersonalDatails;