import { useState } from "react";

function DateFilter({ onFilter }: { onFilter: (range: { from: string; to: string }) => void }) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleApply = () => {
    // pass the selected range back to parent
    onFilter({ from, to });
  };

  return (
    <div className="flex gap-4 items-center">
      <div>
        <label className="block text-sm">From</label>
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm">To</label>
        <input
          type="date"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <button
        onClick={handleApply}
        className="px-3 py-1 bg-blue-600 text-white rounded"
      >
        Apply
      </button>
    </div>
  );
}
export default DateFilter;