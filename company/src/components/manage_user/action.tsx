import React from "react";

// Props for the action component
type ActionProps = {
  isActive: boolean;
  onToggle: () => void;
  onEdit: () => void;
};

const Action: React.FC<ActionProps> = ({
  isActive,
  onToggle,
  onEdit,
}) => {
  return (
    <div className="flex items-center space-x-2">
      {/* Active / Inactive Toggle */}
      <div
        onClick={onToggle}
        className={`
          cursor-pointer px-3 py-1 rounded-full text-sm font-medium
          ${
            isActive
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }
        `}
      >
        {isActive ? "Active" : "Inactive"}
      </div>

      {/* Edit Button */}
      <div
        onClick={onEdit}
        className="
          cursor-pointer px-3 py-1 bg-blue-500 text-white rounded-md text-sm font-medium
          hover:bg-blue-600 transition-all
        "
      >
        Edit
      </div>
    </div>
  );
};
export default Action;
