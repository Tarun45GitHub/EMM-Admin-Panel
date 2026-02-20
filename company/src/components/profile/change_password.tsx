import React, { useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords must match.");
      return;
    }

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess("Password updated successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError("Failed to change password. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center
      dark:bg-gray-700 p-4 ">
      <div className="w-full max-w-md backdrop-blur-lg bg-white/70 border border-white/40 shadow-2xl rounded-2xl p-8 transition-all duration-300 dark:bg-gray-800">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-indigo-600 text-white p-2 rounded-xl">
            <Lock size={20} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
            Change Password
          </h2>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 p-3 text-sm rounded-lg bg-red-100 text-red-600 border border-red-300">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 text-sm rounded-lg bg-green-100 text-green-600 border border-green-300">
            {success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-100 mb-1">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 
                focus:outline-none transition dark:text-gray-200"
              />
              <span
                className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-gray-200">
              New Password
            </label>
            
            <input
              type={showPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2
               focus:ring-indigo-500 focus:outline-none transition dark:text-gray-200"
            />
            
            <p className="text-xs text-gray-500  mt-1">
              Must be at least 6 characters.
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Confirm New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition dark:text-gray-200"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl shadow-md transition flex items-center justify-center gap-2"
          >
            {loading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;