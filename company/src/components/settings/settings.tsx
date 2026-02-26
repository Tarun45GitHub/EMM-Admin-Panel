import React, { useState } from "react";

const Settings: React.FC = () => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: send general query to backend
    alert("Query submitted!");
    setQuery("");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-600 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 dark:text-gray-200">
        Help & Support
      </h1>
       {/* FAQ / Helpful Articles */}
      <section className="bg-white p-6 rounded-lg shadow space-y-3 mb-6">
        <h2 className="text-xl font-semibold">FAQs</h2>

        <div className="space-y-2">
          <details className="border rounded px-3 py-2">
            <summary className="font-medium cursor-pointer">
              How do I reset my password?
            </summary>
            <p className="text-sm text-gray-600 mt-1">
              Go to settings → security → reset password.
            </p>
          </details>

          <details className="border rounded px-3 py-2">
            <summary className="font-medium cursor-pointer">
              How can I contact support?
            </summary>
            <p className="text-sm text-gray-600 mt-1">
              Use the chat support button above or email support@example.com.
            </p>
          </details>

          <details className="border rounded px-3 py-2">
            <summary className="font-medium cursor-pointer">
              Where can I watch video tutorials?
            </summary>
            <p className="text-sm text-gray-600 mt-1">
              Scroll up to the Video Solutions section to view all videos.
            </p>
          </details>
        </div>
      </section>

      {/* General Query Section */}
      <section className="bg-white p-6 rounded-lg shadow space-y-3 mb-6">
        <h2 className="text-xl font-semibold">General Query</h2>
        <p className="text-sm text-gray-600">
          Have a question? Send us your query and our support team will get
          back to you.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type your question..."
            className="w-full border p-3 rounded focus:border-blue-500 focus:outline-none"
            rows={4}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </section>

      {/* Video Solutions Section */}
      <section className="bg-white p-6 rounded-lg shadow space-y-3 mb-6">
        <h2 className="text-xl font-semibold">Video Solutions</h2>
        <p className="text-sm text-gray-600">
          Watch tutorials and how-to videos that answer common questions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Example Video Embed */}
          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="support video"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>

          <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="support video"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>
       {/* Chat Support Section */}
      <section className="bg-white p-6 rounded-lg shadow space-y-3 mb-6">
        <h2 className="text-xl font-semibold">Chat Support</h2>
        <p className="text-sm text-gray-600">
          Start a live chat with our support team for real-time help.
        </p>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => alert("Chat clicked! (Open chat window)")}
        >
          Start Chat
        </button>
      </section>

     
    </div>
  );
};

export default Settings;