import React from "react";
import { Link } from "react-router-dom";
import { Edit3 } from "lucide-react";

// Props for the action component
type ActionProps = {
  onEdit?: () => void;
  editUrl?: string;
};

const CustomerAction: React.FC<ActionProps> = ({
  onEdit,
  editUrl = "/customer/edit"
}) => {
  return (
    <div className="flex items-center gap-2">
      {/* Edit Action */}
      <Link
        to={editUrl}
        onClick={onEdit}
        className="
          flex items-center gap-1.5 px-3 py-1.5 
          bg-blue-50 dark:bg-blue-900/20 
          text-blue-600 dark:text-blue-400 
          rounded-lg text-xs font-semibold
          hover:bg-blue-100 dark:hover:bg-blue-900/30 
          transition-all duration-200
        "
      >
        <Edit3 size={14} />
        Edit
      </Link>
    </div>
  );
};

export default CustomerAction;
