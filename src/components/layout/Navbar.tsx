function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <h1 className="text-2xl font-bold text-blue-600">
        AI Prompt Library
      </h1>

      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
        + Add Prompt
      </button>
    </header>
  );
}

export default Navbar;