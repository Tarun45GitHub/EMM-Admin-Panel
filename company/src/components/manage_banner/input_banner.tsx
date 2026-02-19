import React, { useState } from "react";

type inputCardProps={
  value:number;
}

const InputCard: React.FC<inputCardProps> = ({value=2}) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    setFile(selectedFile ?? null);
  };

  const handleSave = () => {
    if (!file) return;

    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow p-4 dark:bg-gray-800">
      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">
        Select & Save File {value}
      </h2>

      <input
        type="file"
        onChange={handleFileChange}
        className="block w-full text-gray-700  cursor-pointer bg-gray-300 rounded-md border-dashed border-gray-300 hover:bg-gray-200 transition"
      />

      {file && (
        <>
          <p className="text-gray-600 text-sm mb-2">{file.name}</p>
          <button
            onClick={handleSave}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Save File
          </button>
        </>
      )}
    </div>
  );
};

export default InputCard;
