import React, { createContext, useContext, useState } from "react";

interface LoaderContextType {
  showLoader: () => void;
  hideLoader: () => void;
}

const LoaderContext = createContext<LoaderContextType | null>(null);

export const LoaderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = () => setLoading(false);

  return (
    <LoaderContext.Provider value={{ showLoader, hideLoader }}>
      {children}

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center 
                    bg-linear-to-br from-indigo-100 via-white to-indigo-200">

      <div className="flex flex-col items-center gap-6">

        {/* Animated Spinner */}
         <div className="flex items-center gap-2">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="w-3 h-10 rounded-full 
                     bg-linear-to-b from-green-500 to-purple-500"
          style={{
            animation: "wave 1s ease-in-out infinite",
            animationDelay: `${i * 0.1}s`,
          }}
        ></div>
      ))}

      <style>
        {`
          @keyframes wave {
            0%, 100% { transform: scaleY(0.5); opacity: 0.5; }
            50% { transform: scaleY(1.5); opacity: 1; }
          }
        `}
      </style>
    </div>

        {/* Loading Text */}
        <p className="text-lg font-semibold text-gray-700 tracking-wide animate-pulse">
          Loading...
        </p>

      </div>
    </div>
      )}

    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error("useLoader must be used within LoaderProvider");
  }
  return context;
};




 