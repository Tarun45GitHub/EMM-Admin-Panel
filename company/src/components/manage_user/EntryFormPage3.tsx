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
        name="company_name"
        placeholder="Company Name"
        value={data.company_name}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <input
        name="gstin"
        placeholder="GSTIN"
        value={data.gstin}
        onChange={handleChange}
        className="w-full border rounded px-3 py-2"
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          name="wallet"
          placeholder="Wallet Balance"
          value={data.wallet}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />

        <input
          name="group"
          placeholder="Group (e.g., Distributor)"
          value={data.group}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>
    </div>
  );
};

export default BusinessDetails;