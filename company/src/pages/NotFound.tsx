import React, { useState, type ChangeEvent, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Logic to search your app's data
      console.log(`Searching for: ${searchQuery}`);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 py-12 text-center font-sans">
      {/* Visual Header */}
      <div className="mb-8">
        <span className="inline-block px-3 py-1 text-sm font-medium bg-red-50 text-red-600 rounded-full mb-4">
          Error 404
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight">
          Data record not found
        </h1>
        <p className="mt-4 text-lg text-slate-600 max-w-lg mx-auto">
          We couldn't find the specific entry or dataset you requested. 
          It may have been archived or the ID is incorrect.
        </p>
      </div>

      {/* Search Fallback */}
      <form 
        onSubmit={handleSearch}
        className="w-full max-w-md mb-10 flex gap-2"
      >
        <input
          type="text"
          placeholder="Search records..."
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
        />
        <button 
          type="submit"
          className="bg-slate-900 text-white px-5 py-2 rounded-lg font-medium hover:bg-slate-800 transition-all"
        >
          Search
        </button>
      </form>

      {/* Navigation Actions */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="text-slate-600 font-medium hover:text-slate-900 transition-colors"
        >
          &larr; Go back to previous page
        </button>
        <span className="hidden sm:inline text-slate-300">|</span>
        <button
          onClick={() => navigate('/admin')}
          className="px-6 py-2 border border-slate-900 text-slate-900 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>

      {/* Metadata / Debug info */}
      <div className="mt-12 pt-8 border-t border-slate-100 w-full max-w-md">
        <p className="text-xs uppercase tracking-widest text-slate-400">
          Timestamp: {new Date().toISOString()}
        </p>
      </div>
    </div>
  );
};

export default NotFound;