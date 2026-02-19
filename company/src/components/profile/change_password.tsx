import React, { useState } from "react";

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("New passwords must match.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // TODO: call your API here
      // Example with fetch:
      // await fetch("/api/change-password", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ currentPassword, newPassword }),
      // });

      setSuccess("Password changed successfully!");
    } catch (err) {
      setError("Failed to change password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
    <div className="max-w-md m-10 bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Change Password
      </h2>

      {error && (
        <div className="text-red-600 text-sm mb-2">{error}</div>
      )}
      {success && (
        <div className="text-green-600 text-sm mb-2">{success}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Current Password */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Current Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Enter current password"
          />
        </div>

        {/* New Password */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            New Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
          />
        </div>

        {/* Confirm New Password */}
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Confirm New Password
          </label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 transition"
          disabled={loading}
        >
          {loading ? "Updating..." : "Change Password"}
        </button>
      </form>
    </div>
    </div>
  );
};

export default ChangePassword;
