type TopbarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Topbar({ sidebarOpen, setSidebarOpen }: TopbarProps) {
  return (
    <header className="h-16 bg-white shadow px-6 flex justify-between items-center">
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="text-2xl font-bold"
      >
        ☰
      </button>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-2 rounded-lg"
        />
        <button className="text-xl">🔔</button>
        <button className="text-xl">👤</button>
      </div>
    </header>
  );
}
