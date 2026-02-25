import React from "react";
import type { ApplicationData } from "./AddEntryForm";

interface Props {
  data: ApplicationData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BusinessDetails: React.FC<Props> = ({ data, handleChange }) => {
  return (
    <div className="space-y-4">
      <input
        name="Address"
        placeholder="Address"
        value={data.Address}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <input
        name="shop_company"
        placeholder="Shop / Company"
        value={data.shop_company}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <input
        name="owner_name"
        placeholder="Owner Name"
        value={data.owner_name}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <input
        name="GST"
        placeholder="GST Number"
        value={data.GST}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />
    </div>
  );
};

export default BusinessDetails;