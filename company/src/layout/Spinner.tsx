import React from "react";

interface SpinnerProps {
  size?: number;      // size in pixels
  colorClass?: string; // Tailwind color class
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 50,
  colorClass = "border-blue-600",
}) => {
  return (
    <div
      className={`border-4 ${colorClass} border-t-transparent rounded-full animate-spin`}
      style={{ width: size, height: size }}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Spinner;
