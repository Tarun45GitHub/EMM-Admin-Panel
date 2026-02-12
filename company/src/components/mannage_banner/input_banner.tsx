import React, { useState } from "react";

const InputBanner: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileData, setFileData] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    if (selected) {
      setFile(selected);

      const reader = new FileReader();
      reader.onload = () => {
        setFileData(reader.result as string);
      };
      reader.readAsText(selected);
    } else {
      setFile(null);
      setFileData("");
    }
  };

  const handleSave = () => {
    if (!file) return;
    const blob = new Blob([fileData], { type: file.type });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Upload & Save File
      </h2>

      {/* File Input */}
      <label className="block">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700
                     file:mr-4 file:py-2 file:px-4
                     file:rounded file:border-0
                     file:text-sm file:font-semibold
                     file:bg-indigo-600 file:text-white
                     hover:file:bg-indigo-700"
        />
      </label>

      {/* Selected File Info */}
      {file && (
        <div className="mt-4 text-gray-700">
          <p className="font-medium">Selected:</p>
          <p className="text-sm">{file.name}</p>
        </div>
      )}

      {/* Save Button */}
      {file && (
        <button
          onClick={handleSave}
          className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Save File Locally
        </button>
      )}
    </div>
  );
};

export default InputBanner;
